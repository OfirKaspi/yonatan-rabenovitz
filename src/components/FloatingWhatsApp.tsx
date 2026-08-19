"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/whatsapp";
import { contactSection } from "@/content/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={contactSection.title}
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-ink-900/20 transition-all duration-300 hover:scale-105 md:bottom-7 md:right-7 md:h-16 md:w-16 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp opacity-20" />
    </a>
  );
}
