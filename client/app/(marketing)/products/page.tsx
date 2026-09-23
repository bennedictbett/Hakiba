import Nav from "@/components/Nav";

function formatKES(amount: number): string {
  return new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(amount);
}

const PRODUCTS = [
  {
    name: "Busta",
    min: 101000,
    max: 150000,
    terms: [
      { weeks: 4, interest: 25 },
      { weeks: 5, interest: 31.3 },
      { weeks: 6, interest: 37.5 },
    ],
  },
  {
    name: "Nawiri",
    min: 21000,
    max: 50000,
    terms: [
      { weeks: 4, interest: 25 },
      { weeks: 5, interest: 31.3 },
      { weeks: 6, interest: 37.5 },
    ],
  },
  {
    name: "Faraja",
    min: 11000,
    max: 20000,
    terms: [{ weeks: 4, interest: 25 }],
  },
  {
    name: "Zawadi",
    min: 3000,
    max: 10000,
    terms: [{ weeks: 4, interest: 25 }],
  },
  {
    name: "Faulu",
    min: 51000,
    max: 100000,
    terms: [
      { weeks: 4, interest: 25 },
      { weeks: 5, interest: 31.3 },
      { weeks: 6, interest: 37.5 },
    ],
  },
];

export default function ProductsPage() {
  return (
    <main>
      <Nav />

      <section className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-24">
        <h1 className="mb-4 font-display text-4xl font-bold text-ink sm:text-5xl">Loan products</h1>
        <p className="font-body text-lg text-ink/60">
          Interest is a fixed percentage of your loan amount for the full term you choose — not
          compounding, not monthly. What you see here is what you owe.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="flex flex-col rounded-lg border border-mist bg-white/50 p-6">
              <h2 className="mb-1 font-display text-xl font-semibold text-savanna">{product.name}</h2>
              <div className="mb-4 font-mono text-2xl font-semibold text-ink">
                KES {formatKES(product.min)} – {formatKES(product.max)}
              </div>

              <p className="mb-2 font-body text-sm font-medium text-ink">Repayment terms</p>
              <dl className="mb-6 space-y-1.5 border-t border-dashed border-mist pt-3 font-mono text-sm">
                {product.terms.map((term) => (
                  <div key={term.weeks} className="flex justify-between text-ink/70">
                    <dt>{term.weeks} weeks</dt>
                    <dd className="text-ink">{term.interest}% total interest</dd>
                  </div>
                ))}
              </dl>

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