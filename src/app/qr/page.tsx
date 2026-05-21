import { QrHelper } from "@/components/QrHelper";

export default function QrPage() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const landingUrl = `${base.replace(/\/$/, "")}/gift-card`;

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8 sm:py-10">
      <QrHelper landingUrl={landingUrl} />
    </main>
  );
}
