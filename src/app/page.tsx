import QRCode from "qrcode";
import { GiftForm } from "@/components/GiftForm";

export default async function Home() {
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const qrCode = await QRCode.toDataURL(url);

  return (
    <main className="mx-auto min-h-screen max-w-xl p-4">
      <h1 className="mb-2 text-3xl font-bold">Prestine Pros Cleaning</h1>
      <p className="mb-6 text-slate-600">Give the gift of a spotless home.</p>
      <div className="mb-6 rounded-2xl bg-white p-4 text-center shadow-sm">
        <p className="mb-2 text-sm font-medium">Scan to open this gift certificate page</p>
        <img className="mx-auto h-36 w-36" src={qrCode} alt="QR code" />
      </div>
      <GiftForm />
    </main>
  );
}
