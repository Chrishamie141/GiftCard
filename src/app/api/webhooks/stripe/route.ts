import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { buildGiftCertificatePdf } from "@/lib/pdf";
import { getResend } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "");
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const md = session.metadata || {};
    const code = `PPC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const purchaserName = `${md.purchaserFirstName || ""} ${md.purchaserLastName || ""}`.trim();
    const recipientName = `${md.recipientFirstName || ""} ${md.recipientLastName || ""}`.trim();

    const order = await prisma.giftCertificateOrder.create({
      data: {
        stripeSessionId: session.id,
        stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
        amount: Number(md.amount),
        purchaserFirstName: md.purchaserFirstName || "",
        purchaserLastName: md.purchaserLastName || "",
        purchaserEmail: md.purchaserEmail || "",
        purchaserPhone: md.purchaserPhone || "",
        recipientFirstName: md.recipientFirstName || "",
        recipientLastName: md.recipientLastName || "",
        recipientEmail: md.recipientEmail || null,
        serviceAddress: md.serviceAddress || "",
        requestedCleaningDate: md.requestedCleaningDate ? new Date(`${md.requestedCleaningDate}T00:00:00.000Z`) : null,
        giftMessage: md.giftMessage || null,
        certificateCode: code,
        customerEmailSent: false,
        ownerEmailSent: false
      }
    });

    const pdf = await buildGiftCertificatePdf({ code, amount: Number(md.amount), recipient: recipientName, purchaser: purchaserName, message: md.giftMessage || undefined });

    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || "no-reply@example.com",
      to: md.purchaserEmail || "",
      subject: "Your Prestine Pros Cleaning Gift Certificate",
      text: `Thanks for your purchase, ${purchaserName}. Certificate code: ${code}. Amount: $${md.amount}.`,
      attachments: [{ filename: `gift-certificate-${code}.pdf`, content: Buffer.from(pdf) }]
    });

    const ownerEmail = process.env.OWNER_EMAIL;
    if (ownerEmail) {
      await getResend().emails.send({
        from: process.env.RESEND_FROM_EMAIL || "no-reply@example.com",
        to: ownerEmail,
        subject: `New gift certificate purchase (${code})`,
        text: [
          `Certificate Code: ${code}`,
          `Stripe Session ID: ${session.id}`,
          `Stripe Payment Intent: ${typeof session.payment_intent === "string" ? session.payment_intent : "N/A"}`,
          `Purchaser: ${purchaserName}`,
          `Purchaser Email: ${md.purchaserEmail || ""}`,
          `Phone: ${md.purchaserPhone || ""}`,
          `Recipient: ${recipientName}`,
          `Recipient Email: ${md.recipientEmail || "Not provided"}`,
          `Service Address: ${md.serviceAddress || ""}`,
          `Amount: $${md.amount || ""}`,
          `Requested Cleaning Date: ${md.requestedCleaningDate || "Not provided"}`,
          `Message: ${md.giftMessage || "None"}`
        ].join("\n")
      });
    }

    await prisma.giftCertificateOrder.update({
      where: { id: order.id },
      data: { customerEmailSent: true, ownerEmailSent: Boolean(ownerEmail) }
    });
  }

  return NextResponse.json({ received: true });
}
