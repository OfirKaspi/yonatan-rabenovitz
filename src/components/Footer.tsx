import Logo from "@/components/Logo";
import { whatsappHref } from "@/lib/whatsapp";
import { brand, contact, footer, navLinks } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-50 py-14">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-auto text-ink-900" />
              <span className="font-display text-xl font-bold text-ink-900">
                {brand.name}
              </span>
            </div>
            <p className="mt-4 text-ink-700">{footer.tagline}</p>
          </div>

          {/* Nav */}
          <nav aria-label="ניווט תחתון">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ink-700 transition-colors hover:text-suede-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-2 text-ink-700">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium transition-colors hover:text-suede-600"
            >
              וואטסאפ
            </a>
            <a
              href={contact.phoneHref}
              className="block transition-colors hover:text-suede-600"
            >
              {contact.phoneDisplay}
            </a>
            {contact.instagram && (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-suede-600"
              >
                אינסטגרם
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="block transition-colors hover:text-suede-600"
              >
                {contact.email}
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-sand-200 pt-6 text-sm text-ink-500">
          <p>
            © {brand.name} · {brand.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
