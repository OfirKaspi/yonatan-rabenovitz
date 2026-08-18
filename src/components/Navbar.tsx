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
          ? "bg-sand-50/95 border-b border-gold-400/40 backdrop-blur-sm"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        {/* Brand */}
        <a
          href="#top"
          className={cn(
            "flex items-center gap-3 transition-colors hover:text-gold-400",
            scrolled ? "text-ink-900" : "text-sand-50",
          )}
        >
          <Logo className="h-8 w-auto" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg">{brand.name}</span>
            <span
              className={cn(
                "text-[11px] font-medium tracking-widest",
                scrolled ? "text-ink-500" : "text-sand-50/80",
              )}
            >
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
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gold-400",
                  scrolled ? "text-ink-700" : "text-sand-50",
                )}
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
          className={cn(
            "hidden rounded-full px-5 py-2.5 text-sm font-bold transition-colors md:inline-flex",
            scrolled
              ? "border border-gold-400 bg-ink-900 text-sand-50 hover:bg-ink-700"
              : "bg-sand-50 text-ink-900 hover:bg-gold-400",
          )}
        >
          {contactSection.title}
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn("md:hidden", scrolled ? "text-ink-900" : "text-sand-50")}
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gold-400/40 bg-sand-50 md:hidden">
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
                className="inline-flex w-full items-center justify-center rounded-full border border-gold-400 bg-ink-900 px-5 py-3 text-base font-semibold text-sand-50"
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
