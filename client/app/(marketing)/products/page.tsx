const PRODUCTS = [
  {
    name: "Quick Cash",
    range: "KES 1,000 – 20,000",
    term: "Up to 30 days",
    fee: "10% facilitation fee",
    bestFor: "Unexpected bills, emergencies, bridging until your next payday.",
    detail:
      "Our fastest product — designed for situations where you need money the same day. Minimal paperwork, decision usually within a couple of hours.",
  },
  {
    name: "Business Boost",
    range: "KES 5,000 – 50,000",
    term: "Up to 60 days",
    fee: "10% facilitation fee",
    bestFor: "Stocking up inventory, covering a supplier payment, small equipment.",
    detail:
      "Built for small business owners who need working capital without the wait of a traditional bank loan. We look at your M-Pesa transaction history rather than requiring formal business registration documents.",
  },
  {
    name: "School Fees Advance",
    range: "KES 2,000 – 30,000",
    term: "Aligned to term dates",
    fee: "10% facilitation fee",
    bestFor: "School fees, exam fees, back-to-school costs.",
    detail:
      "Timed around the school calendar so repayment lines up with when you actually have income, not an arbitrary 30-day cycle.",
  },
];

export default function ProductsPage() {
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

      <section className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-24">
        <h1 className="mb-4 font-display text-4xl font-bold text-ink sm:text-5xl">Loan products</h1>
        <p className="font-body text-lg text-ink/60">
          Three products, one rule: the fee is always deducted from your disbursement. Never paid upfront.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="flex flex-col rounded-lg border border-mist bg-white/50 p-6">
              <h2 className="mb-1 font-display text-xl font-semibold text-savanna">{product.name}</h2>
              <div className="mb-4 font-mono text-2xl font-semibold text-ink">{product.range}</div>

              <dl className="mb-4 space-y-1 border-t border-dashed border-mist pt-4 font-body text-sm">
                <div className="flex justify-between text-ink/60">
                  <dt>Term</dt>
                  <dd className="text-ink">{product.term}</dd>
                </div>
                <div className="flex justify-between text-ink/60">
                  <dt>Fee</dt>
                  <dd className="text-ink">{product.fee}</dd>
                </div>
              </dl>

              <p className="mb-2 font-body text-sm font-medium text-ink">Best for</p>
              <p className="mb-4 font-body text-sm text-ink/60">{product.bestFor}</p>

              <p className="mb-6 flex-1 font-body text-sm leading-relaxed text-ink/60">{product.detail}</p>

              <a
                href="/login"
                className="mt-auto block w-full rounded-md bg-marigold py-3 text-center font-display text-sm font-semibold text-ink transition-colors hover:bg-marigold-dark"
              >
                Apply for {product.name}
              </a>
            </div>
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