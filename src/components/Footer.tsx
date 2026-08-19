import Logo from "@/components/Logo";
import { brand, contact, navLinks } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-50 py-14">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-auto text-ink-900" />
              <span className="font-display font-bold text-xl text-ink-900">
                {brand.name}
              </span>
            </div>
            <p className="mt-4 text-ink-700">{brand.role}</p>
          </div>

          <nav aria-label={brand.name}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ink-700 transition-colors hover:text-gold-600"
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
              className="block transition-colors hover:text-gold-600"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="block transition-colors hover:text-gold-600"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-sand-200 pt-6 text-sm text-ink-500">
          <p>© {brand.name}</p>
        </div>
      </div>
    </footer>
  );
}
