"use client";

import { useEffect, useState, type MutableRefObject, type ReactNode } from "react";
import { useDraggable } from "@/hooks/useDraggable";
import { FAB_PADDING, FAB_SIZE, fabStartPosition } from "@/lib/fab";
import { cn } from "@/lib/cn";

export default function FloatingFab({
  indexFromBottom,
  disabled = false,
  chrome = false,
  children,
}: {
  indexFromBottom: number;
  disabled?: boolean;
  chrome?: boolean;
  children: (api: { wasDragged: MutableRefObject<boolean> }) => ReactNode;
}) {
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setInitialPosition(fabStartPosition(indexFromBottom));
  }, [indexFromBottom]);

  const { position, handleMouseDown, handleTouchStart, wasDragged, isDragging } =
    useDraggable({
      size: FAB_SIZE,
      padding: FAB_PADDING,
      initialPosition,
      disabled,
    });

  useEffect(() => {
    if (position) setIsVisible(true);
  }, [position]);

  if (!position) return null;

  return (
    <div
      {...(chrome ? { "data-a11y-chrome": "" } : {})}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={cn(
        "fixed z-50 rounded-full select-none touch-none",
        isDragging ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing",
        isDragging ? "" : "transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
      style={{ left: position.x, top: position.y }}
    >
      {children({ wasDragged })}
    </div>
  );
}
