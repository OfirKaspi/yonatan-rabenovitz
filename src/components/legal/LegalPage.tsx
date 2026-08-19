import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50 text-ink-900">
      <Navbar variant="solid" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pt-28 pb-16 md:px-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
          {title}
        </h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-700">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
