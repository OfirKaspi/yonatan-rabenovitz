"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import GalleryMedia from "@/components/gallery/GalleryMedia";
import MediaLightbox from "@/components/gallery/MediaLightbox";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/lib/gallery";

export default function MediaGallery({
  items,
  title,
  fallbackAlt,
  closeLabel = "סגור",
}: {
  items: readonly GalleryItem[];
  title: string;
  fallbackAlt: string;
  closeLabel?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const selected = items[selectedIndex];

  if (!selected) return null;

  const altFor = (item: GalleryItem) => item.alt ?? fallbackAlt;

  return (
    <>
      <Reveal
        variant="mask"
        className="group relative h-[min(70svh,36rem)] overflow-hidden rounded-3xl md:h-[min(78svh,48rem)]"
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 cursor-zoom-in"
          aria-label={`${fallbackAlt} — ${title}`}
        >
          <GalleryMedia
            item={selected}
            variant="featured"
            alt=""
            sizes="(max-width: 768px) 100vw, 80rem"
            priority
            className="media-zoom"
          />
        </button>
      </Reveal>

      <ul className="mt-3 flex gap-3 overflow-x-auto p-2.5 md:mt-4 md:gap-4 md:p-3">
        {items.map((item, i) => {
          const selectedThumb = i === selectedIndex;
          return (
            <li key={`${item.type}-${item.src}-${i}`} className="shrink-0">
              <Reveal delay={i * 60}>
              <button
                type="button"
                aria-pressed={selectedThumb}
                aria-label={altFor(item)}
                onClick={() => setSelectedIndex(i)}
                className={cn(
                  "group relative block aspect-square w-20 overflow-hidden rounded-2xl md:w-28",
                  selectedThumb
                    ? "ring-2 ring-gold-500 ring-offset-2 ring-offset-sand-100"
                    : "opacity-80 hover:opacity-100",
                )}
              >
                <GalleryMedia
                  item={item}
                  variant="thumb"
                  alt=""
                  sizes="112px"
                  className="media-zoom"
                />
              </button>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <MediaLightbox
        item={lightboxOpen ? selected : null}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        closeLabel={closeLabel}
        fallbackAlt={fallbackAlt}
      />
    </>
  );
}
