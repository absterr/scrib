import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const { customerId }: { customerId: string } = await req.json();
  if (!customerId) {
    return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.BETTER_AUTH_URL}/billing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: `An unexpected error occured: ${error}` },
      { status: 500 }
    );
  }
}
