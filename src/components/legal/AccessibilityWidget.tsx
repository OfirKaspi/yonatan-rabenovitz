"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Accessibility, Minus, Plus, RefreshCw, X } from "lucide-react";
import { useDraggable } from "@/hooks/useDraggable";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "accessibility-settings";
const SIZE = 52;

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  readableFont: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  readableFont: false,
  underlineLinks: false,
  reduceMotion: false,
};

const toggleSettings = [
  { key: "highContrast", label: "ניגודיות גבוהה" },
  { key: "readableFont", label: "פונט קריא" },
  { key: "underlineLinks", label: "הדגש קישורים" },
  { key: "reduceMotion", label: "הפחת תנועות" },
] as const;

function parseSettings(raw: string | null): AccessibilitySettings {
  if (!raw) return { ...defaultSettings };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...defaultSettings };
    const record = parsed as Record<string, unknown>;
    return {
      fontSize:
        typeof record.fontSize === "number"
          ? Math.min(200, Math.max(80, record.fontSize))
          : defaultSettings.fontSize,
      highContrast: Boolean(record.highContrast),
      readableFont: Boolean(record.readableFont),
      underlineLinks: Boolean(record.underlineLinks),
      reduceMotion: Boolean(record.reduceMotion),
    };
  } catch {
    return { ...defaultSettings };
  }
}

function applySettings(settings: AccessibilitySettings) {
  const root = document.documentElement;
  root.style.fontSize = `${settings.fontSize}%`;
  root.classList.toggle("accessibility-readable-font", settings.readableFont);
  root.classList.toggle("accessibility-underline-links", settings.underlineLinks);
  root.classList.toggle("contrast-mode", settings.highContrast);
  root.classList.toggle("accessibility-reduce-motion", settings.reduceMotion);
}

export default function AccessibilityWidget() {
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [settings, setSettings] = useState<AccessibilitySettings>(
    defaultSettings,
  );
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialPosition({
      x: 8,
      y: window.innerHeight - SIZE - 8,
    });
  }, []);

  const { position, handleMouseDown, handleTouchStart, wasDragged, isDragging } =
    useDraggable({
      size: SIZE,
      initialPosition,
      disabled: isOpen,
    });

  useEffect(() => {
    const stored = parseSettings(localStorage.getItem(STORAGE_KEY));
    setSettings(stored);
    applySettings(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applySettings(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Private mode / quota — preferences still apply for this session.
    }
  }, [hydrated, settings]);

  useEffect(() => {
    if (position) setIsVisible(true);
  }, [position]);

  if (!position) return null;

  const updateSetting = (
    key: keyof AccessibilitySettings,
    value: boolean | number,
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div
        data-a11y-chrome=""
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={cn(
          "fixed z-50 rounded-full select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing",
          isDragging ? "" : "transition-all duration-500 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
        style={{ left: position.x, top: position.y }}
      >
        <button
          type="button"
          onClick={() => {
            if (!wasDragged.current) setIsOpen((open) => !open);
          }}
          className="flex items-center justify-center rounded-full border border-gold-400 bg-ink-900 text-sand-50 shadow-lg shadow-ink-900/20 transition-colors hover:bg-ink-700"
          aria-label="כלי נגישות"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          style={{ width: SIZE, height: SIZE }}
        >
          <Accessibility size={22} aria-hidden="true" />
        </button>
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={overlayRef}
            data-a11y-chrome=""
            onClick={(e) => {
              if (e.target === overlayRef.current) setIsOpen(false);
            }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-ink-900/50 p-5"
          >
            <div
              role="dialog"
              aria-labelledby="a11y-title"
              className="w-full max-w-sm space-y-4 rounded-2xl border border-sand-200 bg-sand-50 p-5 text-ink-900 shadow-lg"
            >
              <header className="flex items-center justify-between">
                <h2 id="a11y-title" className="font-display text-xl font-bold">
                  כלי נגישות
                </h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="סגור"
                  className="rounded-full border border-sand-200 p-1.5 text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
                >
                  <X size={18} />
                </button>
              </header>

              <div className="flex items-center justify-between gap-3">
                <span>גודל גופן</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-sand-200 bg-sand-100 px-3 py-2"
                    onClick={() =>
                      updateSetting(
                        "fontSize",
                        Math.max(80, settings.fontSize - 10),
                      )
                    }
                    aria-label="הקטנת גודל מלל"
                    disabled={settings.fontSize <= 80}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="min-w-12 text-center tabular-nums">
                    {settings.fontSize}%
                  </span>
                  <button
                    type="button"
                    className="rounded-lg border border-sand-200 bg-sand-100 px-3 py-2"
                    onClick={() =>
                      updateSetting(
                        "fontSize",
                        Math.min(200, settings.fontSize + 10),
                      )
                    }
                    aria-label="הגדלת גודל מלל"
                    disabled={settings.fontSize >= 200}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {toggleSettings.map(({ key, label }) => (
                <label
                  key={key}
                  className="flex min-h-11 cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={settings[key]}
                    onChange={(e) => updateSetting(key, e.target.checked)}
                    className="size-4 accent-gold-600"
                  />
                  <span>{label}</span>
                </label>
              ))}

              <button
                type="button"
                onClick={() => setSettings({ ...defaultSettings })}
                className="flex items-center gap-2 text-ink-700 transition-colors hover:text-gold-600"
                aria-label="איפוס הגדרות"
              >
                <RefreshCw size={18} />
                אפס הגדרות
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-full border border-sand-200 bg-sand-100 py-2.5 font-medium transition-colors hover:border-gold-400"
              >
                סגור
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
