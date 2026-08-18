import type { Metadata, Viewport } from "next";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "יונתן רבינוביץ' | אמן קלפים",
  description:
    "יונתן רבינוביץ' — אמן קלפים ממצפה רמון. קסמי קלפים מקרוב, קבלות פנים, מופעים וסדנאות. בואו נדבר.",
  keywords: [
    "יונתן רבינוביץ'",
    "אמן קלפים",
    "קוסם",
    "קסמי קלפים",
    "מצפה רמון",
    "קוסם לאירועים",
    "מופע קסמים",
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
      className={`${assistant.variable} ${frankRuhl.variable}`}
    >
      <body className="bg-sand-50 text-ink-900 min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
