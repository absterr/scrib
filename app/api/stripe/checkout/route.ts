import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(req: NextRequest) {
  const {
    email,
    interval,
    userId,
  }: { email: string; interval: "month" | "year"; userId: string } =
    await req.json();
  if (!email || !interval || !userId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const priceId =
    interval === "month"
      ? process.env.SCRIB_PRO_MONTHLY_ID!
      : process.env.SCRIB_PRO_YEARLY_ID!;

  try {
    // CREATE OR REUSE STRIPE CUSTOMER
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data.length
      ? customers.data[0]
      : await stripe.customers.create({ email, metadata: { userId } });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.BETTER_AUTH_URL}/billing?action=checkout&status=success`,
      cancel_url: `${process.env.BETTER_AUTH_URL}/billing?action=checkout&status=cancel`,
      metadata: { userId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: `An unexpected error occured: ${error}` },
      { status: 500 }
    );
  }
}
