"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { moments } from "@/content/site";

// Editorial mosaic spans (real photography only — no stock).
const spanClass: Record<string, string> = {
  tall: "md:row-span-2",
  wide: "md:col-span-2",
  normal: "",
};

export default function MomentsSection() {
  return (
    <section id="moments" className="bg-sand-50 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-suede-600">
                {moments.kicker}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="max-w-xl font-display text-4xl font-bold leading-tight text-ink-900 md:text-5xl">
                {moments.title}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-3 md:gap-4">
          {moments.images.map((img, i) => (
            <Reveal
              key={i}
              variant="mask"
              delay={(i % 3) * 80}
              className={cn(
                "group relative overflow-hidden rounded-xs",
                spanClass[img.span] ?? "",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 text-sm font-medium text-sand-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {img.alt}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
