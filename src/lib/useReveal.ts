"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once when it scrolls into view. Sets `data-revealed="true"`
 * which the `.reveal-mask` / `.rise` CSS transitions hook into.
 *
 * Fail-open by design: if IntersectionObserver is unavailable, if the element is
 * already on screen but the observer never reports it, or if the element is
 * taller than the viewport, the content still reveals. Off-screen elements stay
 * hidden until they actually enter the viewport — a timed fallback must not
 * fire them early (that would skip the animation).
 *
 * Reduced motion is handled in CSS (the reveal classes resolve instantly).
 */
function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  return rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  // threshold 0 → reveal as soon as ANY pixel enters view. This is what keeps
  // tall elements (taller than the viewport) from staying hidden forever.
  options: IntersectionObserverInit = { threshold: 0, rootMargin: "0px 0px -10% 0px" },
) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    const reveal = () => setRevealed(true);

    // No observer support → just show it.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
          break;
        }
      }
    }, options);

    observer.observe(el);

    // If the node is already on screen (hero-adjacent, restored tab, layout
    // quirk), reveal after a frame so the CSS transition still plays.
    const raf = window.requestAnimationFrame(() => {
      if (isInViewport(el)) reveal();
    });

    // Safety net only for elements that ARE in view. Off-screen nodes must wait
    // for the observer so the animation is not already finished on scroll.
    const fallback = window.setTimeout(() => {
      if (isInViewport(el)) reveal();
    }, 1500);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  return { ref, revealed } as const;
}
