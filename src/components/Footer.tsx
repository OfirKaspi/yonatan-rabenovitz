import Logo from "@/components/Logo";
import LogoAnimation from "@/components/LogoAnimation";
import InstagramIcon from "@/components/InstagramIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { agency, brand, contact, legal, navLinks } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";

const socials = [
  {
    label: "Instagram",
    href: contact.instagram,
    icon: InstagramIcon,
  },
  {
    label: "WhatsApp",
    href: whatsappHref(),
    icon: WhatsAppIcon,
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-50">
      <LogoAnimation />
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-auto text-ink-900" />
              <span className="font-display font-bold text-xl text-ink-900">
                {brand.name}
              </span>
            </div>
            <p className="mt-4 text-ink-700">{brand.role}</p>
            <ul className="mt-5 flex items-center gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 text-ink-700 transition-colors hover:border-gold-500 hover:text-gold-600"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={brand.name}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="link-underline text-ink-700 hover:text-gold-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-2 text-ink-700">
            <a
              href={contact.phoneHref}
              className="link-underline hover:text-gold-600"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="link-underline hover:text-gold-600"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-sand-200 pt-6 text-sm text-ink-500 md:flex-row md:items-end md:justify-between">
          <a
            href={agency.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-gold-600"
          >
            <p>© {agency.name} {agency.year}</p>
            <p className="mt-1">{agency.services}</p>
          </a>
          <nav aria-label="מידע משפטי">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a
                  href={legal.privacy.href}
                  className="link-underline hover:text-gold-600"
                >
                  {legal.privacy.label}
                </a>
              </li>
              <li>
                <a
                  href={legal.accessibility.href}
                  className="link-underline hover:text-gold-600"
                >
                  {legal.accessibility.label}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
