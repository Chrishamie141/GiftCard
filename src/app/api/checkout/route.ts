import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

type CheckoutPayload = {
  amount: number;
  purchaserFirstName: string;
  purchaserLastName: string;
  purchaserEmail: string;
  purchaserPhone: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail?: string;
  serviceAddress: string;
  requestedCleaningDate: string;
  giftMessage?: string;
};

const allowedAmounts = new Set([100, 200, 300]);
const priceMap: Record<number, string | undefined> = {
  100: process.env.STRIPE_PRICE_100,
  200: process.env.STRIPE_PRICE_200,
  300: process.env.STRIPE_PRICE_300
};

const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validPhone = (v: string) => /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(v);

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutPayload;

  if (!allowedAmounts.has(body.amount)) return NextResponse.json({ error: "Amount must be 100, 200, or 300." }, { status: 400 });
  if (!body.purchaserFirstName?.trim()) return NextResponse.json({ error: "Purchaser first name is required." }, { status: 400 });
  if (!body.purchaserLastName?.trim()) return NextResponse.json({ error: "Purchaser last name is required." }, { status: 400 });
  if (!validEmail(body.purchaserEmail?.trim() || "")) return NextResponse.json({ error: "Purchaser email is invalid." }, { status: 400 });
  if (!validPhone(body.purchaserPhone?.trim() || "")) return NextResponse.json({ error: "Purchaser phone is invalid." }, { status: 400 });
  if (!body.recipientFirstName?.trim()) return NextResponse.json({ error: "Recipient first name is required." }, { status: 400 });
  if (!body.recipientLastName?.trim()) return NextResponse.json({ error: "Recipient last name is required." }, { status: 400 });
  if (body.recipientEmail && !validEmail(body.recipientEmail.trim())) return NextResponse.json({ error: "Recipient email is invalid." }, { status: 400 });
  if (!body.serviceAddress?.trim()) return NextResponse.json({ error: "Service address is required." }, { status: 400 });
  if (!body.requestedCleaningDate) return NextResponse.json({ error: "Requested cleaning date is required." }, { status: 400 });

  const requested = new Date(`${body.requestedCleaningDate}T00:00:00Z`);
  const today = new Date();
  const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  if (Number.isNaN(requested.getTime()) || requested < utcToday) return NextResponse.json({ error: "Requested cleaning date cannot be in the past." }, { status: 400 });

  const price = priceMap[body.amount];
  if (!price) return NextResponse.json({ error: "Price not configured for selected amount." }, { status: 400 });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{ price, quantity: 1 }],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/gift-card`,
    customer_email: body.purchaserEmail.trim(),
    metadata: {
      amount: String(body.amount),
      purchaserFirstName: body.purchaserFirstName.trim(),
      purchaserLastName: body.purchaserLastName.trim(),
      purchaserEmail: body.purchaserEmail.trim(),
      purchaserPhone: body.purchaserPhone.trim(),
      recipientFirstName: body.recipientFirstName.trim(),
      recipientLastName: body.recipientLastName.trim(),
      recipientEmail: body.recipientEmail?.trim() || "",
      serviceAddress: body.serviceAddress.trim(),
      requestedCleaningDate: body.requestedCleaningDate,
      giftMessage: body.giftMessage?.trim() || ""
    }
  });

  return NextResponse.json({ url: session.url });
}
