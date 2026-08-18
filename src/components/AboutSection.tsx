"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { about, assets } from "@/content/site";

export default function AboutSection() {
  return (
    <section id="about" className="bg-sand-50 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:grid-cols-12 md:gap-12 md:px-8">
        {/* Portrait, bleeding slightly, editorial */}
        <div className="md:col-span-5">
          <Reveal variant="mask" className="relative aspect-4/5 overflow-hidden rounded-xs md:sticky md:top-28">
            <Image
              src={assets.craft}
              alt="יונתן פורש חבילת קלפים בין הידיים"
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        {/* Story */}
        <div className="md:col-span-7 md:pt-8">
          <Reveal>
            <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-suede-600">
              {about.kicker}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl font-bold leading-tight text-ink-900 md:text-5xl">
              {about.title}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={150 + i * 100}>
                <p className="text-lg leading-relaxed text-ink-700">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <blockquote className="mt-10 border-r-2 border-suede-500 pr-6">
              <p className="font-display text-2xl font-medium leading-snug text-ink-900 md:text-3xl">
                {about.pullQuote}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
