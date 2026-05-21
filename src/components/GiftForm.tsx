"use client";

import { useState } from "react";

type FormState = {
  amount: "100" | "200" | "300";
  purchaserName: string;
  recipientName: string;
  email: string;
  phone: string;
  serviceAddress: string;
  giftMessage: string;
};

export function GiftForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    amount: "100",
    purchaserName: "",
    recipientName: "",
    email: "",
    phone: "",
    serviceAddress: "",
    giftMessage: ""
  });

  const update = (field: keyof FormState, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="grid grid-cols-3 gap-2">
        {(["100", "200", "300"] as const).map((a) => (
          <button type="button" key={a} onClick={() => update("amount", a)} className={`rounded-xl border p-3 font-semibold ${form.amount === a ? "border-sky-600 bg-sky-50" : "border-slate-200"}`}>
            ${a}
          </button>
        ))}
      </div>
      {[
        ["Purchaser name", "purchaserName"],
        ["Recipient name", "recipientName"],
        ["Email", "email"],
        ["Phone", "phone"],
        ["Service address", "serviceAddress"]
      ].map(([label, key]) => (
        <input key={key} required className="w-full rounded-xl border border-slate-300 p-3" placeholder={label} value={form[key as keyof FormState] as string} onChange={(e) => update(key as keyof FormState, e.target.value)} />
      ))}
      <textarea className="w-full rounded-xl border border-slate-300 p-3" placeholder="Optional gift message" value={form.giftMessage} onChange={(e) => update("giftMessage", e.target.value)} />
      <button disabled={loading} className="w-full rounded-xl bg-sky-700 p-3 font-semibold text-white">{loading ? "Redirecting..." : "Pay with Stripe"}</button>
    </form>
  );
}
