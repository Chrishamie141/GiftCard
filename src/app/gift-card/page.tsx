import { GiftForm } from "@/components/GiftForm";

export default function GiftCardPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="animate-fade-up rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl shadow-sky-100/70 backdrop-blur sm:p-8">
        <p className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
          Prestine Pros Cleaning
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Premium cleaning gift certificates.
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
          Send a polished, practical gift in minutes. Select an amount, add recipient details, and complete secure checkout. We&apos;ll email a professional certificate PDF and receipt right away.
        </p>
      </section>

      <section className="mt-7 animate-fade-up [animation-delay:120ms]">
        <GiftForm />
      </section>
    </main>
  );
}
