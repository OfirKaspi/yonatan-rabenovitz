import { brand, contact } from "@/content/site";

export default function PrivacyPolicyContent() {
  return (
    <>
      <p>
        האתר מופעל על ידי {brand.name}. אנו מכבדים את פרטיותכם ומשתמשים בפרטים
        שתשאירו רק כדי לחזור אליכם.
      </p>
      <h2 className="pt-2 font-display text-xl font-bold text-ink-900">
        איזה מידע נאסף
      </h2>
      <p>
        בטופס יצירת הקשר אפשר להשאיר שם, טלפון, סוג אירוע, תאריך והערות. לא
        מבקשים מידע מעבר למה שצריך כדי לטפל בפנייה.
      </p>
      <h2 className="pt-2 font-display text-xl font-bold text-ink-900">
        איך משתמשים במידע
      </h2>
      <p>
        הפרטים משמשים רק לחזרה אליכם לגבי המופע או האירוע. אין מכירת מידע ואין
        דיוור שיווקי.
      </p>
      <h2 className="pt-2 font-display text-xl font-bold text-ink-900">
        שמירה באתר
      </h2>
      <p>
        האתר אינו משתמש בעוגיות מעקב. העדפות כלי הנגישות נשמרות בדפדפן שלכם
        בלבד.
      </p>
      <h2 className="pt-2 font-display text-xl font-bold text-ink-900">
        פניות
      </h2>
      <p>
        לבקשה לעיון, תיקון או מחיקה של פרטים שנמסרו בטופס:{" "}
        <a
          href={`mailto:${contact.email}`}
          className="text-gold-600 underline underline-offset-4 hover:text-gold-500"
        >
          {contact.email}
        </a>
      </p>
    </>
  );
}
