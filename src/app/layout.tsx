import type { Metadata, Viewport } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "יונתן רבינוביץ' | אמן קלפים",
  description:
    "יונתן רבינוביץ', אמן קלפים, חי במרחב השראה בלב המדבר - מצפה רמון.",
  keywords: [
    "יונתן רבינוביץ'",
    "אמן קלפים",
    "קבלת פנים - walk around magic",
    "מזל טוב - מופע קסמים ייחודי",
    "סודות הקוסם - סדנת קסמים",
    "שיעורים פרטיים",
  ],
  authors: [{ name: "יונתן רבינוביץ'" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frankRuhl.variable}`}
    >
      <body className="bg-sand-50 text-ink-900 min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
