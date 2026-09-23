"use client";

import { useState, useMemo } from "react";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Image from "next/image";

const MONTHLY_RATE = 0.10; // 10% flat facilitation fee, deducted from disbursement - not paid upfront
const MIN_AMOUNT = 1000;
const MAX_AMOUNT = 50000;
const STEP = 500;

function formatKES(amount: number): string {
  return new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(amount);
}

function LoanCalculator() {
  const [amount, setAmount] = useState(10000);

  const { fee, disbursed } = useMemo(() => {
    const fee = Math.round(amount * MONTHLY_RATE);
    return { fee, disbursed: amount - fee };
  }, [amount]);

  return (
    <div className="w-full max-w-md rounded-lg border border-mist bg-white/60 p-6 shadow-[0_2px_0_0_#D8D2C0] sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-savanna">Your estimate</span>
        <span className="rounded-full bg-savanna/10 px-2.5 py-1 font-mono text-xs text-savanna">Quick Cash</span>
      </div>

      <label htmlFor="loan-amount" className="mb-2 block font-body text-sm text-ink/70">
        How much would help right now?
      </label>
      <div className="mb-4 font-mono text-4xl font-semibold text-ink sm:text-5xl">
        KES {formatKES(amount)}
      </div>

      <input
        id="loan-amount"
        type="range"
        min={MIN_AMOUNT}
        max={MAX_AMOUNT}
        step={STEP}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="mb-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-mist accent-savanna"
        aria-label="Loan amount"
      />

      <div className="space-y-3 border-t border-dashed border-mist pt-4 font-mono text-sm">
        <div className="flex justify-between text-ink/60">
          <span>Facilitation fee (10%)</span>
          <span>− KES {formatKES(fee)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold text-savanna">
          <span>You receive</span>
          <span>KES {formatKES(disbursed)}</span>
        </div>
      </div>

      <p className="mt-4 font-body text-xs text-ink/50">
        Fee is deducted from your disbursement — you never pay anything upfront.
      </p>

      
      <a href="/apply"
        className="mt-6 block w-full rounded-md bg-marigold py-3 text-center font-display text-sm font-semibold text-ink transition-colors hover:bg-marigold-dark"
      >
        Continue with KES {formatKES(amount)}
      </a>
    </div>
  );
}

function TrustBar() {
  const items = [
    { label: "Digital Credit Provider", value: "CBK Licensed" },
    { label: "Applications processed", value: "12,000+" },
    { label: "Average decision time", value: "Under 2 hrs" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 border-y border-mist py-8 sm:grid-cols-3 sm:gap-4">
      {items.map((item) => (
        <div key={item.label} className="text-center sm:border-r sm:border-mist sm:last:border-r-0">
          <div className="font-display text-2xl font-semibold text-savanna">{item.value}</div>
          <div className="mt-1 font-body text-xs uppercase tracking-wide text-ink/50">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function WhySection() {
  const items = [
    { title: "Know what you're getting", detail: "See your fees and terms before you apply." },
    { title: "Talk to a real person", detail: "Need help? Reach us directly through WhatsApp or phone." },
    { title: "Built for real life", detail: "From school fees to business stock and unexpected expenses." },
    { title: "Money where you need it", detail: "Approved funds are sent directly to M-Pesa." },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mb-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-md">
          <div className="mb-2 font-mono text-xs uppercase tracking-wider text-marigold-dark">
            Why people choose Hakiba
          </div>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Money should be simple.
          </h2>
        </div>
        <div className="hidden h-40 w-56 flex-shrink-0 overflow-hidden rounded-lg lg:block">
        <Image
          src="/images/market_stall_1.jpg"
          alt="A market stall with fresh produce"
          width={400}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>
      </div>

      <div className="border-t border-mist">
        {items.map((item) => (
          <div key={item.title} className="grid grid-cols-1 gap-2 border-b border-mist py-8 sm:grid-cols-[220px_1fr] sm:gap-10">
            <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
            <p className="max-w-[52ch] font-body text-sm leading-relaxed text-ink/60 sm:text-base">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BranchesSection() {
  const branches = [
    "Kimilili",
    "Bungoma",
    "Busia",
    "Malaba",
    "Rongo",
    "Chwele",
    "Kakamega",
    "Webuye",
  ];

  return (
    <section id="branches" className="py-16 sm:py-24">
      <div className="mb-12 max-w-md">
        <div className="mb-2 font-mono text-xs uppercase tracking-wider text-marigold-dark">
          Where we operate
        </div>
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          We&apos;re not just an app. We&apos;re around the corner.
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
        {branches.map((branch) => (
          <div key={branch}>
            <h3 className="font-display text-lg font-semibold text-ink">{branch}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductsPreview() {
  const products = [
    { name: "Quick Cash", range: "KES 1,000 – 20,000", bestFor: "Unexpected bills, emergencies, bridging until payday." },
    { name: "Business Boost", range: "KES 5,000 – 50,000", bestFor: "Stocking inventory, a supplier payment, small equipment." },
    { name: "School Fees Advance", range: "KES 2,000 – 30,000", bestFor: "School fees, exam fees, back-to-school costs." },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-md">
          <div className="mb-2 font-mono text-xs uppercase tracking-wider text-marigold-dark">
            Different needs
          </div>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            One simple process.
          </h2>
        </div>
        <a
          href="/products"
          className="font-body text-sm font-medium text-savanna underline underline-offset-4 hover:text-savanna-light"
        >
          See all products →
        </a>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-mist bg-mist sm:grid-cols-3">
        {products.map((product) => (
          <div key={product.name} className="bg-white/50 p-6">
            <h3 className="font-display text-lg font-semibold text-savanna">{product.name}</h3>
            <div className="mt-1 font-mono text-xl font-semibold text-ink">{product.range}</div>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink/60">{product.bestFor}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Tell us what you need", detail: "Choose an amount and a reason. Takes under two minutes." },
    { title: "Verify your details", detail: "Confirm your phone number with an OTP — no password to remember." },
    { title: "Get your decision", detail: "Most applications are reviewed within a couple of hours." },
    { title: "Receive your money", detail: "Approved loans are sent straight to your M-Pesa." },
  ];

  return (
    <section className="py-16 sm:py-24">
      <h2 className="mb-12 font-display text-3xl font-semibold text-ink sm:text-4xl">
        From application to M-Pesa,<br />in four steps.
      </h2>

      <div className="relative">
        <div className="absolute left-0 right-0 top-5 hidden h-px bg-mist sm:block" aria-hidden="true" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex gap-4 sm:block sm:gap-0">
              {i < steps.length - 1 && (
                <div className="absolute left-5 top-10 h-full w-px bg-mist sm:hidden" aria-hidden="true" />
              )}

              <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-savanna bg-paper font-mono text-sm font-semibold text-savanna">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="sm:mt-4">
                <h3 className="mb-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed text-ink/60">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Testimonial = {
  quote: string;
  name: string;
  context: string; // e.g. "Shopkeeper, Bungoma" — role/location, not fabricated business details
};

const TESTIMONIALS: Testimonial[] = [];

function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mb-12 max-w-md">
        <div className="mb-2 font-mono text-xs uppercase tracking-wider text-marigold-dark">
          From our customers
        </div>
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Real people, real situations.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="rounded-lg border border-mist bg-white/50 p-6">
            <p className="font-body text-sm leading-relaxed text-ink/70">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4 font-display text-sm font-semibold text-savanna">{t.name}</div>
            <div className="font-body text-xs text-ink/50">{t.context}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HumanConnection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="relative h-80 overflow-hidden rounded-2xl shadow-lg sm:h-96">
            <Image
              src="/images/consultation.jpg"
              alt="A Hakiba representative meeting with a customer"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-6 rounded-lg bg-paper px-5 py-4 shadow-lg ring-1 ring-mist sm:left-8">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-marigold" />
              <span className="font-display text-sm font-semibold text-ink">Personal assessment</span>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-marigold-dark">
            How we work with you
          </div>
          <h2 className="mb-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Real people. Real conversations. Real support.
          </h2>
          <p className="font-body text-lg leading-relaxed text-ink/70">
            Hakiba combines financial services with personal interaction. Our team takes the
            time to understand your needs and assess the security behind your application.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Nav />

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <div className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-marigold-dark">
            Financing built around you
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Financial support,<br />built around you.
          </h1>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink/70">
            Access financing based on your needs and the security you provide, with a Hakiba
            team member guiding you through the process.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            
            <a
              href="/apply"
              className="rounded-md bg-marigold px-7 py-3.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-marigold-dark"
            >
              Get started
            </a>
            
            <a
              href="#branches"
              className="rounded-md border border-savanna px-7 py-3.5 font-display text-sm font-semibold text-savanna transition-colors hover:bg-savanna hover:text-paper"
            >
              Find a branch
            </a>
          </div>
        </div>

        <div className="relative h-72 overflow-hidden rounded-2xl shadow-lg sm:h-96 lg:h-[420px]">
          <Image
            src="/images/shop_stall_1.jpg"
            alt="A Kenyan small business owner at their shop"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Estimate your financing.
          </h2>
          <p className="mt-3 font-body text-ink/60">
            See an example of how your requested amount and applicable fees could work.
          </p>
        </div>
        <LoanCalculator />
      </section>

       <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <HumanConnection />
        </Reveal>
      </div>


      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <TrustBar />
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <WhySection />
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <TestimonialsSection />
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <ProductsPreview />
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <HowItWorks />
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <BranchesSection />
        </Reveal>
      </div>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-lg bg-savanna px-8 py-12 text-center sm:py-16">
            <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
              Ready to apply?
            </h2>
            <p className="mx-auto mt-3 max-w-md font-body text-paper/80">
              It takes about two minutes, and you&apos;ll know your terms before you commit to anything.
            </p>

            <a
              href="/apply"
              className="mt-6 inline-block rounded-md bg-marigold px-8 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-marigold-dark"
            >
              Start your application
            </a>

            <div className="mx-auto mt-10 max-w-md border-t border-paper/15 pt-8">
              <p className="font-body text-sm text-paper/70">
                Have questions first? Talk to a real person — no call centre queue, no chatbot loop.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/254700000000"
                  className="rounded-md border border-paper/30 px-5 py-2.5 font-body text-sm font-medium text-paper transition-colors hover:border-paper"
                >
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+254700000000"
                  className="rounded-md border border-paper/30 px-5 py-2.5 font-body text-sm font-medium text-paper transition-colors hover:border-paper"
                >
                  Call +254 700 000 000
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <footer className="border-t border-mist px-6 py-8 text-center font-body text-xs text-ink/50">
        Hakiba is a licensed Digital Credit Provider. Read our{" "}
        <a href="/terms" className="underline">Terms</a> and{" "}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </footer>
    </main>
  );
}