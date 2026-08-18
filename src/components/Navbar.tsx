"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { brand, navLinks, contactSection } from "@/content/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "bg-sand-50/95 border-b border-sand-200 backdrop-blur-sm"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 text-ink-900">
          <Logo className="h-8 w-auto" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold">
              {brand.name}
            </span>
            <span className="text-[11px] font-medium tracking-widest text-ink-500">
              {brand.role}
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink-700 transition-colors hover:text-suede-600"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-suede-600 px-5 py-2.5 text-sm font-semibold text-sand-50 transition-colors hover:bg-suede-500 md:inline-flex"
        >
          {contactSection.title}
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-ink-900 md:hidden"
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-sand-200 bg-sand-50 md:hidden">
          <ul className="flex flex-col px-5 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-ink-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-suede-600 px-5 py-3 text-base font-semibold text-sand-50"
              >
                {contactSection.title}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
