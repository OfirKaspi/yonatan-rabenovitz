"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import Reveal from "@/components/Reveal";
import InstagramIcon from "@/components/InstagramIcon";
import { cn } from "@/lib/cn";
import { brand, contact, videos } from "@/content/site";

function vimeoSrc(id: string, { autoplay, muted }: { autoplay: boolean; muted: boolean }) {
  const params = new URLSearchParams({
    title: "0",
    byline: "0",
    portrait: "0",
    dnt: "1",
    playsinline: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  if (muted) params.set("muted", "1");
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}

export default function VideosSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const selected = videos.items[selectedIndex];

  if (!selected) return null;

  return (
    <section id="videos" className="bg-sand-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="mb-12 text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:mb-16 md:text-6xl">
            {videos.title}
          </h2>
        </Reveal>

        <div className="mx-auto w-full max-w-sm md:max-w-md">
        <Reveal variant="mask" className="relative aspect-9/16 overflow-hidden rounded-3xl">
          <iframe
            key={`${selected.id}-${muted}`}
            src={vimeoSrc(selected.id, { autoplay: true, muted })}
            title={brand.name}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </Reveal>

        <ul className="mt-3 grid grid-cols-3 gap-3 p-2.5 md:mt-4 md:gap-4 md:p-3">
          {videos.items.map((item, i) => {
            const selectedThumb = i === selectedIndex;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={selectedThumb}
                  aria-label={brand.name}
                  onClick={() => {
                    setSelectedIndex(i);
                    setMuted(false);
                  }}
                  className={cn(
                    "group relative block aspect-9/16 w-full overflow-hidden rounded-2xl",
                    selectedThumb
                      ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-sand-50"
                      : "opacity-80 hover:opacity-100",
                  )}
                >
                  <Image
                    src={item.poster}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 30vw, 160px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900/70 text-sand-50">
                      <Play className="h-3.5 w-3.5 translate-x-px fill-current" />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-8 flex justify-center md:mt-10">
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4)] px-7 py-3.5 text-base font-display font-bold tracking-wide text-white transition-transform hover:-translate-y-0.5"
          >
            <InstagramIcon className="h-5 w-5" />
            {videos.cta}
          </a>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
