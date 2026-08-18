"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/cn";

/**
 * Wraps children in a scroll-triggered reveal. `variant="mask"` wipes the
 * content in (for media); `variant="rise"` lifts it up (for text).
 * Reduced-motion is handled in CSS.
 */
export default function Reveal({
  children,
  variant = "rise",
  delay,
  className,
}: {
  children: ReactNode;
  variant?: "rise" | "mask";
  delay?: number;
  className?: string;
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-revealed={revealed}
      className={cn(variant === "mask" ? "reveal-mask" : "rise", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
