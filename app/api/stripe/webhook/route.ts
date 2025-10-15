import { db } from "@/db/drizzle";
import { user } from "@/db/schema/auth-schema";
import { type UserPlan } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const PRICE_TO_PLAN: Record<string, UserPlan> = {
    [process.env.SCRIB_PRO_MONTHLY_ID!]: "Pro monthly",
    [process.env.SCRIB_PRO_YEARLY_ID!]: "Pro yearly",
  };

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
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (!userId) {
        return NextResponse.json(
          { error: "User ID is not set" },
          { status: 500 }
        );
      }

      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0].price.id;
      const plan = PRICE_TO_PLAN[priceId];

      await db
        .update(user)
        .set({
          plan,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          subscriptionStatus: subscription.status,
          subscriptionExpiresAt: new Date(
            (session.expires_at ?? Date.now()) * 1000
          ),
        })
        .where(eq(user.id, userId));
      break;
    }

    case "customer.subscription.updated": {
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

      const priceId = subscription.items.data[0].price.id;
      const plan = PRICE_TO_PLAN[priceId] ?? "Hobby";
      const isPendingCancel = subscription.cancel_at_period_end === true;

      await db
        .update(user)
        .set({
          plan,
          subscriptionStatus: isPendingCancel
            ? "canceled"
            : subscription.status,
          subscriptionExpiresAt: subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000)
            : null,
        })
        .where(eq(user.id, currentUser.id));
      break;
    }
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

      await db
        .update(user)
        .set({
          plan: "Hobby",
          subscriptionStatus: null,
          subscriptionExpiresAt: null,
        })
        .where(eq(user.id, currentUser.id));
      break;
    }
    default:
      return NextResponse.json({
        error: `Unhandled event type: ${event.type}`,
      });
  }

  return NextResponse.json({ received: true });
}
