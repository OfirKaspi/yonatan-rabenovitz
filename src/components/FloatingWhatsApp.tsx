"use client";

import { whatsappHref } from "@/lib/whatsapp";
import { contactSection } from "@/content/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import FloatingFab from "@/components/FloatingFab";
import { FAB_SIZE } from "@/lib/fab";

export default function FloatingWhatsApp() {
  return (
    <FloatingFab indexFromBottom={1}>
      {({ wasDragged }) => (
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          aria-label={contactSection.title}
          onClick={(e) => {
            if (wasDragged.current) e.preventDefault();
          }}
          className="relative flex items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-ink-900/20"
          style={{ width: FAB_SIZE, height: FAB_SIZE }}
        >
          <WhatsAppIcon className="h-[22px] w-[22px]" />
          <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp opacity-20" />
        </a>
      )}
    </FloatingFab>
  );
}
