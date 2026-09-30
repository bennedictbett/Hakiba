"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

const FAQS = [
  {
    q: "How much can I borrow?",
    a: "Loan amounts range from KES 1,000 to KES 50,000, depending on the product and your application. You can see an estimate of your repayment on the homepage calculator before you even apply.",
  },
  {
    q: "What fees do I pay?",
    a: "A single facilitation fee of 10% of your loan amount. There's no separate application fee, processing fee, or anything added later — just the one fee, shown upfront.",
  },
  {
    q: "Do I have to pay anything before getting my loan?",
    a: "No. Never. Our facilitation fee is deducted from the amount you receive — you never send us money upfront. If anyone claiming to be Hakiba asks you to pay a 'registration' or 'processing' fee before disbursement, it isn't us, and you should report it.",
  },
  {
    q: "How much will I receive?",
    a: "The facilitation fee is deducted from your loan amount before disbursement, so you receive the amount you asked for minus that fee. The homepage calculator shows you the exact figures before you apply, so there's no surprise on disbursement day.",
  },
  {
    q: "How do repayments work?",
    a: "Repayments are made through M-Pesa, using the paybill details shown in your account once your loan is approved. Your due date and total repayment amount are confirmed before you accept the loan offer.",
  },
  {
    q: "How long does approval take?",
    a: "It depends on your application and the physical assessment of the security you provide. Our team will meet with you, carry out the assessment, and guide you through each step so you always know what's next.",
  },
  {
    q: "What do I need to apply?",
    a: "Your phone number, national ID number, a few basic details about what you need the loan for, and the security you're offering for our team to assess in person.",
  },
  {
    q: "How do I receive the money?",
    a: "Once your application is approved, funds are sent to the M-Pesa number linked to your account. Getting there starts with an in-person conversation with our team.",
  },
  {
    q: "What happens if I can't repay on time?",
    a: "Contact us before your due date — we'd rather work out a plan with you than have you avoid us. Reach out through the contact page as soon as you know repayment might be a problem.",
  },
  {
    q: "Do I need to visit a branch?",
    a: "Yes. Financing at Hakiba includes an in-person assessment of the security you provide, so you'll need to visit one of our branches or arrange for our team to meet you.",
  },
  {
    q: "Is Hakiba regulated?",
    a: "Yes. Hakiba operates as a licensed Digital Credit Provider under the Central Bank of Kenya's regulatory framework for digital lenders.",
  },
  {
    q: "How do I contact Hakiba?",
    a: "Reach us on WhatsApp or by phone through our contact page, or visit one of our branches in person.",
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
      <Nav />

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