import Link from "next/link";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-2 text-3xl font-bold">Payment Successful</h1>
      <p className="mb-6 text-slate-600">Your gift certificate is being emailed with receipt.</p>
      <a href={`/api/pkpass?session_id=${session_id ?? ""}&redirect_url=${encodeURIComponent((process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").replace(/\/$/, "") + "/gift-card")}`} className="mb-4 inline-block rounded-xl bg-black px-4 py-3 text-white">Add to Apple Wallet</a>
      <div><Link href="/" className="text-sky-700 underline">Back to home</Link></div>
    </main>
  );
}
