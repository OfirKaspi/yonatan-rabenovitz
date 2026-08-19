"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import MediaSpinner from "@/components/MediaSpinner";
import OptimizedImage from "@/components/OptimizedImage";
import { cld } from "@/lib/cloudinary";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/lib/gallery";

export type GalleryMediaVariant = "featured" | "thumb" | "lightbox";

function mediaSrc(item: GalleryItem, variant: GalleryMediaVariant): string {
  const url = item.type === "image" ? item.src : item.poster;
  if (!url.includes("/image/upload/")) return url;

  if (variant === "thumb") {
    return cld("c_fill,g_auto,w_480,q_auto,f_auto", url);
  }
  if (variant === "featured") {
    return cld("c_fill,g_auto,w_2400,q_auto:best,f_auto", url);
  }
  return cld("c_limit,w_2000,q_auto:best,f_auto", url);
}

export default function GalleryMedia({
  item,
  variant,
  alt,
  sizes,
  priority,
  className,
}: {
  item: GalleryItem;
  variant: GalleryMediaVariant;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const fullSrc = mediaSrc(item, variant);
  const previewSrc = variant === "thumb" ? fullSrc : mediaSrc(item, "thumb");
  const [loadedSrc, setLoadedSrc] = useState("");
  const fullReady = loadedSrc === fullSrc;
  const fitClass = variant === "lightbox" ? "object-contain" : "object-cover";

  return (
    <>
      {variant !== "thumb" ? (
        <OptimizedImage
          src={previewSrc}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className={cn(fitClass, className)}
        />
      ) : null}
      <OptimizedImage
        src={fullSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoadedSrc(fullSrc)}
        className={cn(
          fitClass,
          className,
          variant !== "thumb" && !fullReady && "opacity-0",
        )}
      />
      {variant !== "thumb" && !fullReady ? <MediaSpinner /> : null}
      {item.type === "video" && variant !== "lightbox" ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900/70 text-sand-50 md:h-14 md:w-14">
            <Play className="h-5 w-5 translate-x-0.5 fill-current md:h-6 md:w-6" />
          </span>
        </span>
      ) : null}
    </>
  );
}
