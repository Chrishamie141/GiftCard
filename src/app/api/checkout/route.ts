import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const priceMap: Record<string, string | undefined> = {
  "100": process.env.STRIPE_PRICE_100,
  "200": process.env.STRIPE_PRICE_200,
  "300": process.env.STRIPE_PRICE_300
};

export async function POST(req: Request) {
  const body = await req.json();
  const price = priceMap[body.amount];
  if (!price) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price, quantity: 1 }],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: baseUrl,
    metadata: body
  });

  return NextResponse.json({ url: session.url });
}
