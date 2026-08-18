"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once when it scrolls into view. Sets `data-revealed="true"`
 * which the `.reveal-mask` / `.rise` CSS transitions hook into.
 *
 * Fail-open by design: if IntersectionObserver is unavailable, if the element is
 * taller than the viewport (so a threshold-based observer would never fire), or
 * if anything else goes wrong, the content still reveals. Content must never be
 * gated behind an animation that can silently fail to run.
 *
 * Reduced motion is handled in CSS (the reveal classes resolve instantly).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  // threshold 0 → reveal as soon as ANY pixel enters view. This is what keeps
  // tall elements (taller than the viewport) from staying hidden forever.
  options: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -8% 0px" },
) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    // No observer support → just show it.
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
          break;
        }
      }
    }, options);

    observer.observe(el);

    // Safety net: if the observer hasn't fired within 1.5s (e.g. layout quirk,
    // element already on-screen but not reported, tab restored), reveal anyway.
    const fallback = window.setTimeout(() => setRevealed(true), 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  return { ref, revealed } as const;
}
