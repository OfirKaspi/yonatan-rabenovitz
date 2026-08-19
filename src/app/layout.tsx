import type { Metadata, Viewport } from "next";
import { Heebo, Rubik } from "next/font/google";
import AccessibilityWidget from "@/components/legal/AccessibilityWidget";
import { assets, brand } from "@/content/site";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["600", "700", "800", "900"],
});

const title = `${brand.name} | ${brand.role}`;
const description =
  "יונתן רבינוביץ', אמן קלפים, חי במרחב השראה בלב המרכז - תל אביב.";
const ogImage = {
  url: assets.og,
  width: 1254,
  height: 1254,
  alt: brand.name,
};

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "יונתן רבינוביץ'",
    "אמן קלפים",
    "קבלת פנים - walk around magic",
    "מזל טוב - מופע קסמים ייחודי",
    "סודות הקוסם - סדנת קסמים",
    "שיעורים פרטיים",
  ],
  authors: [{ name: brand.name }],
  openGraph: {
    title,
    description,
    locale: "he_IL",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
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
      className={`${heebo.variable} ${rubik.variable}`}
    >
      <body className="bg-sand-50 text-ink-900 min-h-screen flex flex-col font-sans antialiased">
        {children}
        <AccessibilityWidget />
      </body>
    </html>
  );
}
