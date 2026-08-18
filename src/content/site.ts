/**
 * Single source of truth for all site copy + assets.
 *
 * COPY POLICY (per client brief): the bio, section headers, service names and
 * puzzle text are taken VERBATIM from Yonatan's own previous website
 * (yonatanrabenovitz.wixsite.com/magic). Short service one-liners and section
 * subtitles are new, marked `NEW COPY`, and grounded only in real facts.
 * No awards / stats / clients / testimonials are invented.
 *
 * CONTACT DETAILS below are the client's real WhatsApp, phone, email & Instagram.
 */

// ---------------------------------------------------------------------------
// Real client assets (Cloudinary). Named by role, not by filename.
// ---------------------------------------------------------------------------
const CLOUD = "https://res.cloudinary.com/dudwjf2pu/image/upload";

/**
 * Inject a Cloudinary transform into an upload URL (e.g. crop to an aspect
 * ratio with smart gravity) without re-uploading. `crop("...", url)` returns
 * a new delivery URL; the original stays untouched.
 */
export function cld(transform: string, url: string): string {
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}

export const assets = {
  logo: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.13.38_dbt55r.jpg`,
  // TEDx Mitzpe Ramon — speaking on stage (a talk shot, not a card portrait).
  talk: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.09_okwhlg.jpg`,
  // Dynamic card cascade — the four aces mid-air, suede vest, warm light.
  // The strongest card image → the hero.
  cardThrow: `${CLOUD}/v1786952101/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.19.50_jlcqvx.jpg`,
  // Contemplative, spreading the deck across the hand — the craft.
  craft: `${CLOUD}/v1786951971/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_1_gzibj8.jpg`,
  // Playful — card balanced on the forehead.
  playful: `${CLOUD}/v1786952100/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_ecdcze.jpg`,
  // Rubik's cube, wide-eyed — humor.
  rubik: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.09_2_xmviba.jpg`,
  // On stage, red curtain, hand raised.
  stage: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.13.38_1_ysief6.jpg`,
  // TEDx Mitzpe Ramon — speaking to a seated audience.
  ted1: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.09_1_pxogeh.jpg`,
  ted2: `${CLOUD}/v1786951971/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_2_pc2znj.jpg`,
  // Wine-shop close-up — a participant smiling.
  audience1: `${CLOUD}/v1786951971/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_3_cniynz.jpg`,
  audience2: `${CLOUD}/v1786952013/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_4_tsbdzr.jpg`,
} as const;

// ---------------------------------------------------------------------------
// Contact — PLACEHOLDERS. Replace before launch.
// ---------------------------------------------------------------------------
export const contact = {
  // International format, digits only, for the wa.me link.
  whatsappNumber: "972549383155",
  phoneDisplay: "054-938-3155",
  phoneHref: "tel:+972549383155",
  email: "Yonatan.rabenovitz@gmail.com",
  instagram: "https://www.instagram.com/yonatan.rabinovitz",
  prefilledMessage: "היי יונתן, אשמח לשמוע על מופע לאירוע שלי 🃏",
} as const;

export const brand = {
  name: "יונתן רבינוביץ'",
  role: "אמן קלפים", // from his previous site
  location: "מצפה רמון",
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const navLinks = [
  { label: "אודות", href: "#about" },
  { label: "מה בשרוול", href: "#sleeve" },
  { label: "רגעים", href: "#moments" },
  { label: "מחוץ לקופסה", href: "#puzzle" },
  { label: "צור קשר", href: "#contact" },
] as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const hero = {
  // His real name + role from the original site.
  headlineLead: "יונתן רבינוביץ'",
  headlineRest: "אמן קלפים",
  // Verbatim from his original site bio opening.
  sub: "חי במרחב השראה בלב המדבר – מצפה רמון.",
  ctaPrimary: "בואו נדבר",
  ctaSecondary: "מה יש לי בשרוול?",
} as const;

// ---------------------------------------------------------------------------
// About / Introduction — ADAPTED & shortened from his previous site.
// ---------------------------------------------------------------------------
export const about = {
  // Verbatim section header from his original site.
  kicker: "מי אני?",
  title: "יונתן רבינוביץ', אמן קלפים",
  // VERBATIM from his original site — split into paragraphs for rhythm only,
  // not a single word changed.
  paragraphs: [
    "חי במרחב השראה בלב המדבר – מצפה רמון. נחשפתי לעולם הקסמים בגיל 15 ומאז פיתחתי תשוקה וחיבור עמוק מאוד ל-52 חתיכות נייר. חפיסת הקלפים מבחינתי היא כלי להתבטא, להכיר ולהתחבר לאנשים.",
    "המטרה שלי היא להפיץ טוב בעולם ולגרום לאנשים לחייך, ואין כמו תחושת הקסם, הסקרנות והפליאה שמשתקפות אלי מאנשים שאני פוגש לאורך הדרך.",
    "בשנים האחרונות אני עוסק גם בתחום הקרקס, שמהווה כמו עולם הקסמים גשר לחיבור, משחקיות והכרות עם אנשים. יש לי חלום להצליח ולשלב בין השניים בעשייה האמנותית שלי, ואני עובד כיום על מופע שמשלב את שני העולמות האלו.",
  ],
  // Pull-quote lifted verbatim from the bio above.
  pullQuote: "המטרה שלי היא להפיץ טוב בעולם ולגרום לאנשים לחייך.",
} as const;

// ---------------------------------------------------------------------------
// "מה יש לי בשרוול?" — services, from his previous site. Framed as an artist,
// not a pricing table.
// ---------------------------------------------------------------------------
export const sleeve = {
  // Verbatim section header from his original site.
  kicker: "מה יש לי בשרוול?",
  title: "מה יש לי בשרוול?",
  // Service names VERBATIM from his original site. One-line descriptions are
  // NEW COPY (flagged) — grounded only in the real service name, no invented claims.
  items: [
    {
      id: "walkaround",
      title: "קבלת פנים – walk around magic",
      line: "עובר בין האורחים, שולחן לשולחן, ומחמם את האווירה עוד לפני שהערב מתחיל.",
      image: assets.cardThrow,
    },
    {
      id: "mazaltov",
      title: "מזל טוב – מופע קסמים ייחודי",
      line: "מופע קסמים אישי לרגעים שמסמנים חגיגה.",
      image: assets.stage,
    },
    {
      id: "workshop",
      title: "סודות הקוסם – סדנת קסמים",
      line: "סדנה שבה גם אתם לומדים להפתיע — חוויה משותפת, לא רק צפייה.",
      image: assets.playful,
    },
    {
      id: "lessons",
      title: "שיעורים פרטיים",
      line: "אחד על אחד, מהצעד הראשון ועד הטריק שתבצעו בעצמכם.",
      image: assets.craft,
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Moments (proof via real photography — no fabricated testimonials)
// ---------------------------------------------------------------------------
export const moments = {
  kicker: "רגעים",
  // NEW COPY — verify with client.
  title: "הקסם קורה בין אנשים",
  // Only real, minimal captions. TODO: confirm venue/event names with client.
  images: [
    { src: assets.stage, alt: "על הבמה", span: "tall" },
    { src: assets.audience1, alt: "מופע מקרוב", span: "wide" },
    { src: assets.ted1, alt: "TEDx מצפה רמון", span: "normal" },
    { src: assets.audience2, alt: "רגע של פליאה", span: "normal" },
    { src: assets.ted2, alt: "מול קהל", span: "tall" },
    { src: assets.playful, alt: "קצת הומור", span: "normal" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Outside-the-box puzzle — his real line kept verbatim.
// ---------------------------------------------------------------------------
export const puzzle = {
  kicker: "מחוץ לקופסה",
  // Verbatim from his original site.
  title: "חידה קטנה עד שניפגש",
  // His real line (kept from previous site / Phase 1).
  tagline:
    "בקוסמות כמו בחיים — כדי למצוא את הפתרון, חייבים לצאת מחוץ לקופסה.",
  // Instruction VERBATIM from his original site.
  instruction:
    "עליך לחבר בין כל הנקודות בעזרת 4 קווים ישרים מבלי להרים את האצבע מהמסך.",
  reset: "מהתחלה",
  hint: "רמז",
  hintText:
    "כדי לחבר את כל 9 הנקודות ב-4 קווים, חלק מהקווים חייבים להימשך אל מעבר לגבולות הריבוע.",
  successTitle: "יצאת מהקופסה.",
  successBody: "בדיוק ככה נראה קסם — פתרון שלא ציפית לו.",
} as const;

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
export const contactSection = {
  kicker: "צור קשר",
  title: "בואו נדבר",
  // NEW COPY — verify with client.
  sub: "מתכננים אירוע? ספרו לי מה חוגגים, ונבנה יחד את הרגע הנכון.",
  whatsappCta: "שלחו הודעת וואטסאפ",
  formTitle: "או השאירו פרטים ואחזור אליכם",
} as const;

export const footer = {
  tagline: "קסמי קלפים ממצפה רמון",
} as const;
