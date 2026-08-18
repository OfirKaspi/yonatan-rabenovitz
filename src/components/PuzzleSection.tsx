"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { puzzle } from "@/content/site";

interface Point {
  x: number;
  y: number;
}
interface Line {
  start: Point;
  end: Point;
}

// Warm ink-on-sand palette (matches the design system — no orange).
const INK = "#1c1815";
const SUEDE = "#6b4f34";
const DOT_IDLE = "#d8c8ae";

export default function PuzzleSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [state, setState] = useState<"IDLE" | "PLAYING" | "FAIL" | "SUCCESS">("IDLE");
  const [covered, setCovered] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const dots: Point[] = [
    { x: 130, y: 130 }, { x: 250, y: 130 }, { x: 370, y: 130 },
    { x: 130, y: 250 }, { x: 250, y: 250 }, { x: 370, y: 250 },
    { x: 130, y: 370 }, { x: 250, y: 370 }, { x: 370, y: 370 },
  ];

  const distanceToSegment = (p: Point, a: Point, b: Point): number => {
    const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
    if (l2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);
    let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (a.x + t * (b.x - a.x)), p.y - (a.y + t * (b.y - a.y)));
  };

  const checkCovered = useCallback((toCheck: Line[]) => {
    let count = 0;
    dots.forEach((dot) => {
      if (toCheck.some((line) => distanceToSegment(dot, line.start, line.end) <= 20)) count++;
    });
    setCovered(count);
    if (toCheck.length >= 4) {
      setState(count >= 9 ? "SUCCESS" : "FAIL");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = SUEDE;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    });
    if (currentLine) {
      ctx.strokeStyle = "#8a6b47";
      ctx.beginPath();
      ctx.moveTo(currentLine.start.x, currentLine.start.y);
      ctx.lineTo(currentLine.end.x, currentLine.end.y);
      ctx.stroke();
    }

    dots.forEach((dot) => {
      const hit =
        lines.some((l) => distanceToSegment(dot, l.start, l.end) <= 20) ||
        (currentLine && distanceToSegment(dot, currentLine.start, currentLine.end) <= 20);
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 9, 0, Math.PI * 2);
      ctx.fillStyle = hit ? INK : DOT_IDLE;
      ctx.fill();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, currentLine]);

  useEffect(() => {
    draw();
  }, [draw]);

  const coords = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    if (lines.length >= 4) return;
    const pos = coords(e);
    if (!pos) return;
    const startPoint = lines.length > 0 ? lines[lines.length - 1].end : pos;
    setIsDrawing(true);
    setCurrentLine({ start: startPoint, end: pos });
    if (state === "IDLE") setState("PLAYING");
  };

  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !currentLine || lines.length >= 4) return;
    const pos = coords(e);
    if (!pos) return;
    setCurrentLine((prev) => (prev ? { ...prev, end: pos } : null));
  };

  const end = () => {
    if (!isDrawing || !currentLine) return;
    setIsDrawing(false);
    const length = Math.hypot(
      currentLine.end.x - currentLine.start.x,
      currentLine.end.y - currentLine.start.y,
    );
    if (length > 50) {
      const updated = [...lines, currentLine];
      setLines(updated);
      setCurrentLine(null);
      checkCovered(updated);
    } else {
      setCurrentLine(null);
    }
  };

  const reset = () => {
    setLines([]);
    setCurrentLine(null);
    setIsDrawing(false);
    setState("IDLE");
    setCovered(0);
    setShowHint(false);
  };

  return (
    <section id="puzzle" className="bg-sand-100 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        {/* Copy */}
        <div className="text-right">
          <Reveal>
            <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-suede-600">
              {puzzle.kicker}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl font-bold leading-tight text-ink-900 md:text-5xl">
              {puzzle.title}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 font-display text-xl leading-snug text-suede-600 md:text-2xl">
              {puzzle.tagline}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">
              {puzzle.instruction}
            </p>
          </Reveal>

          {state === "SUCCESS" && (
            <div className="mt-8 border-r-2 border-suede-500 pr-6">
              <p className="font-display text-2xl font-bold text-ink-900">
                {puzzle.successTitle}
              </p>
              <p className="mt-2 text-lg text-ink-700">{puzzle.successBody}</p>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full bg-ink-900 px-6 py-3 text-base font-semibold text-sand-50 transition-transform hover:-translate-y-0.5"
              >
                בואו נדבר
              </a>
            </div>
          )}

          <div className="mt-8 flex items-center gap-6">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700 transition-colors hover:text-suede-600"
            >
              <RotateCcw size={16} />
              {puzzle.reset}
            </button>
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="text-sm font-semibold text-ink-500 transition-colors hover:text-suede-600"
            >
              {puzzle.hint}
            </button>
            <span className="mr-auto text-sm font-medium tabular-nums text-ink-500">
              {covered} / 9
            </span>
          </div>

          {showHint && (
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
              {puzzle.hintText}
            </p>
          )}
        </div>

        {/* Board — plain reveal (never clip an interactive canvas) */}
        <Reveal>
          <div
            className={cn(
              "relative mx-auto aspect-square w-full max-w-md rounded-xs border bg-sand-50 p-3 transition-colors",
              state === "FAIL" ? "border-suede-500" : "border-sand-200",
            )}
          >
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              onMouseDown={start}
              onMouseMove={move}
              onMouseUp={end}
              onMouseLeave={end}
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
              className="h-full w-full touch-none rounded-xs"
              style={{ cursor: "crosshair" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
