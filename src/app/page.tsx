import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-4 py-10 text-center">
      <p className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-800">
        Prestine Pros Cleaning
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Gift Certificates</h1>
      <p className="mt-3 text-slate-600">Give a premium home-cleaning gift certificate in minutes.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/gift-card" className="rounded-xl bg-sky-700 px-4 py-3 font-semibold text-white transition hover:bg-sky-800">Purchase Gift Certificate</Link>
      </div>
    </main>
  );
}
