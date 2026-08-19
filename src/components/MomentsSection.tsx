"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Reveal from "@/components/Reveal";
import { moments, brand } from "@/content/site";

export default function MomentsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openImage = openIndex !== null ? moments.images[openIndex] : null;

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (openIndex !== null) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  return (
    <section className="bg-sand-50 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="mb-12 text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:mb-16 md:text-6xl">
            {moments.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {moments.images.map((img, i) => (
            <Reveal
              key={i}
              variant="mask"
              delay={(i % 3) * 80}
              className="group relative aspect-square overflow-hidden rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="absolute inset-0 cursor-zoom-in"
                aria-label={`${brand.name} — ${moments.title}`}
              >
                <Image
                  src={img.src}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpenIndex(null);
        }}
        className="fixed inset-0 z-50 m-0 h-svh max-h-none w-svw max-w-none border-0 bg-ink-900/90 p-4 backdrop:bg-ink-900/80 md:p-10"
      >
        {openImage && (
          <div className="relative flex h-full w-full items-center justify-center">
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="סגור"
              className="absolute top-0 left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-sand-50 text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <div className="relative h-[85vh] w-full max-w-5xl">
              <Image
                src={openImage.src}
                alt={brand.name}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
