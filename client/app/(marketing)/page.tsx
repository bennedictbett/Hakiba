"use client";

import { useState, useMemo } from "react";
import Nav from "@/components/Nav";

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
        <span className="font-mono text-xs uppercase tracking-wider text-savanna">Loan estimate</span>
        <span className="rounded-full bg-savanna/10 px-2.5 py-1 font-mono text-xs text-savanna">Quick Cash</span>
      </div>

      <label htmlFor="loan-amount" className="mb-2 block font-body text-sm text-ink/70">
        How much do you need?
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
        Apply for this amount
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
    { title: "Fees you see upfront", detail: "..." },
    { title: "No CRB check required", detail: "..." },
    { title: "Decisions in hours, not days", detail: "..." },
    { title: "Straight to M-Pesa", detail: "..." },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mb-12 max-w-md">
        <div className="mb-2 font-mono text-xs uppercase tracking-wider text-marigold-dark">
          Why people choose Hakiba
        </div>
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Straightforward terms, nothing buried in fine print.
        </h2>
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

function HowItWorks() {
  const steps = [
    { title: "Verify your phone", detail: "Log in with an OTP sent to your number — no password to remember." },
    { title: "Tell us what you need", detail: "Choose an amount and a reason. Takes under two minutes." },
    { title: "Get a decision", detail: "Most applications are reviewed within a couple of hours." },
    { title: "Receive your funds", detail: "Approved loans are sent straight to your M-Pesa." },
  ];

  return (
    <section className="py-16 sm:py-24">
      <h2 className="mb-12 font-display text-3xl font-semibold text-ink sm:text-4xl">
        From application to M-Pesa,<br />in four steps.
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div key={step.title}>
            <div className="mb-3 font-mono text-sm text-marigold-dark">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="mb-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
            <p className="font-body text-sm leading-relaxed text-ink/60">{step.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Nav />

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-12 sm:py-20 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
            Money when you<br />need it. No games.
          </h1>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink/70">
            Small loans for real situations — school fees, stock for your business, an
            unexpected bill. See exactly what you&apos;ll get before you apply.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <LoanCalculator />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <TrustBar />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <WhySection />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <HowItWorks />
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-lg bg-savanna px-8 py-12 text-center sm:py-16">
          <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
            Ready to apply?
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-savanna-light/90">
            It takes about two minutes, and you&apos;ll know your terms before you commit to anything.
          </p>
          
          <a
            href="/apply"
            className="mt-6 inline-block rounded-md bg-marigold px-8 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-marigold-dark"
          >
            Start your application
          </a>
        </div>
      </section>

      <footer className="border-t border-mist px-6 py-8 text-center font-body text-xs text-ink/50">
        Hakiba is a licensed Digital Credit Provider. Read our{" "}
        <a href="/terms" className="underline">Terms</a> and{" "}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </footer>
    </main>
  );
}