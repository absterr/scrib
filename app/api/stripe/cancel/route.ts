import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(req: NextRequest) {
  const { subscriptionId }: { subscriptionId: string } = await req.json();
  if (!subscriptionId)
    return NextResponse.json(
      { error: "Invalid subscription ID" },
      { status: 400 }
    );

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    return NextResponse.json({
      canceled: subscription.cancel_at_period_end,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `An unexpected error occured: ${error}` },
      { status: 500 }
    );
  }
}
