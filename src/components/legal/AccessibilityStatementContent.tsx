import { contact } from "@/content/site";

export default function AccessibilityStatementContent() {
  return (
    <>
      <p>
        האתר מיועד להיות נגיש לכלל המשתמשים, כולל אנשים עם מוגבלות. אפשר להתאים
        את התצוגה באמצעות כלי הנגישות באתר.
      </p>
      <h2 className="pt-2 font-display text-xl font-bold text-ink-900">
        מה אפשר לעשות באתר
      </h2>
      <ul className="list-disc space-y-1 pe-5">
        <li>לשנות גודל גופן</li>
        <li>להגביר ניגודיות</li>
        <li>לבחור פונט קריא ולהדגיש קישורים</li>
        <li>להפחית תנועות</li>
        <li>לנווט במקלדת ולהיעזר בקורא מסך</li>
      </ul>
      <p>
        אם נתקלתם בבעיית נגישות, נשמח לשמוע:{" "}
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
