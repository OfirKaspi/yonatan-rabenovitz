import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import { legal } from "@/content/site";

export const metadata: Metadata = {
  title: `${legal.privacy.title} | יונתן רבינוביץ'`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title={legal.privacy.title}>
      <PrivacyPolicyContent />
    </LegalPage>
  );
}
