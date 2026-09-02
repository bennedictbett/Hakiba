import Nav from "@/components/Nav";

const SECTIONS = [
  {
    title: "1. Information we collect",
    body: "To assess and process your loan application, we collect your name, national ID number, phone number, M-Pesa transaction history where relevant to your application, and basic details about the purpose of your loan. We do not collect more than what a fair credit assessment requires.",
  },
  {
    title: "2. How we use your information",
    body: "Your information is used to verify your identity, assess your ability to repay, disburse and collect loan repayments, and communicate with you about your application or account. We do not use your data to make decisions unrelated to your loan.",
  },
  {
    title: "3. Sharing your information",
    body: "We do not sell your personal data. Information is shared only where necessary — with payment processors to disburse and collect funds, with regulators where legally required, or with your consent.",
  },
  {
    title: "4. Data retention",
    body: "We retain your information for as long as your account is active, and for a period afterward as required by Kenyan financial regulations and the Data Protection Act, 2019.",
  },
  {
    title: "5. Your rights",
    body: "Under the Data Protection Act, 2019, you have the right to access the personal data we hold about you, request correction of inaccurate data, and request deletion where the law permits it. Contact us to exercise any of these rights.",
  },
  {
    title: "6. Security",
    body: "We use encryption and access controls to protect your data. No system is perfectly secure, but we take reasonable, industry-standard steps to safeguard your information.",
  },
  {
    title: "7. Changes to this policy",
    body: "We may update this policy as our services or legal obligations change. Material changes will be communicated before they take effect.",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <Nav />

      <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <h1 className="mb-3 font-display text-3xl font-bold text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="mb-2 font-body text-sm text-ink/50">Last updated: September 2026</p>
        <p className="font-body leading-relaxed text-ink/70">
          This policy explains what personal data Hakiba collects, why, and the rights you have over it,
          in line with Kenya&apos;s Data Protection Act, 2019.
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
          Questions about your data? <a href="/contact" className="text-savanna underline">Contact us</a>.
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