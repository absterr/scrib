import { db } from "@/db/drizzle";
import { user } from "@/db/schema/auth-schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_KEY!
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user;
      if (!userId) {
        return NextResponse.json(
          { error: "User ID is not set" },
          { status: 500 }
        );
      }

      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      await db
        .update(user)
        .set({
          plan: "pro",
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          subscriptionStatus: subscription.status,
          subscriptionExpiresAt: new Date(
            (session.expires_at ?? Date.now()) * 1000
          ),
        })
        .where(eq(user.id, userId));
      break;

    case "customer.subscription.updated":

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const [currentUser] = await db
        .select()
        .from(user)
        .where(eq(user.stripeCustomerId, customerId))
        .limit(1);
      if (!currentUser) {
        break;
      }

      await db.update(user).set({
        plan: subscription.status === "active" ? "pro" : "hobby",
        subscriptionStatus: subscription.status,
        subscriptionExpiresAt: new Date(
          (subscription.cancel_at ?? Date.now()) * 1000
        ),
      });
      break;
    }
    default:
      return NextResponse.json(
        {
          message: `Unhandled event type: ${event.type}`,
        },
        { status: 500 }
      );
  }

  return NextResponse.json({ received: true });
}
