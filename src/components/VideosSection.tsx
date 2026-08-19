"use client";

import { useState } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import MediaSpinner from "@/components/MediaSpinner";
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
  const [readyKey, setReadyKey] = useState("");
  const selected = videos.items[selectedIndex];

  if (!selected) return null;

  const playerKey = `${selected.id}-${muted}`;
  const playerReady = readyKey === playerKey;

  const selectVideo = (i: number) => {
    setSelectedIndex(i);
    setMuted(false);
  };

  return (
    <section id="videos" className="scroll-mt-28 bg-sand-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="title-rule mb-12 text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:mb-16 md:text-6xl">
            {videos.title}
          </h2>
        </Reveal>

        <div className="mx-auto w-full max-w-sm md:max-w-md">
        <Reveal variant="mask" className="relative aspect-9/16 overflow-hidden rounded-3xl">
          <OptimizedImage
            src={selected.poster}
            alt=""
            fill
            priority
            className="object-cover"
          />
          {playerReady ? null : <MediaSpinner />}
          <iframe
            key={playerKey}
            src={vimeoSrc(selected.id, { autoplay: true, muted })}
            title={brand.name}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setReadyKey(playerKey)}
            className={cn(
              "absolute inset-0 h-full w-full border-0",
              playerReady ? "opacity-100" : "opacity-0",
            )}
          />
        </Reveal>

        <ul className="mt-3 grid grid-cols-3 gap-3 p-2.5 md:mt-4 md:gap-4 md:p-3">
          {videos.items.map((item, i) => {
            const selectedThumb = i === selectedIndex;
            return (
              <li key={item.id}>
                <Reveal delay={i * 60}>
                <button
                  type="button"
                  aria-pressed={selectedThumb}
                  aria-label={brand.name}
                  onPointerDown={() => selectVideo(i)}
                  onClick={() => selectVideo(i)}
                  className={cn(
                    "group relative block aspect-9/16 w-full overflow-hidden rounded-2xl",
                    selectedThumb
                      ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-sand-50"
                      : "opacity-80 hover:opacity-100",
                  )}
                >
                  <OptimizedImage
                    src={item.poster}
                    alt=""
                    fill
                    className="media-zoom object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900/70 text-sand-50">
                      <Play className="h-3.5 w-3.5 translate-x-px fill-current" />
                    </span>
                  </span>
                </button>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-8 flex justify-center md:mt-10">
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4)] px-7 py-3.5 text-base font-display font-bold tracking-wide text-white"
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
