"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { whatsappHref } from "@/lib/whatsapp";
import { hero, assets, brand, cld } from "@/content/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const heroImage = cld(
  "c_fill,g_auto,w_2400,q_auto:best,e_sharpen:80,f_auto",
  assets.cardThrow,
);

export default function HeroSection() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="top" className="relative min-h-svh overflow-hidden bg-ink-900">
      <Image
        src={heroImage}
        alt={brand.name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-ink-900/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-sand-50 to-transparent md:h-36" />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl items-center px-5 pt-28 pb-16 md:px-8 md:pb-24">
        <div className="max-w-3xl">
          <h1 className="hero-copy font-display font-black tracking-tight leading-[1.15] text-6xl text-sand-50 sm:text-7xl md:text-8xl">
            <span
              className="rise block"
              data-revealed={revealed}
              style={{ transitionDelay: "200ms" }}
            >
              {hero.headlineLead}
            </span>
            <span
              className="rise mt-3 block text-4xl text-gold-400 sm:text-5xl md:text-6xl"
              data-revealed={revealed}
              style={{ transitionDelay: "350ms" }}
            >
              {hero.headlineRest}
            </span>
          </h1>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-4"
            data-revealed={revealed}
            style={{ transitionDelay: "500ms" }}
          >
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-base font-display font-bold tracking-wide text-white transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {hero.ctaPrimary}
            </a>
            <a
              href="#sleeve"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-display font-bold tracking-wide text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
