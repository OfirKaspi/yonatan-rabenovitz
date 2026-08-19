/**
 * Single source of truth for all site copy + assets.
 *
 * COPY POLICY: visible copy comes only from Yonatan's previous website
 * https://yonatanrabenovitz.wixsite.com/magic — nothing is invented.
 */

const CLOUD = "https://res.cloudinary.com/dudwjf2pu/image/upload";

export function cld(transform: string, url: string): string {
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}

export const assets = {
  logo: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.13.38_dbt55r.jpg`,
  talk: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.09_okwhlg.jpg`,
  cardThrow: `${CLOUD}/v1786952101/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.19.50_jlcqvx.jpg`,
  craft: `${CLOUD}/v1786951971/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_1_gzibj8.jpg`,
  playful: `${CLOUD}/v1786952100/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_ecdcze.jpg`,
  rubik: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.09_2_xmviba.jpg`,
  stage: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.13.38_1_ysief6.jpg`,
  ted1: `${CLOUD}/v1786951970/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.09_1_pxogeh.jpg`,
  ted2: `${CLOUD}/v1786951971/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_2_pc2znj.jpg`,
  audience1: `${CLOUD}/v1786951971/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_3_cniynz.jpg`,
  audience2: `${CLOUD}/v1786952013/LevelUp/yonatan-rabenovitz/WhatsApp_Image_2026-08-04_at_19.18.10_4_tsbdzr.jpg`,
} as const;

export const contact = {
  whatsappNumber: "972549383155",
  phoneDisplay: "054-9383155",
  phoneHref: "tel:+972549383155",
  email: "Yonatan.rabenovitz@gmail.com",
  prefilledMessage: "היי יונתן, אשמח לשמוע על מופע לאירוע שלי 🃏",
} as const;

export const brand = {
  name: "יונתן רבינוביץ'",
  role: "אמן קלפים",
} as const;

export const navLinks = [
  { label: "מי אני?", href: "#about" },
  { label: "מה יש לי בשרוול?", href: "#sleeve" },
  { label: "חידה קטנה עד שניפגש", href: "#puzzle" },
  { label: "בואו נדבר", href: "#contact" },
] as const;

export const hero = {
  headlineLead: "יונתן רבינוביץ'",
  headlineRest: "אמן קלפים",
  ctaPrimary: "בואו נדבר",
  ctaSecondary: "מה יש לי בשרוול?",
} as const;

export const about = {
  title: "מי אני?",
  paragraphs: [
    "יונתן רבינוביץ', אמן קלפים, חי במרחב השראה בלב המדבר - מצפה רמון.",
    "נחשפתי לעולם הקסמים בגיל 15 ומאז פיתחתי תשוקה וחיבור עמוק מאוד ל-52 חתיכות נייר.",
    "חפיסת הקלפים מבחינתי היא כלי להתבטא, להכיר ולהתחבר לאנשים.",
    "המטרה שלי היא להפיץ טוב בעולם ולגרום לאנשים לחייך, ואין כמו תחושת הקסם, הסקרנות והפליאה שמשתקפות אלי מאנשים שאני פוגש לאורך הדרך.",
    "בשנים האחרונות אני עוסק גם בתחום הקרקס, שמהווה כמו עולם הקסמים גשר לחיבור, משחקיות והכרות עם אנשים. יש לי חלום להצליח ולשלב בין השניים בעשייה האמנותית שלי, ואני עובד כיום על מופע שמשלב את שני העולמות האלו.",
  ],
  pullQuote:
    "המטרה שלי היא להפיץ טוב בעולם ולגרום לאנשים לחייך.",
} as const;

export const sleeve = {
  title: "מה יש לי בשרוול?",
  items: [
    {
      id: "walkaround",
      title: "קבלת פנים - walk around magic",
      image: assets.cardThrow,
    },
    {
      id: "mazaltov",
      title: '"מזל טוב" - מופע קסמים ייחודי',
      image: assets.stage,
    },
    {
      id: "workshop",
      title: "סודות הקוסם - סדנת קסמים",
      image: assets.playful,
    },
    {
      id: "lessons",
      title: "שיעורים פרטיים",
      image: assets.craft,
    },
  ],
} as const;

export const moments = {
  title: "גלריה",
  images: [
    { src: assets.stage },
    { src: assets.audience1 },
    { src: assets.ted1 },
    { src: assets.audience2 },
    { src: assets.ted2 },
    { src: assets.playful },
  ],
} as const;

export const puzzle = {
  title: "חידה קטנה עד שניפגש",
  instruction:
    "עליך לחבר בין כל הנקודות בעזרת 4 קווים ישרים מבלי להרים את האצבע מהמסך",
  idlePrompt: "לחץ וגרור כדי למתוח קו",
  linesLabel: "קווים",
  dotsLabel: "נקודות",
  reset: "איפוס",
  tryAgain: "נסה שוב",
  failLead: "נעצרת בתוך הריבוע?",
  failBody:
    "בקסמים ובמנטליזם, הסוד הוא לפרוץ את הגבולות! נסה למתוח את הקווים מעבר לגבולות הריבוע.",
  successTitle: "כל הכבוד! הצלחת!",
  successBody:
    "מי שחושב מחוץ לקופסה מרוויח. מגיע לך שהאירוע שלך יהיה מיוחד באותה מידה.",
  close: "סגור",
  hintToggle: "צריך רמז?",
  hintHide: "הסתר רמז",
  hint:
    "כדי לחבר את כל 9 הנקודות ב-4 קווים, חלק מהקווים חייבים להסתיים מחוץ לריבוע הדמיוני שהנקודות יוצרות!",
} as const;

export const contactSection = {
  title: "בואו נדבר",
  successTitle: "הפרטים נשלחו בהצלחה",
  successBody: "תודה רבה, ניצור איתך קשר בהקדם.",
} as const;
