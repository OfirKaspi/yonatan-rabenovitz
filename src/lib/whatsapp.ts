import { contact } from "@/content/site";

/** Builds a wa.me deep link that opens WhatsApp with a prefilled message. */
export function whatsappHref(message: string = contact.prefilledMessage) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
