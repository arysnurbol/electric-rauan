import { PrivacyPage, privacyMetadata } from "@/components/PrivacyPage";

export const metadata = privacyMetadata("ru");

export default function Page() {
  return <PrivacyPage locale="ru" />;
}
