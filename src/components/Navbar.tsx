"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { brand, navLinks, contactSection } from "@/content/site";

type NavbarProps = {
  variant?: "overlay" | "solid";
};

export default function Navbar({ variant = "overlay" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [open, setOpen] = useState(false);
  const solid = variant === "solid" || scrolled;

  useEffect(() => {
    if (variant === "solid") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "bg-sand-50/95 border-b border-gold-400/40 backdrop-blur-sm"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        {/* Brand */}
        <a
          href={variant === "solid" ? "/" : "#top"}
          className={cn(
            "flex items-center gap-3 transition-colors hover:text-gold-400",
            solid ? "text-ink-900" : "text-sand-50",
          )}
        >
          <Logo className="h-8 w-auto" />
          <span className="flex flex-col leading-tight">
            <span className="font-display font-bold text-lg">{brand.name}</span>
            <span
              className={cn(
                "text-[11px] font-medium tracking-widest",
                solid ? "text-ink-500" : "text-sand-50/80",
              )}
            >
              {brand.role}
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "link-underline text-sm font-medium transition-colors hover:text-gold-400",
                  solid ? "text-ink-700" : "text-sand-50",
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
          className="btn-lift hidden items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-display font-bold tracking-wide text-white lg:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {contactSection.title}
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn("lg:hidden", solid ? "text-ink-900" : "text-sand-50")}
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className="accordion-collapse lg:hidden"
        data-open={open}
        inert={open ? undefined : true}
        aria-hidden={!open}
      >
        <div className="accordion-collapse-inner">
          <div className="border-t border-gold-400/40 bg-sand-50">
            <ul className="flex flex-col px-5 py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="link-underline py-3 text-base font-medium text-ink-700"
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
                  className="btn-lift inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-base font-display font-bold tracking-wide text-white"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {contactSection.title}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
