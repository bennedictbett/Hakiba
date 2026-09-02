import Nav from "@/components/Nav";

export default function ContactPage() {
  return (
    <main>
      <Nav />

      <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <h1 className="mb-4 font-display text-4xl font-bold text-ink sm:text-5xl">Get in touch</h1>
        <p className="font-body text-lg leading-relaxed text-ink/60">
          Our support team responds during working hours — no call centre queue, no chatbot loop.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-mist bg-mist sm:grid-cols-2">
          <a
            href="https://wa.me/254700000000"
            className="flex flex-col gap-1 bg-white/50 p-6 transition-colors hover:bg-white/80"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-marigold-dark">WhatsApp</span>
            <span className="font-display text-lg font-semibold text-ink">+254 700 000 000</span>
            <span className="font-body text-sm text-ink/60">Fastest way to reach us</span>
          </a>

          <a
            href="tel:+254700000000"
            className="flex flex-col gap-1 bg-white/50 p-6 transition-colors hover:bg-white/80"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-marigold-dark">Phone</span>
            <span className="font-display text-lg font-semibold text-ink">+254 700 000 000</span>
            <span className="font-body text-sm text-ink/60">Mon – Fri, 8am – 6pm</span>
          </a>

          <a
            href="mailto:support@hakiba.co.ke"
            className="flex flex-col gap-1 bg-white/50 p-6 transition-colors hover:bg-white/80"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-marigold-dark">Email</span>
            <span className="font-display text-lg font-semibold text-ink">support@hakiba.co.ke</span>
            <span className="font-body text-sm text-ink/60">Replies within one business day</span>
          </a>

          <a
            href="/faq"
            className="flex flex-col gap-1 bg-white/50 p-6 transition-colors hover:bg-white/80"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-marigold-dark">Self-serve</span>
            <span className="font-display text-lg font-semibold text-ink">Check the FAQ</span>
            <span className="font-body text-sm text-ink/60">Most questions are answered there already</span>
          </a>
        </div>

        <p className="mt-8 font-body text-sm leading-relaxed text-ink/60">
          Looking for a branch near you? See our{" "}
          <a href="/#branches" className="text-savanna underline">
            list of branches
          </a>{" "}
          on the homepage.
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