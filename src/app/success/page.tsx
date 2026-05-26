import Link from "next/link";

export default async function SuccessPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-2 text-3xl font-bold">Payment Successful</h1>
      <p className="mb-6 text-slate-600">Your gift certificate PDF and receipt have been emailed.</p>
      <div><Link href="/" className="text-sky-700 underline">Back to home</Link></div>
    </main>
  );
}
