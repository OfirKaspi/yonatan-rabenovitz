"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { moments, brand } from "@/content/site";

const spanClass: Record<string, string> = {
  tall: "md:row-span-2",
  wide: "md:col-span-2",
  normal: "",
};

export default function MomentsSection() {
  return (
    <section className="bg-sand-50 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-3 md:gap-4">
          {moments.images.map((img, i) => (
            <Reveal
              key={i}
              variant="mask"
              delay={(i % 3) * 80}
              className={cn(
                "group relative overflow-hidden rounded-3xl",
                spanClass[img.span] ?? "",
              )}
            >
              <Image
                src={img.src}
                alt={brand.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
