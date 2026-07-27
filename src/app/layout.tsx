import type { Metadata, Viewport } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "יונתן רבינוביץ' | אמנות החושים, מנטליזם ואשליות",
  description: "חוויה שיוצאת מגבולות ההיגיון – מופע מנטליזם ואמנות החושים של יונתן רבינוביץ'. מותאם לאירועי חברה, חתונות ואירועים פרטיים יוקרתיים.",
  keywords: ["יונתן רבינוביץ'", "אמן חושים", "מנטליסט", "מופע מנטליזם", "קוסם לאירועים", "אירועי חברה", "אמן חושים לחתונות"],
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
    <html lang="he" dir="rtl" className={`${assistant.variable} scroll-smooth`}>
      <body className="bg-[#FAFAFA] text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-orange-200 selection:text-orange-900">
        {children}
      </body>
    </html>
  );
}
