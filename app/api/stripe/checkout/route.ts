import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const {
    email,
    priceId,
    userId,
  }: { email: string; priceId: string; userId: string } = await req.json();
  if (!email || !priceId || !userId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

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
      success_url: `${process.env.BETTER_AUTH_URL}/billing?success=true`,
      cancel_url: `${process.env.BETTER_AUTH_URL}/billing?cancel=true`,
      subscription_data: {
        metadata: { userId },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occured." },
      { status: 500 }
    );
  }
}
