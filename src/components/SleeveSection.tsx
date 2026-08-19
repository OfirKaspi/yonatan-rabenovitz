"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { sleeve } from "@/content/site";

export default function SleeveSection() {
  const [active, setActive] = useState<string>(sleeve.items[0].id);
  const [slide, setSlide] = useState(0);
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const activeItem = sleeve.items.find((i) => i.id === active) ?? sleeve.items[0];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: "rtl",
      align: "start",
      dragFree: false,
      watchDrag: true,
    },
    [autoplay],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      emblaApi.plugins().autoplay?.stop();
    }
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="sleeve" className="bg-sand-100 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="mb-12 text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:mb-16 md:text-6xl">
            {sleeve.title}
          </h2>
        </Reveal>

        <div className="md:hidden" dir="rtl">
          <div
            className="cursor-grab overflow-hidden active:cursor-grabbing"
            ref={emblaRef}
          >
            <div className="flex touch-pan-y">
              {sleeve.items.map((item, i) => (
                <article
                  key={item.id}
                  className="min-w-0 flex-[0_0_100%] select-none"
                >
                  <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      draggable={false}
                      sizes="90vw"
                      className="pointer-events-none object-cover"
                      priority={i === 0}
                    />
                  </div>
                  <div className="mt-5 flex items-baseline gap-4">
                    <span className="text-sm font-medium tracking-wider tabular-nums text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-ink-900">
                      {item.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            className="mt-6 flex justify-center gap-2"
            role="tablist"
            aria-label={sleeve.title}
          >
            {sleeve.items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={slide === i}
                aria-label={item.title}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  slide === i
                    ? "w-6 bg-gold-500"
                    : "w-2 bg-sand-300 hover:bg-sand-200",
                )}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-12 md:gap-10">
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
                      isActive ? "border-gold-500" : "hover:border-sand-300",
                    )}
                    aria-expanded={isActive}
                  >
                    <span
                      className={cn(
                        "text-sm font-medium tracking-wider tabular-nums transition-colors",
                        isActive ? "text-gold-600" : "text-ink-500",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "font-display font-bold text-2xl transition-colors md:text-3xl",
                          isActive ? "text-gold-600" : "text-ink-900",
                        )}
                      >
                        {item.title}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="md:col-span-5">
            <div className="sticky top-28">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
                <Image
                  key={activeItem.id}
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
