"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Do I have to pay anything before getting my loan?",
    a: "No. Never. Our facilitation fee is deducted from the amount you receive — you never send us money upfront. If anyone claiming to be Hakiba asks you to pay a 'registration' or 'processing' fee before disbursement, it isn't us, and you should report it.",
  },
  {
    q: "How much can I borrow?",
    a: "Loan amounts range from KES 1,000 to KES 50,000, depending on the product and your application. You can see an estimate of your repayment on the homepage calculator before you even apply.",
  },
  {
    q: "How long does approval take?",
    a: "Most applications are reviewed within a couple of hours during business hours. You'll get your reference number immediately, and we'll follow up by SMS or call once a decision is made.",
  },
  {
    q: "What do I need to apply?",
    a: "Your phone number, national ID number, and a few basic details about what you need the loan for. Some products may ask for an M-Pesa statement to help us assess your application fairly.",
  },
  {
    q: "How do I receive the money?",
    a: "Approved loans are sent directly to the M-Pesa number linked to your account. No bank visit required.",
  },
  {
    q: "What happens if I can't repay on time?",
    a: "Contact us before your due date — we'd rather work out a plan with you than have you avoid us. Reach out through the contact page as soon as you know repayment might be a problem.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-mist py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold text-ink sm:text-lg">{q}</span>
        <span className={`ml-4 flex-shrink-0 font-display text-xl text-savanna transition-transform ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      {open && (
        <p className="mt-3 font-body text-sm leading-relaxed text-ink/60 sm:text-base">{a}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <main>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="font-display text-xl font-bold text-savanna">Hakiba</a>
        <a
        
          href="/login"
          className="rounded-md border border-savanna px-4 py-2 font-body text-sm font-medium text-savanna transition-colors hover:bg-savanna hover:text-paper"
        >
          Log in
        </a>
      </nav>

      <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <h1 className="mb-3 font-display text-3xl font-bold text-ink sm:text-4xl">Frequently asked questions</h1>
        <p className="mb-10 font-body text-ink/60">
          Can&apos;t find what you&apos;re looking for? <a href="/contact" className="text-savanna underline">Get in touch</a>.
        </p>

        <div>
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
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