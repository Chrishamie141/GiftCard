"use client";

import { useMemo, useState } from "react";
import QRCode from "qrcode";

export function QrHelper({ landingUrl }: { landingUrl: string }) {
  const [qr, setQr] = useState<string>("");
  const [copyLabel, setCopyLabel] = useState("Copy Landing Page URL");

  useMemo(() => {
    QRCode.toDataURL(landingUrl, { width: 1200, margin: 1 }).then(setQr).catch(() => setQr(""));
  }, [landingUrl]);

  const download = () => {
    if (!qr) return;
    const a = document.createElement("a");
    a.href = qr;
    a.download = "prestine-pros-gift-card-qr.png";
    a.click();
  };

  const copy = async () => {
    await navigator.clipboard.writeText(landingUrl);
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy Landing Page URL"), 1500);
  };

  return (
    <div className="animate-fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
      <p className="mb-2 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-800">
        Prestine Pros Cleaning
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Gift Card QR Code</h1>
      <p className="mt-2 text-sm text-slate-600">Customers scan this code to open your landing page at <span className="font-medium text-slate-900">{landingUrl}</span>.</p>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        {qr ? <img src={qr} alt="Gift card landing page QR" className="mx-auto w-full max-w-sm rounded-xl bg-white p-3" /> : <p>Generating QR code...</p>}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button onClick={download} className="rounded-xl bg-sky-700 px-4 py-3 font-semibold text-white transition hover:bg-sky-800">Download PNG</button>
        <button onClick={copy} className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-800 transition hover:bg-slate-50">{copyLabel}</button>
      </div>
    </div>
  );
}
