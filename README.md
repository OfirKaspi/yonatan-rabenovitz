# יונתן רבינוביץ' — אתר תדמית

Homepage for Yonatan Rabenovitz, a card artist (אמן קלפים) based in Mitzpe Ramon.
Hebrew, RTL, WhatsApp-first booking.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — CSS-first config in [`src/app/globals.css`](src/app/globals.css) `@theme` block (no `tailwind.config.js`)
- **next/font** — Assistant (body) + Frank Ruhl Libre (Hebrew display)
- **next/image** — real photography served from Cloudinary
- Contact form: **react-hook-form** + **zod**, emailed via **Resend**

> ⚠️ This Next.js version has breaking changes vs. older conventions. See [`AGENTS.md`](AGENTS.md) — consult `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Content

All copy and image references live in a single source of truth:
[`src/content/site.ts`](src/content/site.ts). Copy is adapted from Yonatan's
own previous site and real facts; anything new is flagged
`NEW COPY — verify with client`. No awards/stats/clients/testimonials are invented.

## Before launch — replace placeholders

Grep for `TODO` in `src/content/site.ts` and set the real values:

- **WhatsApp number** — `contact.whatsappNumber` (international format, digits only)
- **Phone** — `contact.phoneDisplay` / `contact.phoneHref`
- **Booking email** — `contact.email`, and the `BOOKING_EMAIL` env var (used by the contact API)
- **Instagram** — `contact.instagram` if provided
- **Official logo vector** — currently an SVG recreation in [`src/components/Logo.tsx`](src/components/Logo.tsx)

## Environment variables

```
RESEND_API_KEY=      # enables real email; without it the form logs in simulation mode
BOOKING_EMAIL=       # recipient for contact-form leads
```

## Structure

`Navbar → Hero → About → מה יש לי בשרוול (services) → רגעים (moments) → מחוץ לקופסה (9-dots) → Contact → Footer`

Sections live in [`src/components/`](src/components/); the page composes them in
[`src/app/page.tsx`](src/app/page.tsx).
