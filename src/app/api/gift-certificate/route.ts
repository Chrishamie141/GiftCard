import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ error: "session_id required" }, { status: 400 });
  const order = await prisma.giftCertificateOrder.findUnique({ where: { stripeSessionId: sessionId } });
  return NextResponse.json({ order });
}
