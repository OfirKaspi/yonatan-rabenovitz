"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { sleeve } from "@/content/site";

export default function SleeveSection() {
  const [active, setActive] = useState<string>(sleeve.items[0].id);
  const activeItem = sleeve.items.find((i) => i.id === active) ?? sleeve.items[0];

  return (
    <section id="sleeve" className="bg-sand-100 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-suede-600">
            {sleeve.kicker}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-12 max-w-2xl font-display text-4xl font-bold leading-tight text-ink-900 md:mb-16 md:text-5xl">
            {sleeve.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* List — the interactive index */}
          <ul className="md:col-span-7">
            {sleeve.items.map((item, i) => {
              const isActive = item.id === active;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(item.id)}
                    onFocus={() => setActive(item.id)}
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "group flex w-full items-baseline gap-5 border-b border-sand-200 py-6 text-right transition-colors",
                      isActive ? "border-suede-500" : "hover:border-sand-300",
                    )}
                    aria-expanded={isActive}
                  >
                    <span
                      className={cn(
                        "font-display text-sm font-medium tabular-nums transition-colors",
                        isActive ? "text-suede-600" : "text-ink-500",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "font-display text-2xl font-bold transition-colors md:text-3xl",
                          isActive ? "text-suede-600" : "text-ink-900",
                        )}
                      >
                        {item.title}
                      </span>
                      {/* On mobile the image is hidden, so show the line inline */}
                      <span className="mt-2 block text-base leading-relaxed text-ink-700 md:hidden">
                        {item.line}
                      </span>
                    </span>
                  </button>
                  {/* Mobile inline image */}
                  <div className="relative mt-3 aspect-video overflow-hidden rounded-xs md:hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="90vw"
                      className="object-cover"
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Preview — desktop only, swaps with the active item */}
          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-28">
              <div className="relative aspect-4/5 overflow-hidden rounded-xs">
                <Image
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 text-lg leading-relaxed text-ink-700">
                {activeItem.line}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
