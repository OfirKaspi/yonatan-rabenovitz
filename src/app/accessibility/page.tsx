import type { Metadata } from "next";
import AccessibilityStatementContent from "@/components/legal/AccessibilityStatementContent";
import LegalPage from "@/components/legal/LegalPage";
import { legal } from "@/content/site";

export const metadata: Metadata = {
  title: `${legal.accessibility.title} | יונתן רבינוביץ'`,
};

export default function AccessibilityPage() {
  return (
    <LegalPage title={legal.accessibility.title}>
      <AccessibilityStatementContent />
    </LegalPage>
  );
}
