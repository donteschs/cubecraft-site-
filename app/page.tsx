import { Benefits } from "components/landing/benefits";
import { FAQ } from "components/landing/faq";
import { FinalCTA } from "components/landing/final-cta";
import { Gallery } from "components/landing/gallery";
import { Guarantee } from "components/landing/guarantee";
import { Hero } from "components/landing/hero";
import { HowItWorks } from "components/landing/how-it-works";
import { MarqueeStrip } from "components/landing/marquee-strip";
import { Pricing } from "components/landing/pricing";
import { Problem } from "components/landing/problem";
import { Testimonials } from "components/landing/testimonials";
import { UrgencyBanner } from "components/landing/urgency-banner";
import Footer from "components/layout/footer";

export const metadata = {
  title: "CubeCraft — Construis ton monde. Pour de vrai.",
  description:
    "Les cubes magnétiques CubeCraft transforment les heures d'écran en heures de génie créatif. 64 blocs aimantés. Certifiés CE & EN 71. Offre lancement -30%.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "CubeCraft — Le Minecraft qu'ils peuvent toucher",
    description:
      "64 cubes magnétiques premium pour décrocher vos enfants des écrans. Certifié CE, aimants N52. 2847 parents satisfaits.",
  },
};

export default function HomePage() {
  return (
    <>
      <UrgencyBanner />
      <Hero />
      <MarqueeStrip />
      <Problem />
      <Benefits />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <Pricing />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
