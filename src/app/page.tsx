
import Image from "next/image";
import Link from "next/link";

// --- Configuration Data ---
const GIFT_AMOUNTS = [100, 200, 300];

const FEATURES = [
  { icon: "✉️", title: "Instant Delivery", description: "Email certificate in minutes" },
  { icon: "🛡️", title: "Secure Checkout", description: "Powered by Stripe" },
  { icon: "📄", title: "Professional PDF", description: "Beautiful & ready to print" },
  { icon: "♡", title: "Perfect Gift", description: "Great for any occasion" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
      
      {/* --- Navigation Header --- */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md md:px-12 lg:px-20">
        <Link href="/" className="transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg">
          <Image
            src="/images/prestine-logo.png"
            alt="Prestine Pros Cleaning Logo"
            width={1000}
            height={350}
            priority
            className="h-20 w-auto object-contain md:h-24 lg:h-28"          
            />
        </Link>

        <Link
          href="/gift-card"
          className="rounded-full bg-sky-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 md:px-6 md:py-3 md:text-base"
        >
          🎁 Purchase Gift Certificate
        </Link>
      </header>

      {/* --- Hero Section --- */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden bg-white">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cleaning-hero.png"
            alt="Professional cleaner in a beautifully clean home"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Smooth gradient transition from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent max-md:bg-white/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:px-12 lg:px-20">
          <div className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700 ring-1 ring-cyan-600/10">
              ✨ Prestine Pros Cleaning
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-sky-950 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              Give the Gift of a <span className="text-cyan-600">Sparkling Clean</span> Home
            </h1>

            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              Choose a cleaning service gift certificate, complete checkout, and
              we’ll instantly email a polished PDF certificate and receipt.
            </p>

            {/* Gift Cards Grid */}
            <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              {GIFT_AMOUNTS.map((amount) => (
                <GiftCard key={amount} amount={amount} />
              ))}
            </div>

            {/* Primary CTA Button */}
            <Link
              href="/gift-card"
              className="group mt-8 flex w-full max-w-md items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-sky-800 to-sky-950 p-4 text-xl font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl transition-transform group-hover:scale-110">
                🎁
              </span>
              <div className="text-left">
                <p className="leading-tight">Purchase Gift Certificate</p>
                <span className="block text-xs font-medium text-sky-200/90 mt-0.5">
                  Fast • Easy • Instant Delivery
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Features Value Proposition Section --- */}
      <section className="border-t border-slate-100 bg-white px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </main>
  );
}

// --- Isolated Sub-Components ---

function GiftCard({ amount }: { amount: number }) {
  return (
    <div className="group relative rounded-2xl border border-slate-100 bg-white p-5 shadow-md transition-all hover:border-cyan-200 hover:shadow-xl">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-2xl transition-colors group-hover:bg-cyan-100">
        🎁
      </div>
      <p className="mt-4 text-3xl font-black text-sky-950 tracking-tight">
        ${amount}
      </p>
      <p className="text-sm font-medium text-slate-500">
        Gift Certificate
      </p>
      <div className="mt-4 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full w-1/3 bg-cyan-500 transition-all group-hover:w-full duration-500 ease-out" />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-2">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-xl text-cyan-600">
        {icon}
      </span>
      <div>
        <h3 className="text-base font-bold text-sky-950">{title}</h3>
        <p className="mt-0.5 text-sm leading-normal text-slate-500">{description}</p>
      </div>
    </div>
  );
}
