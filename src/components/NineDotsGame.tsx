'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, Sparkles, Trophy, HelpCircle, Gamepad2 } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

export default function NineDotsGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FAIL' | 'SUCCESS'>('IDLE');
  const [coveredDotsCount, setCoveredDotsCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Enlarged Game Board: 500x500 canvas
  // Grid spacing is 120. Center is 250.
  // Visible 3x3 dots at 130, 250, 370
  const visibleDots: Point[] = [
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

  const checkCoveredDots = useCallback((linesToCheck: Line[]) => {
    const hitRadius = 20;
    let count = 0;

    visibleDots.forEach((dot) => {
      const isCovered = linesToCheck.some((line) =>
        distanceToSegment(dot, line.start, line.end) <= hitRadius
      );
      if (isCovered) count++;
    });

    setCoveredDotsCount(count);

    if (linesToCheck.length >= 4) {
      if (count >= 9) {
        setGameState('SUCCESS');
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFB800', '#FFD233', '#ffffff', '#FF5722', '#4CAF50'],
        });
      } else {
        setGameState('FAIL');
      }
    }
  }, [visibleDots]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines
    ctx.strokeStyle = '#FFB800'; 
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(255, 184, 0, 0.5)';
    ctx.shadowBlur = 12;

    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    });

    if (currentLine) {
      ctx.strokeStyle = '#FFD233';
      ctx.beginPath();
      ctx.moveTo(currentLine.start.x, currentLine.start.y);
      ctx.lineTo(currentLine.end.x, currentLine.end.y);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;

    // Draw dots
    visibleDots.forEach((dot) => {
      const isHit = lines.some((l) => distanceToSegment(dot, l.start, l.end) <= 20) ||
        (currentLine && distanceToSegment(dot, currentLine.start, currentLine.end) <= 20);

      ctx.beginPath();
      // Larger dots for the larger board
      ctx.arc(dot.x, dot.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = isHit ? '#FFB800' : '#E2E8F0';
      ctx.fill();

      if (isHit) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 184, 0, 0.4)';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    });
  }, [lines, currentLine, visibleDots]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (lines.length >= 4) return;
    const pos = getCanvasCoords(e);
    if (!pos) return;

    // First line starts where user clicked. Subsequent lines start exactly where previous line ended.
    let startPoint = pos;
    if (lines.length > 0) {
       startPoint = lines[lines.length - 1].end;
    }

    setIsDrawing(true);
    setCurrentLine({ start: startPoint, end: pos });
    if (gameState === 'IDLE') setGameState('PLAYING');
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !currentLine || lines.length >= 4) return;
    const pos = getCanvasCoords(e);
    if (!pos) return;
    
    // Freehand drawing, end point follows the pointer exactly
    setCurrentLine((prev) => (prev ? { ...prev, end: pos } : null));
  };

  const handleEnd = () => {
    if (!isDrawing || !currentLine) return;
    setIsDrawing(false);

    const length = Math.hypot(
      currentLine.end.x - currentLine.start.x,
      currentLine.end.y - currentLine.start.y
    );

    // Only accept the line if it actually moved to a different snap point
    if (length > 50) {
      const updatedLines = [...lines, currentLine];
      setLines(updatedLines);
      setCurrentLine(null);
      checkCoveredDots(updatedLines);
    } else {
      setCurrentLine(null); // Cancel line if they just clicked without dragging to a new dot
    }
  };

  const resetGame = () => {
    setLines([]);
    setCurrentLine(null);
    setIsDrawing(false);
    setGameState('IDLE');
    setCoveredDotsCount(0);
    setShowHint(false);
  };

  return (
    <section id="game" className="py-24 relative bg-white overflow-hidden border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
          <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">האתגר האינטראקטיבי</span>
          <div className="h-[1px] w-8 bg-orange-400 opacity-60" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          אתגר 9 הנקודות
        </h2>

        <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          <strong className="text-orange-500 font-bold">"בקוסמות כמו בחיים – כדי למצוא את הפתרון, חייבים לצאת מחוץ לקופסה."</strong>
          <br />
          חבר את 9 הנקודות באמצעות <span className="text-slate-900 font-bold underline decoration-orange-400 decoration-4 underline-offset-4">4 קווים ישרים בלבד</span>, מבלי להרים את האצבע!
        </p>

        {/* Made the container larger (max-w-lg instead of max-w-md) */}
        <div className={`relative max-w-lg mx-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl transition-all duration-300 ${
          gameState === 'FAIL'
            ? 'border-2 border-red-400 animate-shake shadow-red-200'
            : gameState === 'SUCCESS'
            ? 'border-2 border-[#FFB800] shadow-[#FFB800]/30'
            : 'border border-slate-100'
        }`}>
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-sm font-bold text-slate-500">
              קווים: <span className="text-orange-500 text-xl font-black">{lines.length} / 4</span>
            </span>

            <span className="text-sm font-bold text-slate-500">
              נקודות: <span className="text-green-500 text-xl font-black">{coveredDotsCount} / 9</span>
            </span>

            <button
              onClick={resetGame}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-orange-100 text-slate-600 hover:text-orange-600 transition-colors flex items-center gap-1.5 text-sm font-bold"
            >
              <RefreshCw className="w-4 h-4" />
              <span>איפוס</span>
            </button>
          </div>

          <div className="relative touch-none bg-slate-50 rounded-2xl p-2 overflow-hidden shadow-inner border border-slate-200">
            {/* Enlarged canvas from 400x400 to 500x500 */}
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              className="w-full h-auto cursor-crosshair rounded-xl"
            />

            {gameState === 'IDLE' && lines.length === 0 && (
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center pointer-events-none rounded-xl">
                <span className="px-5 py-3 bg-slate-900 text-white text-sm font-bold shadow-xl animate-bounce">
                  לחץ וגרור כדי למתוח קו
                </span>
              </div>
            )}
          </div>
          {gameState === 'FAIL' && (
            <div className="mt-6 p-5 rounded-none bg-red-50 border-l-4 border-red-400 text-right animate-in fade-in zoom-in-95 duration-300">
              <p className="text-base text-red-700 font-medium mb-4 leading-relaxed">
                נעצרת בתוך הריבוע?<br />
                <strong>בקסמים ובמנטליזם, הסוד הוא לפרוץ את הגבולות!</strong> נסה למתוח את הקווים מעבר לגבולות הריבוע.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={resetGame}
                  className="flex-1 py-3 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>נסה שוב</span>
                </button>
                <a
                  href="#contact"
                  className="flex-1 py-3 px-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>להצעת מחיר</span>
                </a>
              </div>
            </div>
          )}

          {gameState === 'SUCCESS' && (
            <div className="mt-6 p-5 rounded-none bg-orange-50 border-l-4 border-orange-400 text-right animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Trophy className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900">כל הכבוד! הצלחת!</h3>
              </div>
              <p className="text-base text-slate-700 mb-5 leading-relaxed font-medium">
                מי שחושב מחוץ לקופסה מרוויח. מגיע לך שהאירוע שלך יהיה מיוחד באותה מידה. קבל הצעת מחיר מיוחדת!
              </p>
              <a
                href="#contact"
                className="w-full py-4 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-base transition-all flex items-center justify-center gap-2"
              >
                <span>לקבלת הצעה מיוחדת</span>
              </a>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-400 font-medium">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 hover:text-orange-500 transition-colors bg-slate-50 px-3 py-1.5 rounded-lg"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showHint ? 'הסתר רמז' : 'צריך רמז?'}</span>
            </button>
          </div>

          {showHint && (
            <div className="mt-3 p-4 rounded-xl bg-orange-50 text-sm text-orange-800 text-right leading-relaxed font-medium">
              💡 <strong>רמז:</strong> כדי לחבר את כל 9 הנקודות ב-4 קווים, חלק מהקווים חייבים להסתיים <strong>מחוץ</strong> לריבוע הדמיוני שהנקודות יוצרות!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
