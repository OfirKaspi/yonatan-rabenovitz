"use client";

import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { cn } from "@/lib/cn";
import { sleeve } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";

type SleeveItem = (typeof sleeve.items)[number];

function SleeveDetails({ item }: { item: SleeveItem }) {
  return (
    <div>
      <div className="space-y-4">
        {item.body.map((paragraph) => (
          <p
            key={paragraph}
            className="text-base font-normal leading-7 text-ink-700 md:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {"quote" in item && item.quote && (
        <blockquote className="mt-6 border-r-2 border-gold-500 pr-5">
          <p className="font-display text-lg font-bold leading-snug text-ink-900 md:text-xl">
            {item.quote}
          </p>
        </blockquote>
      )}

      <p className="mt-6 font-display text-lg font-bold text-ink-900">
        {item.audienceTitle}
      </p>
      <div className="mt-3 space-y-3">
        {item.audience.map((paragraph) => (
          <p
            key={paragraph}
            className="text-base font-normal leading-7 text-ink-700 md:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <a
        href={whatsappHref(item.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-base font-display font-bold tracking-wide text-white transition-transform hover:-translate-y-0.5"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {sleeve.cta}
      </a>
    </div>
  );
}

const NAV_OFFSET = 112;

function prefersReducedMotion() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("accessibility-reduce-motion")
  );
}

export default function SleeveSection() {
  const [active, setActive] = useState<string | null>(sleeve.items[0].id);
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusHeader = useCallback((index: number) => {
    const next = (index + sleeve.items.length) % sleeve.items.length;
    headerRefs.current[next]?.focus();
  }, []);

  const toggleItem = useCallback((id: string, index: number) => {
    if (active === id) {
      setActive(null);
      return;
    }

    const header = headerRefs.current[index];
    const prevIndex = sleeve.items.findIndex((item) => item.id === active);
    const prevPanel =
      prevIndex >= 0 && active
        ? document.getElementById(`sleeve-panel-${active}`)
        : null;
    const collapseDelta =
      prevIndex >= 0 && prevIndex < index && prevPanel
        ? prevPanel.getBoundingClientRect().height
        : 0;

    setActive(id);

    if (!header) return;

    const top =
      header.getBoundingClientRect().top +
      window.scrollY -
      NAV_OFFSET -
      collapseDelta;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [active]);

  const onHeaderKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusHeader(index + 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          focusHeader(index - 1);
          break;
        case "Home":
          event.preventDefault();
          focusHeader(0);
          break;
        case "End":
          event.preventDefault();
          focusHeader(sleeve.items.length - 1);
          break;
        default:
          break;
      }
    },
    [focusHeader],
  );

  return (
    <section id="sleeve" className="bg-sand-100 py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="mb-12 text-center font-display font-bold tracking-tight leading-snug text-5xl text-ink-900 md:mb-16 md:text-6xl">
            {sleeve.title}
          </h2>
        </Reveal>

        <ul>
          {sleeve.items.map((item, i) => {
            const isActive = item.id === active;
            const panelId = `sleeve-panel-${item.id}`;
            const headerId = `sleeve-header-${item.id}`;

            return (
              <li key={item.id}>
                <h3>
                  <button
                    id={headerId}
                    ref={(el) => {
                      headerRefs.current[i] = el;
                    }}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id, i)}
                    onKeyDown={(event) => onHeaderKeyDown(event, i)}
                    className={cn(
                      "group flex w-full scroll-mt-28 items-center gap-4 border-b py-6 text-right transition-colors md:gap-5",
                      isActive
                        ? "border-gold-500"
                        : "border-sand-200 hover:border-sand-300",
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-medium tracking-wider tabular-nums transition-colors",
                        isActive ? "text-gold-600" : "text-ink-500",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display font-bold text-2xl transition-colors md:text-3xl",
                        isActive ? "text-gold-600" : "text-ink-900",
                      )}
                    >
                      {item.title}
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300",
                        isActive ? "rotate-180" : "text-ink-500",
                      )}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className="accordion-collapse"
                  data-open={isActive}
                >
                  <div className="accordion-collapse-inner">
                    <div className="bg-sand-50 p-5 md:p-8">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                        <div className="relative aspect-4/5 overflow-hidden rounded-3xl md:col-span-5 md:aspect-auto md:h-full md:min-h-96">
                          <Image
                            key={item.id}
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 90vw, 40vw"
                            className="object-cover"
                            priority={i === 0}
                          />
                        </div>
                        <div className="md:col-span-7">
                          <SleeveDetails item={item} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
