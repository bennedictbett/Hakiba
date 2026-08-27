const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <a href="/" className="font-display text-xl font-bold text-savanna">Hakiba</a>

      <div className="flex items-center gap-6">
        <div className="hidden gap-6 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-ink/70 transition-colors hover:text-savanna"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/login"
          className="rounded-md border border-savanna px-4 py-2 font-body text-sm font-medium text-savanna transition-colors hover:bg-savanna hover:text-paper"
        >
          Log in
        </a>
      </div>
    </nav>
  );
}