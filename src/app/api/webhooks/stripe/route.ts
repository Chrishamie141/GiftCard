import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { buildGiftCertificatePdf } from "@/lib/pdf";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const md = session.metadata || {};
    const code = `PPC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    await prisma.giftCertificateOrder.create({
      data: {
        stripeSessionId: session.id,
        amount: Number(md.amount),
        purchaserName: md.purchaserName || "",
        recipientName: md.recipientName || "",
        email: md.email || "",
        phone: md.phone || "",
        serviceAddress: md.serviceAddress || "",
        giftMessage: md.giftMessage || null,
        certificateCode: code
      }
    });

    const pdf = await buildGiftCertificatePdf({ code, amount: Number(md.amount), recipient: md.recipientName || "", purchaser: md.purchaserName || "", message: md.giftMessage || undefined });

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "no-reply@example.com",
      to: md.email || "",
      subject: "Your Prestine Pros Cleaning Gift Certificate",
      text: `Thanks for your purchase. Certificate code: ${code}`,
      attachments: [{ filename: `gift-certificate-${code}.pdf`, content: Buffer.from(pdf) }]
    });
  }

  return NextResponse.json({ received: true });
}
