import type { Locale } from "@/i18n/config";
import { JsonLd, businessJsonLd } from "@/lib/seo";
import { About } from "./About";
import { Advantages } from "./Advantages";
import { ContactDock } from "./ContactDock";
import { CostCalculator } from "./CostCalculator";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Portfolio } from "./Portfolio";
import { Pricing } from "./Pricing";
import { Process } from "./Process";
import { Services } from "./Services";
import { TrustBar } from "./TrustBar";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={businessJsonLd(locale)} />
      <Header locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <TrustBar locale={locale} />
        <Services locale={locale} />
        <Advantages locale={locale} />
        <Portfolio locale={locale} />
        <Process locale={locale} />
        <Pricing locale={locale} />
        <CostCalculator locale={locale} />
        <About locale={locale} />
        <FAQ locale={locale} />
        <FinalCTA locale={locale} />
      </main>
      <Footer locale={locale} />
      <ContactDock locale={locale} />
    </>
  );
}
