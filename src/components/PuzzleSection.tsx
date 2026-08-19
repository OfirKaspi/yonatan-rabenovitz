"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";
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

// Ivory / espresso / antique gold — matches the site palette.
const INK = "#1a1612";
const GOLD = "#b08d3a";
const DOT_IDLE = "#e8d9be";

export default function PuzzleSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [state, setState] = useState<"IDLE" | "PLAYING" | "FAIL" | "SUCCESS">("IDLE");
  const [covered, setCovered] = useState(0);

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

    ctx.strokeStyle = GOLD;
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
      ctx.strokeStyle = "#c9a84c";
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
  };

  return (
    <section id="puzzle" className="bg-sand-100 py-20 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        {/* Copy */}
        <div className="text-right">
          <Reveal>
            <h2 className="font-display text-5xl leading-tight text-ink-900 md:text-6xl">
              {puzzle.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-ink-700 md:text-xl">
              {puzzle.instruction}
            </p>
          </Reveal>

          {state === "SUCCESS" && (
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {contactSection.title}
            </a>
          )}

          <div className="mt-8 flex items-center gap-6">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 text-ink-700 transition-colors hover:text-gold-600"
              aria-label={puzzle.title}
            >
              <RotateCcw size={16} />
            </button>
            <span className="mr-auto text-sm font-medium tabular-nums text-ink-500">
              {covered} / 9
            </span>
          </div>
        </div>

        {/* Board — plain reveal (never clip an interactive canvas) */}
        <Reveal>
          <div
            className={cn(
              "relative mx-auto aspect-square w-full max-w-md rounded-3xl border bg-sand-50 p-3 transition-colors",
              state === "FAIL" ? "border-gold-500" : "border-sand-200",
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
              className="h-full w-full touch-none rounded-2xl"
              style={{ cursor: "crosshair" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
