import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { customerId } = await req.json();
  if (!customerId) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.BETTER_AUTH_URL}/billing`,
  });

  return NextResponse.json({ url: session.url });
}
