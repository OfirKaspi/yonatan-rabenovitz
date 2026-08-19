"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import GalleryMedia from "@/components/gallery/GalleryMedia";
import type { GalleryItem } from "@/lib/gallery";

export default function MediaLightbox({
  item,
  open,
  onClose,
  closeLabel,
  fallbackAlt,
}: {
  item: GalleryItem | null;
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  fallbackAlt: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="fixed inset-0 z-50 m-0 h-svh max-h-none w-svw max-w-none border-0 bg-ink-900/90 p-4 backdrop:bg-ink-900/80 md:p-10"
    >
      {item ? (
        <div className="relative flex h-full w-full items-center justify-center">
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute top-0 left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-sand-50 text-ink-900 transition-transform hover:-translate-y-0.5"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <div className="relative h-[85vh] w-full max-w-5xl">
            <GalleryMedia
              item={item}
              variant="lightbox"
              alt={item.alt ?? fallbackAlt}
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
