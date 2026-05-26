"use client";

import { useMemo, useState } from "react";

type FormState = {
  amount: "100" | "200" | "300";
  purchaserFirstName: string;
  purchaserLastName: string;
  purchaserEmail: string;
  purchaserPhone: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  serviceAddress: string;
  requestedCleaningDate: string;
  giftMessage: string;
};

type ErrorState = Partial<Record<keyof FormState, string>> & { form?: string };

const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

export function GiftForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});
  const [form, setForm] = useState<FormState>({
    amount: "100",
    purchaserFirstName: "",
    purchaserLastName: "",
    purchaserEmail: "",
    purchaserPhone: "",
    recipientFirstName: "",
    recipientLastName: "",
    recipientEmail: "",
    serviceAddress: "",
    requestedCleaningDate: "",
    giftMessage: ""
  });

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const update = (field: keyof FormState, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const validate = () => {
    const nextErrors: ErrorState = {};

    if (!form.purchaserFirstName.trim()) nextErrors.purchaserFirstName = "Purchaser first name is required.";
    if (!form.purchaserLastName.trim()) nextErrors.purchaserLastName = "Purchaser last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.purchaserEmail.trim())) nextErrors.purchaserEmail = "Enter a valid email address.";
    if (!PHONE_REGEX.test(form.purchaserPhone.trim())) nextErrors.purchaserPhone = "Enter a valid phone number.";
    if (!form.recipientFirstName.trim()) nextErrors.recipientFirstName = "Recipient first name is required.";
    if (!form.recipientLastName.trim()) nextErrors.recipientLastName = "Recipient last name is required.";
    if (form.recipientEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.recipientEmail.trim())) nextErrors.recipientEmail = "Recipient email must be valid.";
    if (!form.serviceAddress.trim()) nextErrors.serviceAddress = "Service address is required.";
    if (!["100", "200", "300"].includes(form.amount)) nextErrors.amount = "Select a valid amount.";
    if (!form.requestedCleaningDate) nextErrors.requestedCleaningDate = "Requested cleaning date is required.";
    if (form.requestedCleaningDate && form.requestedCleaningDate < today) nextErrors.requestedCleaningDate = "Requested cleaning date cannot be in the past.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    const payload = {
      amount: Number(form.amount),
      purchaserFirstName: form.purchaserFirstName.trim(),
      purchaserLastName: form.purchaserLastName.trim(),
      purchaserEmail: form.purchaserEmail.trim(),
      purchaserPhone: form.purchaserPhone.trim(),
      recipientFirstName: form.recipientFirstName.trim(),
      recipientLastName: form.recipientLastName.trim(),
      recipientEmail: form.recipientEmail.trim(),
      serviceAddress: form.serviceAddress.trim(),
      requestedCleaningDate: form.requestedCleaningDate,
      giftMessage: form.giftMessage.trim()
    };

    const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();

    if (!res.ok) {
      setErrors({ form: data.error || "Unable to start checkout." });
      setLoading(false);
      return;
    }

    if (data.url) window.location.href = data.url;
    setLoading(false);
  };

  const renderFieldError = (key: keyof FormState) => errors[key] ? <p className="mt-1 text-sm text-rose-600">{errors[key]}</p> : null;

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="grid grid-cols-3 gap-2">
        {(["100", "200", "300"] as const).map((a) => (
          <button type="button" key={a} onClick={() => update("amount", a)} className={`rounded-xl border p-3 font-semibold ${form.amount === a ? "border-sky-600 bg-sky-50" : "border-slate-200"}`}>
            ${a}
          </button>
        ))}
      </div>
      {renderFieldError("amount")}

      <div className="grid gap-3 sm:grid-cols-2">
        <div><input className="w-full rounded-xl border border-slate-300 p-3" placeholder="Purchaser first name" value={form.purchaserFirstName} onChange={(e) => update("purchaserFirstName", e.target.value)} />{renderFieldError("purchaserFirstName")}</div>
        <div><input className="w-full rounded-xl border border-slate-300 p-3" placeholder="Purchaser last name" value={form.purchaserLastName} onChange={(e) => update("purchaserLastName", e.target.value)} />{renderFieldError("purchaserLastName")}</div>
      </div>
      <div><input type="email" className="w-full rounded-xl border border-slate-300 p-3" placeholder="Purchaser email" value={form.purchaserEmail} onChange={(e) => update("purchaserEmail", e.target.value)} />{renderFieldError("purchaserEmail")}</div>
      <div><input className="w-full rounded-xl border border-slate-300 p-3" placeholder="Purchaser phone" value={form.purchaserPhone} onChange={(e) => update("purchaserPhone", e.target.value)} />{renderFieldError("purchaserPhone")}</div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div><input className="w-full rounded-xl border border-slate-300 p-3" placeholder="Recipient first name" value={form.recipientFirstName} onChange={(e) => update("recipientFirstName", e.target.value)} />{renderFieldError("recipientFirstName")}</div>
        <div><input className="w-full rounded-xl border border-slate-300 p-3" placeholder="Recipient last name" value={form.recipientLastName} onChange={(e) => update("recipientLastName", e.target.value)} />{renderFieldError("recipientLastName")}</div>
      </div>
      <div><input type="email" className="w-full rounded-xl border border-slate-300 p-3" placeholder="Recipient email (optional)" value={form.recipientEmail} onChange={(e) => update("recipientEmail", e.target.value)} />{renderFieldError("recipientEmail")}</div>
      <div><input className="w-full rounded-xl border border-slate-300 p-3" placeholder="Service address" value={form.serviceAddress} onChange={(e) => update("serviceAddress", e.target.value)} />{renderFieldError("serviceAddress")}</div>
      <div><input type="date" min={today} className="w-full rounded-xl border border-slate-300 p-3" value={form.requestedCleaningDate} onChange={(e) => update("requestedCleaningDate", e.target.value)} />{renderFieldError("requestedCleaningDate")}</div>
      <textarea className="w-full rounded-xl border border-slate-300 p-3" placeholder="Optional gift message" value={form.giftMessage} onChange={(e) => update("giftMessage", e.target.value)} />

      {errors.form ? <p className="text-sm text-rose-600">{errors.form}</p> : null}
      <button disabled={loading} className="w-full rounded-xl bg-sky-700 p-3 font-semibold text-white">{loading ? "Redirecting..." : "Pay with Stripe"}</button>
    </form>
  );
}
