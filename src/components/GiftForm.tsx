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

const amounts: Array<{ value: FormState["amount"]; label: string; subtitle: string }> = [
  { value: "100", label: "$100", subtitle: "Refresh" },
  { value: "200", label: "$200", subtitle: "Deep Clean" },
  { value: "300", label: "$300", subtitle: "Premium Reset" }
];

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
    <form onSubmit={submit} className="rounded-3xl border border-white/60 bg-white/95 p-5 shadow-xl shadow-sky-100/70 backdrop-blur sm:p-7">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Choose gift amount</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {amounts.map((a) => (
            <button
              type="button"
              key={a.value}
              onClick={() => update("amount", a.value)}
              className={`rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${form.amount === a.value ? "border-sky-600 bg-sky-50 shadow-md shadow-sky-100" : "border-slate-200 bg-white hover:border-sky-300"}`}
            >
              <p className="text-2xl font-semibold text-slate-900">{a.label}</p>
              <p className="text-sm text-slate-500">{a.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {[
          ["Purchaser name", "purchaserName", "Jane Smith"],
          ["Recipient name", "recipientName", "Alex Johnson"],
          ["Email", "email", "name@email.com"],
          ["Phone", "phone", "(555) 555-5555"],
          ["Service address", "serviceAddress", "123 Main St, City, ST"]
        ].map(([label, key, placeholder]) => (
          <label key={key} className="space-y-2">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              placeholder={placeholder}
              value={form[key as keyof FormState] as string}
              onChange={(e) => update(key as keyof FormState, e.target.value)}
            />
          </label>
        ))}

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Gift message (optional)</span>
          <textarea
            className="min-h-28 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            placeholder="Wishing you a sparkling clean home!"
            value={form.giftMessage}
            onChange={(e) => update("giftMessage", e.target.value)}
          />
        </label>
      </div>

      <button
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-sky-700 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Redirecting to secure checkout..." : "Continue to Stripe Checkout"}
      </button>
    </form>
  );
}
