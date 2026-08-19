"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import { RefreshCw, Trophy, HelpCircle, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/whatsapp";
import { puzzle, contactSection } from "@/content/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface Point {
  x: number;
  y: number;
}
interface Line {
  start: Point;
  end: Point;
}

const GOLD = "#b08d3a";
const GOLD_LIGHT = "#c9a84c";
const DOT_IDLE = "#e8d9be";
const CONFETTI_COLORS = ["#b08d3a", "#c9a84c", "#fdfbf7", "#d4bc6a", "#1a1612"];

const DOTS: Point[] = [
  { x: 130, y: 130 }, { x: 250, y: 130 }, { x: 370, y: 130 },
  { x: 130, y: 250 }, { x: 250, y: 250 }, { x: 370, y: 250 },
  { x: 130, y: 370 }, { x: 250, y: 370 }, { x: 370, y: 370 },
];

function distanceToSegment(p: Point, a: Point, b: Point): number {
  const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  if (l2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * (b.x - a.x)), p.y - (a.y + t * (b.y - a.y)));
}

export default function PuzzleSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [state, setState] = useState<"IDLE" | "PLAYING" | "FAIL" | "SUCCESS">("IDLE");
  const [covered, setCovered] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const checkCovered = useCallback((toCheck: Line[]) => {
    let count = 0;
    DOTS.forEach((dot) => {
      if (toCheck.some((line) => distanceToSegment(dot, line.start, line.end) <= 20)) count++;
    });
    setCovered(count);
    if (toCheck.length >= 4) {
      if (count >= 9) {
        setState("SUCCESS");
        setSuccessOpen(true);
      } else {
        setState("FAIL");
      }
    }
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(176, 141, 58, 0.45)";
    ctx.shadowBlur = 12;

    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    });
    if (currentLine) {
      ctx.strokeStyle = GOLD_LIGHT;
      ctx.beginPath();
      ctx.moveTo(currentLine.start.x, currentLine.start.y);
      ctx.lineTo(currentLine.end.x, currentLine.end.y);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;

    DOTS.forEach((dot) => {
      const hit =
        lines.some((l) => distanceToSegment(dot, l.start, l.end) <= 20) ||
        (currentLine && distanceToSegment(dot, currentLine.start, currentLine.end) <= 20);
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = hit ? GOLD : DOT_IDLE;
      ctx.fill();

      if (hit) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(176, 141, 58, 0.4)";
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    });
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
    setSuccessOpen(false);
  };

  useEffect(() => {
    if (!successOpen) return;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSuccessOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [successOpen]);

  useEffect(() => {
    if (!successOpen) return;
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fire = confetti.create(canvas, { resize: true, useWorker: true });
    const burst = (originY: number, count: number) =>
      fire({
        particleCount: count,
        spread: 80,
        origin: { y: originY },
        colors: CONFETTI_COLORS,
      });

    burst(0.7, 140);
    const t1 = window.setTimeout(() => burst(0.55, 90), 280);
    const t2 = window.setTimeout(() => burst(0.65, 70), 560);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      fire.reset();
    };
  }, [successOpen]);

  return (
    <section id="puzzle" className="bg-sand-100 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <div className="text-right">
          <Reveal>
            <h2 className="text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:text-right md:text-6xl">
              {puzzle.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-lg font-normal leading-7 text-ink-700 md:text-xl">
              {puzzle.instruction}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div
            className={cn(
              "relative mx-auto w-full max-w-md rounded-3xl border bg-sand-50 p-4 transition-colors sm:p-6",
              state === "FAIL" && "animate-shake border-gold-500",
              state === "SUCCESS" && "border-gold-500",
              state !== "FAIL" && state !== "SUCCESS" && "border-sand-200",
            )}
          >
            <div className="mb-4 flex items-center justify-between gap-3 px-1 text-sm font-medium text-ink-500">
              <span>
                {puzzle.linesLabel}:{" "}
                <span className="font-display text-lg font-bold tabular-nums text-gold-600">
                  {lines.length} / 4
                </span>
              </span>
              <span>
                {puzzle.dotsLabel}:{" "}
                <span className="font-display text-lg font-bold tabular-nums text-gold-600">
                  {covered} / 9
                </span>
              </span>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-xl bg-sand-100 px-3 py-2 text-sm font-bold text-ink-700 transition-colors hover:bg-sand-200 hover:text-gold-600"
              >
                <RefreshCw className="h-4 w-4" />
                {puzzle.reset}
              </button>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-2xl border border-sand-200 bg-sand-100">
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
                className="h-full w-full touch-none rounded-2xl"
                style={{ cursor: "crosshair" }}
              />

              {state === "IDLE" && lines.length === 0 && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-sand-50/50">
                  <span className="animate-bounce rounded-full bg-ink-900 px-5 py-3 text-sm font-bold text-sand-50 shadow-xl">
                    {puzzle.idlePrompt}
                  </span>
                </div>
              )}
            </div>

            {state === "FAIL" && (
              <div className="mt-5 border-r-4 border-gold-500 bg-sand-100 p-4 text-right">
                <p className="mb-4 text-base font-medium leading-relaxed text-ink-700">
                  {puzzle.failLead}
                  <br />
                  <strong className="text-ink-900">{puzzle.failBody}</strong>
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-4 py-3 text-sm font-bold text-sand-50 transition-colors hover:bg-ink-700"
                >
                  <RefreshCw className="h-4 w-4" />
                  {puzzle.tryAgain}
                </button>
              </div>
            )}

            <div className="mt-5 flex items-center border-t border-sand-200 pt-4">
              <button
                type="button"
                onClick={() => setShowHint((open) => !open)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sand-100 px-3 py-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-gold-600"
              >
                <HelpCircle className="h-4 w-4" />
                {showHint ? puzzle.hintHide : puzzle.hintToggle}
              </button>
            </div>

            {showHint && (
              <div className="mt-3 rounded-xl bg-sand-100 p-4 text-right text-sm font-medium leading-relaxed text-ink-700">
                <strong className="text-gold-600">רמז:</strong> {puzzle.hint}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {successOpen &&
        createPortal(
          <div className="fixed inset-0 z-80" dir="rtl">
            <div className="absolute inset-0 bg-ink-900/65" aria-hidden />
            <canvas
              ref={confettiCanvasRef}
              className="pointer-events-none absolute inset-0 z-1 h-full w-full"
            />
            <div
              className="relative z-2 flex min-h-full items-center justify-center p-5"
              onClick={() => setSuccessOpen(false)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="puzzle-success-title"
                aria-describedby="puzzle-success-body"
                className="relative w-full max-w-md rounded-3xl border border-gold-400 bg-sand-50 p-6 text-right shadow-2xl sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setSuccessOpen(false)}
                  className="absolute top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-sand-100 hover:text-ink-900"
                  aria-label={puzzle.close}
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-5 flex items-center gap-3">
                  <div className="shrink-0 rounded-full bg-sand-200 p-2.5">
                    <Trophy className="h-7 w-7 text-gold-600" />
                  </div>
                  <h2
                    id="puzzle-success-title"
                    className="font-display text-2xl font-bold leading-snug text-ink-900 sm:text-3xl"
                  >
                    {puzzle.successTitle}
                  </h2>
                </div>

                <p
                  id="puzzle-success-body"
                  className="text-base font-medium leading-7 text-ink-700 sm:text-lg"
                >
                  {puzzle.successBody}
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-base font-display font-bold tracking-wide text-white transition-transform hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {contactSection.title}
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sand-200 bg-sand-100 px-6 py-3 text-sm font-bold text-ink-900 transition-colors hover:border-gold-500 hover:text-gold-600"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {puzzle.tryAgain}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSuccessOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900"
                  >
                    {puzzle.close}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
