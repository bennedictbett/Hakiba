import Nav from "@/components/Nav";

const SECTIONS = [
  {
    title: "1. Eligibility",
    body: "To apply for a loan through Hakiba, you must be at least 18 years old, hold a valid Kenyan national ID, and have an active M-Pesa-registered phone number in your own name.",
  },
  {
    title: "2. Applications and decisions",
    body: "Submitting an application does not guarantee approval. We assess each application individually based on the information you provide and your repayment history with us, where applicable. Decisions are typically communicated within a couple of hours during business hours.",
  },
  {
    title: "3. Fees",
    body: "Our facilitation fee is a fixed percentage of the loan amount, deducted from your disbursement before funds are sent to you. You will always see this fee before you apply, and you are never required to pay anything upfront to receive a loan.",
  },
  {
    title: "4. Repayment",
    body: "You agree to repay your loan in full by the due date shown at approval, using the M-Pesa paybill details provided in your account. Repayment terms vary by product and are confirmed before you accept a loan offer.",
  },
  {
    title: "5. Late or missed repayment",
    body: "If you expect to miss a repayment date, contact us before the due date so we can discuss options. Continued non-payment may affect your ability to borrow from us in future and may be reported in line with applicable credit reporting regulations.",
  },
  {
    title: "6. Your responsibilities",
    body: "You agree to provide accurate information in your application, keep your phone number and M-Pesa details up to date, and use loan funds for lawful purposes.",
  },
  {
    title: "7. Changes to these terms",
    body: "We may update these terms from time to time. Material changes will be communicated before they take effect on new applications.",
  },
  {
    title: "8. Governing law",
    body: "These terms are governed by the laws of Kenya. Hakiba operates as a licensed Digital Credit Provider under the Central Bank of Kenya's regulatory framework for digital lenders.",
  },
];

export default function TermsPage() {
  return (
    <main>
      <Nav />

      <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <h1 className="mb-3 font-display text-3xl font-bold text-ink sm:text-4xl">Terms of Service</h1>
        <p className="mb-2 font-body text-sm text-ink/50">Last updated: September 2026</p>
        <p className="font-body leading-relaxed text-ink/70">
          These terms govern your use of Hakiba and any loan products you apply for through our platform.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-16 sm:pb-24">
        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="mb-2 font-display text-lg font-semibold text-ink">{section.title}</h2>
              <p className="font-body text-sm leading-relaxed text-ink/60 sm:text-base">{section.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-body text-sm text-ink/60">
          Questions about these terms? <a href="/contact" className="text-savanna underline">Contact us</a>.
        </p>
      </section>

      <footer className="border-t border-mist px-6 py-8 text-center font-body text-xs text-ink/50">
        Hakiba is a licensed Digital Credit Provider. Read our{" "}
        <a href="/terms" className="underline">Terms</a> and{" "}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </footer>
    </main>
  );
}