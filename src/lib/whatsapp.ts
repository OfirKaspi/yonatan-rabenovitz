import { contact } from "@/content/site";

export function whatsappHref() {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.prefilledMessage)}`;
}
