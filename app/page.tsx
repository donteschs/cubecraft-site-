export const revalidate = 300;

import { Benefits } from "components/landing/benefits";
import { FAQ } from "components/landing/faq";
import { FeaturedProducts } from "components/landing/featured-products";
import { FinalCTA } from "components/landing/final-cta";
import { Guarantee } from "components/landing/guarantee";
import { Hero } from "components/landing/hero";
import { LatestArticles } from "components/landing/latest-articles";
import { MarqueeStrip } from "components/landing/marquee-strip";
import { Problem } from "components/landing/problem";
import { Testimonials } from "components/landing/testimonials";
import { Universes } from "components/landing/universes";
import Footer from "components/layout/footer";
import { HOME_SEO_IMAGES, SITE_IMAGES, absoluteImageUrl, absoluteImageUrls } from "lib/site-images";
import Script from "next/script";

export const metadata = {
  title: "CubeCraft — Jouets créatifs & éducatifs anti-écran",
  description:
    "La boutique de jouets créatifs et éducatifs qui remplacent les écrans : construction magnétique, STEM, créatif, Montessori, jeux en famille. Certifiés CE & EN 71. Livraison 4-5 jours.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "CubeCraft — Jouets créatifs & éducatifs anti-écran",
    description:
      "Construction, sciences, créatif, Montessori, jeux en famille. Une sélection de jouets éducatifs premium, certifiés CE & EN 71.",
    images: absoluteImageUrls(HOME_SEO_IMAGES),
  },
  twitter: {
    card: "summary_large_image",
    title: "CubeCraft — Jouets créatifs & éducatifs anti-écran",
    description:
      "Des jouets éducatifs premium pour décrocher vos enfants des écrans. Certifiés CE & EN 71.",
    images: [absoluteImageUrl(SITE_IMAGES.heroPack.src)],
  },
};

const schemaOrg = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "OnlineStore"],
      "@id": "https://cubecrafte.com/#organization",
      name: "CubeCraft",
      url: "https://cubecrafte.com",
      logo: "https://cubecrafte.com/favicon.ico",
      image: absoluteImageUrl(SITE_IMAGES.heroPack.src),
      description:
        "Boutique de jouets créatifs et éducatifs pour enfants de 2 à 14 ans : construction magnétique, STEM & sciences, créatif, éveil Montessori et jeux en famille. Une alternative aux écrans, certifiée CE & EN 71.",
      foundingDate: "2025",
      areaServed: ["FR", "BE", "CH", "LU"],
      knowsAbout: [
        "jouet éducatif",
        "jouet créatif",
        "jouet STEM",
        "jouet Montessori",
        "jeu de construction",
        "jouet anti-écran",
      ],
      slogan: "Construis ton monde. Pour de vrai.",
    },
    {
      "@type": "WebSite",
      "@id": "https://cubecrafte.com/#website",
      url: "https://cubecrafte.com",
      name: "CubeCraft",
      publisher: { "@id": "https://cubecrafte.com/#organization" },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://cubecrafte.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://cubecrafte.com/#faq",
      mainEntity: [
        { "@type": "Question", name: "Quels types de jouets vend CubeCraft ?", acceptedAnswer: { "@type": "Answer", text: "Une sélection de jouets créatifs et éducatifs : construction magnétique, STEM & sciences, créatif & dessin, éveil Montessori et jeux de société en famille. Tous sont certifiés CE & EN 71." } },
        { "@type": "Question", name: "À partir de quel âge sont les jouets CubeCraft ?", acceptedAnswer: { "@type": "Answer", text: "Notre sélection couvre les enfants de 2 à 14 ans. L'âge recommandé est indiqué sur chaque fiche produit." } },
        { "@type": "Question", name: "Les jouets sont-ils sûrs pour les enfants ?", acceptedAnswer: { "@type": "Answer", text: "Oui. Tous nos jouets sont certifiés CE et conformes aux normes européennes de sécurité EN 71." } },
        { "@type": "Question", name: "Quel est le délai de livraison ?", acceptedAnswer: { "@type": "Answer", text: "Livraison en 4-5 jours ouvrés en France métropolitaine. Livraison en Europe sous 7-10 jours." } },
        { "@type": "Question", name: "Quelle est la politique de retour ?", acceptedAnswer: { "@type": "Answer", text: "Garantie 30 jours. Renvoyez le produit dans son état d'origine, nous vous remboursons intégralement." } },
      ],
    },
  ],
});

export default function HomePage() {
  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        strategy="beforeInteractive"
      >{schemaOrg}</Script>
      <Hero />
      <MarqueeStrip />
      <Universes />
      <FeaturedProducts />
      <Problem />
      <Benefits />
      <Testimonials />
      <Guarantee />
      <LatestArticles />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
