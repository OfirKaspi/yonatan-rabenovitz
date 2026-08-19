"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { brand, assets } from "@/content/site";
import { cld } from "@/lib/cloudinary";

const videoSrc = cld(
  "f_mp4,q_auto,w_1280",
  assets.logoAnimation,
);
const posterSrc = cld(
  "so_8.2,f_jpg,q_auto,w_1280",
  assets.logoAnimation,
);

const FRAME_CLASS =
  "mx-auto block h-auto w-full max-h-64 object-contain md:max-h-80";

function prefersReducedMotion() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("accessibility-reduce-motion")
  );
}

/** GIF-like looping logo — Cloudinary MP4, not a real GIF (much smaller). */
export default function LogoAnimation() {
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(prefersReducedMotion());
    sync();
    media.addEventListener("change", sync);
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      media.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="overflow-hidden border-b border-sand-200 bg-white">
      {reduceMotion === false ? (
        <video
          className={FRAME_CLASS}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          disablePictureInPicture
          aria-label={brand.name}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img src={posterSrc} alt={brand.name} className={FRAME_CLASS} />
      )}
    </div>
  );
}
