"use client";

import { useState } from "react";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

function HakibaMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
      <rect x="6" y="8" width="7" height="24" rx="1.5" fill="#1B4332" />
      <rect x="27" y="8" width="7" height="24" rx="1.5" fill="#1B4332" />
      <rect x="6" y="17" width="28" height="6" fill="#1B4332" />
      <path d="M14 24 L26 12" stroke="#E8A33D" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 12 L26 12 L26 18" stroke="#E8A33D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <a href="/" className="flex items-center gap-2">
        <HakibaMark />
        <span className="font-display text-xl font-bold text-savanna">Hakiba</span>
      </a>

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
          className="hidden rounded-md border border-savanna px-4 py-2.5 font-body text-sm font-medium text-savanna transition-colors hover:bg-savanna hover:text-paper sm:inline-block"
        >
          Log in
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-mist text-ink sm:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 border-b border-mist bg-paper px-6 pb-6 shadow-md sm:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 font-body text-base text-ink/80 transition-colors hover:bg-mist/40"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-savanna px-3 py-3 text-center font-body text-base font-medium text-paper"
            >
              Log in
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}