"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function QrHelper({ landingUrl }: { landingUrl: string }) {
  const [qr, setQr] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(landingUrl, { width: 1400, margin: 1 }).then(setQr).catch(() => setQr(""));
  }, [landingUrl]);

  return (
    <div className="animate-fade-up mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-4 py-10 text-center">
      <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Prestine Pros Cleaning</p>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
        {qr ? <img src={qr} alt="Gift card purchase QR" className="mx-auto w-full max-w-sm" /> : <p>Loading QR code...</p>}
      </div>
      <p className="mt-6 text-base text-slate-600">Scan code to purchase gift card.</p>
    </div>
  );
}
