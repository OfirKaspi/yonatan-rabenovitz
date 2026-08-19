import { contact } from "@/content/site";

export function whatsappHref(message: string = contact.prefilledMessage) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
