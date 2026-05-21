import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-4 py-10 sm:px-6">
      <section className="animate-fade-up rounded-3xl border border-white/70 bg-white/90 p-7 text-center shadow-xl shadow-sky-100/70 backdrop-blur sm:p-10">
        <p className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">Prestine Pros Cleaning</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Thoughtful gifts. Beautifully clean homes.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">Purchase a professional cleaning gift certificate in moments with secure checkout and instant certificate delivery.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/gift-card" className="rounded-xl bg-sky-700 px-5 py-3.5 font-semibold text-white transition hover:bg-sky-800">Buy Gift Certificate</Link>
          <Link href="/qr" className="rounded-xl border border-slate-300 bg-white px-5 py-3.5 font-semibold text-slate-800 transition hover:bg-slate-50">Open QR Page</Link>
        </div>
      </section>
    </main>
  );
}
