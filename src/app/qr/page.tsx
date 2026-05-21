import { QrHelper } from "@/components/QrHelper";

export default function QrPage() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const landingUrl = `${base.replace(/\/$/, "")}/gift-card`;

  return <QrHelper landingUrl={landingUrl} />;
}
