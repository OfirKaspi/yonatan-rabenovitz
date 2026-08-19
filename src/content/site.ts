/**
 * Single source of truth for all site copy + assets.
 *
 * COPY POLICY: visible copy comes only from Yonatan's previous website
 * https://yonatanrabenovitz.wixsite.com/magic — nothing is invented.
 */

import type { GalleryItem } from "@/lib/gallery";

export { cld } from "@/lib/gallery";

const CLOUD = "https://res.cloudinary.com/dudwjf2pu/image/upload";

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
  galleryA: `${CLOUD}/v1787154398/LevelUp/yonatan-rabenovitz/41915ca3-0728-4669-8ea5-f59006eea5ec_gp0dev.jpg`,
  galleryB: `${CLOUD}/v1787154402/LevelUp/yonatan-rabenovitz/8ae44163-f366-49fa-b4ba-97ea9e48e58f_l9c31o.jpg`,
  workshop: `${CLOUD}/v1787154400/LevelUp/yonatan-rabenovitz/554cbed5-3878-4359-b59b-d6f5797f3ae7_anqazq.jpg`,
  og: `${CLOUD}/v1787154398/LevelUp/yonatan-rabenovitz/1a3a6490-ee2a-45b1-82c0-ff233717d573_yznrvk.jpg`,
} as const;

export const contact = {
  whatsappNumber: "972549383155",
  phoneDisplay: "054-9383155",
  phoneHref: "tel:+972549383155",
  email: "Yonatan.rabenovitz@gmail.com",
  instagram: "https://www.instagram.com/yonatan.rabinovitz",
  prefilledMessage: "היי יונתן, אשמח לשמוע על מופע לאירוע שלי 🃏",
} as const;

export const brand = {
  name: "יונתן רבינוביץ'",
  role: "אמן קלפים",
} as const;

export const navLinks = [
  { label: "מי אני?", href: "/#about" },
  { label: "מה יש לי בשרוול?", href: "/#sleeve" },
  { label: "חידה קטנה עד שניפגש", href: "/#puzzle" },
  { label: "בואו נדבר", href: "/#contact" },
] as const;

export const agency = {
  name: "The Level Up Agency",
  year: 2026,
  href: "https://thelevelupagency.com",
  services: "בניית אתרים · שיווק · כתיבה",
} as const;

export const legal = {
  privacy: {
    label: "מדיניות פרטיות",
    href: "/privacy",
    title: "מדיניות פרטיות",
  },
  accessibility: {
    label: "הצהרת נגישות",
    href: "/accessibility",
    title: "הצהרת נגישות",
  },
  formConsent: "שליחה מהווה הסכמה למדיניות הפרטיות",
} as const;

export const hero = {
  headlineLead: "יונתן רבינוביץ'",
  headlineRest: "קוסם ואומן חושים",
  ctaPrimary: "בואו נדבר",
  ctaSecondary: "מה יש לי בשרוול?",
} as const;

export const about = {
  title: "מי אני?",
  paragraphs: [
    "יונתן רבינוביץ', אמן קלפים, חי במרחב השראה בלב המרכז - תל אביב.",
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
  cta: "כזה אני רוצה",
  items: [
    {
      id: "walkaround",
      title: "קבלת פנים - walk around magic",
      image: assets.cardThrow,
      body: [
        "סוג זה של מפגש מאפשר לי להעביר את הקסם באופן הכי אישי וקרוב שיכול להיות.",
        "במהלך האירוע אני עובר בין קבוצות של אנשים, שולחנות או מתחמים ופוגש את המשתתפים, עושה קסמים ומאפשר הצצה בלעדית לעולם הקסמים. כך, מתאפשר מפגש מרגש ואינטימי בין האנשים לקסם.",
      ],
      audienceTitle: "למי קבלת הפנים מתאימה?",
      audience: [
        "אירועים, חתונות, מסיבות, מסעדות, וכל מרחב שיש בו קבלת קהל או זמן חופשי של משתתפים. מתאים מאוד למי שרוצה לשלב ערך מוסף וקסם באירוע מבלי לסגור משבצת זמן ייעודית.",
      ],
      whatsappMessage:
        "שלום יונתן! \nיש לי אירוע והבנתי שאתה הבן אדם לדבר איתו. אשמח לקבל עוד פרטים על קבלת הפנים",
    },
    {
      id: "mazaltov",
      title: '"מזל טוב" - מופע קסמים ייחודי',
      image: assets.ted2,
      body: [
        "מתי בפעם האחרונה חווית קסם?",
        "אבל אמיתי מה, שהחושים וההיגיון לא מצליחים להסביר.",
        'במופע "מזל טוב" הקהל נחשף לקסמים, חוויות אישיות, סיפורים ותובנות שנאספו למעלה מעשור בתחום הקלפים.',
        "ניגע בתפישות עולם שמלוות אותנו ביום יום, כאלו שאנחנו לא תמיד מייחסים להם חשיבות - אמונה, מזל ודפוסי החשיבה שלנו, מתי עצרת וחשבת מה עומד מאחוריהם?",
        "המופע נערך בשיתוף הקהל, ובכל פעם מחדש מעורר פליאה, מחבר את הקבוצה דרך הסקרנות המשותפת ופותח צוהר לעולם חדש וקסום לכל מי שצופה בו.",
      ],
      audienceTitle: "למי המופע מתאים?",
      audience: [
        "אירועים פרטיים ואירועי חברה, מופעי סלון, ובכל מרחב עם קהל של עד 120 אנשים.",
        "המופע מתאים לקהל בוגר (+12) ומשכו כ-45 דק'.",
      ],
      whatsappMessage:
        "שלום יונתן! \nיש לי אירוע והבנתי שאתה הבן אדם לדבר איתו. אשמח לקבל עוד פרטים על המופע",
    },
    {
      id: "workshop",
      title: "סודות הקוסם - סדנת קסמים",
      image: assets.workshop,
      body: [
        'בסדנת "סודות הקוסם" אני פותח את הדלת לעולם הקסמים ומעניק הצצה בלעדית לאחורי הקלעים שלנו, הקוסמים.',
        'הסדנה כוללת מופע קסמים קצר ולאחריו הדרכה ולמידה של מספר קסמים, עקרונות מנחים ושיחה פתוחה - מהי אגודת הקוסמים? למה קוסמים לא מגלים את הקסמים שלהם? וכל מה שרציתם לשאול (חוץ מ"איך עושים את הקסם הזה?" סתם, בסדנה הזו מותר לשאול את זה).',
        "בואו לחוות ולטעום את עולם הקסמים דרך ראש של קוסם, ומי יודע, אולי תתאהבו כמוני.",
      ],
      audienceTitle: "למי הסדנה מתאימה?",
      audience: [
        "אירועים פרטיים ואירועי חברה עד 30 אנשים.",
        "הסדנה מתאימה לגילאי 8 ומעלה ומשכה כ-50 דק'.",
      ],
      whatsappMessage:
        "שלום יונתן! \nהבנתי שאתה עושה סדנאות קסמים מיוחדות, אשמח לקבל עוד פרטים עליהן.",
    },
    {
      id: "lessons",
      title: "שיעורים פרטיים",
      image: assets.craft,
      body: [
        "אם מעניין אותך להתעמק בעולם הקסמים, ללמוד לשלוט בקלפים ולעשות דברים שידהימו אנשים - הגעת למקום הנכון.",
        "השיעורים פרטיים ומותאמים אישית לכל תלמיד/ה, במהלכם נלמד תיאוריה, נבנה בסיס טכני חזק ונרכוש עקרונות נכונים לעבודה עם קלפים.",
        "נלמד לא רק איך לבצע קסם, אלא איך להעביר אותו בצורה הטובה והמדויקת ביותר.",
      ],
      quote:
        "Practice does not make perfect, only perfect practice makes perfect",
      audienceTitle: "למי השיעורים מתאימים?",
      audience: [
        "השיעורים מתקיימים בקבוצות של עד 2 תלמידים/ות, לפי רצון אישי.",
        "מתאימים לכל הגילאים החל מגיל 8.",
        "מתאים גם לבעלי/ות ניסיון בתחום שרוצים לקחת את הקסמים שלהם לשלב הבא.",
      ],
      whatsappMessage:
        "שלום יונתן!\nאשמח לקבל עוד פרטים על השיעורים הפרטיים איתך.",
    },
  ],
} as const;

export const moments = {
  title: "גלריה",
  items: [
    { type: "image", src: assets.galleryB },
    { type: "image", src: assets.galleryA },
    { type: "image", src: assets.ted1 },
    { type: "image", src: assets.audience2 },
    { type: "image", src: assets.playful },
    { type: "image", src: assets.stage },
  ],
} as const satisfies { title: string; items: readonly GalleryItem[] };

export const videos = {
  title: "סרטונים",
  cta: "רוצים לראות עוד?",
  items: [
    {
      id: "1218827627",
      poster:
        "https://i.vimeocdn.com/video/2190872012-beece355f8a36c230c3816221b1587fb3af835b06b7b5b965d0a74e5a4dc87e5-d_360x640",
    },
    {
      id: "1218827659",
      poster:
        "https://i.vimeocdn.com/video/2190872026-50cf25e0c69e556795a059758b9bead0fb33e3aa568b2be0c2842714c0aeb4c8-d_360x640",
    },
    {
      id: "1218827628",
      poster:
        "https://i.vimeocdn.com/video/2190872005-817671b89de93b3df02f189bcd5dfd7f38236d05f8df80332fb89eb75055876a-d_360x640",
    },
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
