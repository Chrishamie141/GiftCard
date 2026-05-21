import { GiftForm } from "@/components/GiftForm";

export default function GiftCardPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-4 py-8 sm:py-10">
      <section className="animate-fade-up rounded-3xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-sky-100/60 backdrop-blur sm:p-8">
        <p className="mb-2 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-800">
          Prestine Pros Cleaning
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Gift a sparkling clean home.
        </h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
          Choose a cleaning service gift certificate, complete checkout, and we&apos;ll instantly email a polished PDF certificate and receipt.
        </p>
      </section>

      <section className="mt-6 animate-fade-up [animation-delay:120ms]">
        <GiftForm />
      </section>
    </main>
  );
}
