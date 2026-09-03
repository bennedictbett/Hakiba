import Nav from "@/components/Nav";
export default function AboutPage() {
  const values = [
    {
      title: "Terms you can actually read",
      detail: "No fine print designed to confuse. If we can't explain a fee in one sentence, we don't charge it.",
    },
    {
      title: "Fees deducted, never upfront",
      detail: "You never send us money to get a loan. Ever. Any product that asks otherwise isn't us.",
    },
    {
      title: "Decisions in hours, not weeks",
      detail: "Most applications are reviewed the same day. We know what it's like to need money now, not next month.",
    },
  ];
return (
    <main>
            <Nav />
      
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Lending, without the games.
        </h1>
        <p className="font-body text-lg leading-relaxed text-ink/70">
          Hakiba started with a simple frustration: too many lenders in Kenya make borrowing feel
          like a trap — hidden fees, upfront &quot;registration charges,&quot; and terms that only
          make sense after you&apos;ve already signed. We built Hakiba to be the lender we wished
          existed when we needed one.
        </p>
      </section>

       <section className="border-y border-mist bg-white/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 font-display text-2xl font-semibold text-ink sm:text-3xl">What we do differently</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="mb-2 font-display text-lg font-semibold text-savanna">{value.title}</h3>
                <p className="font-body text-sm leading-relaxed text-ink/60">{value.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h2 className="mb-6 font-display text-2xl font-semibold text-ink sm:text-3xl">Licensing and compliance</h2>
        <p className="mb-4 font-body leading-relaxed text-ink/70">
          Hakiba operates as a licensed Digital Credit Provider under the Central Bank of Kenya&apos;s
          regulatory framework for digital lenders. We handle your data in line with the Data
          Protection Act, 2019 — you can review exactly what we collect and why in our{" "}
          <a href="/privacy" className="text-savanna underline">Privacy Policy</a>.
        </p>
        <p className="font-body leading-relaxed text-ink/70">
          Have a question about our licensing or how we operate? Reach out — we&apos;re glad to
          answer directly rather than bury it in a document nobody reads.
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