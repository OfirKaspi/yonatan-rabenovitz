"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { whatsappHref } from "@/lib/whatsapp";
import { hero, assets, brand, cld } from "@/content/site";

// Smart 4:5 crop of the card-cascade shot — frames the aces + suede vest,
// trims the dead space. Cloudinary does this via URL; nothing re-uploaded.
const heroImage = cld("c_fill,ar_4:5,g_auto", assets.cardThrow);

export default function HeroSection() {
  // Signature entrance: portrait mask lifts + headline rises, once, on load.
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-sand-50 pt-28 md:pt-32"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 pb-16 md:grid-cols-12 md:gap-4 md:px-8 md:pb-24">
        {/* Text — anchored to the reading edge (right in RTL) */}
        <div className="order-2 md:order-1 md:col-span-6 md:pl-6">
          <p
            className="rise mb-5 text-sm font-semibold tracking-[0.25em] text-suede-600"
            data-revealed={revealed}
            style={{ transitionDelay: "150ms" }}
          >
            {brand.role} · {brand.location}
          </p>

          <h1 className="font-display text-5xl font-bold leading-[1.1] text-ink-900 sm:text-6xl md:text-[4.25rem]">
            <span
              className="rise block"
              data-revealed={revealed}
              style={{ transitionDelay: "250ms" }}
            >
              {hero.headlineLead}
            </span>
            <span
              className="rise mt-1 block text-3xl font-medium text-suede-600 sm:text-4xl md:text-5xl"
              data-revealed={revealed}
              style={{ transitionDelay: "400ms" }}
            >
              {hero.headlineRest}
            </span>
          </h1>

          <p
            className="rise mt-7 max-w-md text-lg leading-relaxed text-ink-700"
            data-revealed={revealed}
            style={{ transitionDelay: "550ms" }}
          >
            {hero.sub}
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-4"
            data-revealed={revealed}
            style={{ transitionDelay: "700ms" }}
          >
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 text-base font-semibold text-sand-50 transition-transform hover:-translate-y-0.5"
            >
              {hero.ctaPrimary}
              <ArrowLeft size={18} />
            </a>
            <a
              href="#sleeve"
              className="inline-flex items-center gap-2 text-base font-semibold text-ink-700 underline decoration-sand-300 decoration-2 underline-offset-8 transition-colors hover:text-suede-600 hover:decoration-suede-500"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Portrait — masked reveal, like turning a card face-up */}
        <div className="order-1 md:order-2 md:col-span-6">
          <div className="relative mx-auto max-w-sm md:mr-0 md:ml-auto md:max-w-md">
            <div
              className="reveal-mask relative aspect-4/5 overflow-hidden rounded-xs"
              data-revealed={revealed}
            >
              <Image
                src={heroImage}
                alt="יונתן רבינוביץ' משגר ארבעה אסים מהיד"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* Quiet card-corner accent, not a gimmick */}
            <div className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-12 rounded-xs border border-sand-300 bg-sand-100 md:h-20 md:w-14" />
          </div>
        </div>
      </div>
    </section>
  );
}
