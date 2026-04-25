export const revalidate = 300;

import { Benefits } from "components/landing/benefits";
import { FAQ } from "components/landing/faq";
import { FinalCTA } from "components/landing/final-cta";
import { Gallery } from "components/landing/gallery";
import { Guarantee } from "components/landing/guarantee";
import { Hero } from "components/landing/hero";
import { HowItWorks } from "components/landing/how-it-works";
import { LatestArticles } from "components/landing/latest-articles";
import { MarqueeStrip } from "components/landing/marquee-strip";
import { Pricing } from "components/landing/pricing";
import { Problem } from "components/landing/problem";
import { Testimonials } from "components/landing/testimonials";
import Footer from "components/layout/footer";
import { HOME_SEO_IMAGES, SITE_IMAGES, absoluteImageUrl, absoluteImageUrls } from "lib/site-images";
import Script from "next/script";

export const metadata = {
  title: "CubeCraft — Construis ton monde. Pour de vrai.",
  description:
    "Les cubes magnétiques CubeCraft transforment les heures d'écran en heures de génie créatif. 100 blocs aimantés. Certifiés CE & EN 71. Offre lancement -30%.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "CubeCraft — Le Minecraft qu'ils peuvent toucher",
    description:
      "100 cubes magnétiques premium pour décrocher vos enfants des écrans. Certifié CE, aimants N52. 2847 parents satisfaits.",
    images: absoluteImageUrls(HOME_SEO_IMAGES),
  },
  twitter: {
    card: "summary_large_image",
    title: "CubeCraft — Le Minecraft qu'ils peuvent toucher",
    description:
      "100 cubes magnétiques premium pour décrocher vos enfants des écrans. Certifié CE, aimants N52. 2847 parents satisfaits.",
    images: [absoluteImageUrl(SITE_IMAGES.heroPack.src)],
  },
};

const schemaOrg = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://cubecrafte.com/#organization",
      name: "CubeCraft",
      url: "https://cubecrafte.com",
      logo: "https://cubecrafte.com/favicon.ico",
      image: absoluteImageUrl(SITE_IMAGES.heroPack.src),
      description:
        "Cubes magnétiques premium pour enfants 6-14 ans. Alternative créative aux écrans, certifiés CE & EN 71, aimants néodyme N52.",
      foundingDate: "2025",
      areaServed: ["FR", "BE", "CH", "LU"],
      knowsAbout: ["jouet magnétique", "cubes construction", "jouet éducatif STEM", "alternative Minecraft"],
      slogan: "Construis ton monde. Pour de vrai.",
    },
    {
      "@type": "FAQPage",
      "@id": "https://cubecrafte.com/#faq",
      mainEntity: [
        { "@type": "Question", name: "À partir de quel âge mon enfant peut jouer avec CubeCraft ?", acceptedAnswer: { "@type": "Answer", text: "CubeCraft est recommandé à partir de 6 ans. Les cubes contiennent des aimants puissants et sont certifiés CE. Pour les enfants de 3 à 5 ans, nous recommandons de jouer sous surveillance parentale." } },
        { "@type": "Question", name: "Les aimants CubeCraft sont-ils dangereux ?", acceptedAnswer: { "@type": "Answer", text: "Non. Nos cubes sont certifiés CE et conformes aux normes européennes EN 71. Les aimants sont encapsulés dans une coque ABS résistante — impossible de les extraire. C'est aussi sûr qu'un LEGO." } },
        { "@type": "Question", name: "Combien de cubes faut-il pour bien jouer ?", acceptedAnswer: { "@type": "Answer", text: "Le pack 64 pièces est parfait pour débuter. Pour des constructions plus ambitieuses ou pour jouer à plusieurs, nous recommandons le pack 128 ou le Pack Famille 256." } },
        { "@type": "Question", name: "Est-ce que les cubes magnétiques CubeCraft tiennent bien ensemble ?", acceptedAnswer: { "@type": "Answer", text: "Oui. Chaque cube contient des aimants néodyme de grade N52 — les plus puissants du marché. Les constructions tiennent solidement, même en hauteur." } },
        { "@type": "Question", name: "Mon enfant aime Minecraft, est-ce qu'il va aimer CubeCraft ?", acceptedAnswer: { "@type": "Answer", text: "C'est exactement pour ça qu'on a créé CubeCraft. Les cubes reprennent le concept de construction par blocs de Minecraft, mais dans le monde réel. 95% des enfants fans de Minecraft adorent CubeCraft." } },
        { "@type": "Question", name: "Quel est le délai de livraison CubeCraft ?", acceptedAnswer: { "@type": "Answer", text: "Livraison en 4-5 jours ouvrés en France métropolitaine par Colissimo. Livraison en Europe sous 7-10 jours." } },
        { "@type": "Question", name: "Quelle est la politique de retour CubeCraft ?", acceptedAnswer: { "@type": "Answer", text: "Garantie Créativité ou Remboursé 30 jours. Renvoyez le produit dans son état d'origine, nous vous remboursons intégralement. Aucune question posée." } },
        { "@type": "Question", name: "CubeCraft est-il un bon cadeau d'anniversaire ou de Noël pour enfant ?", acceptedAnswer: { "@type": "Answer", text: "Oui, c'est le cadeau idéal pour les enfants de 6 à 14 ans. Emballage premium inclus. Effet waouh garanti à l'ouverture. Et contrairement aux jouets classiques, celui-ci ne finit pas au fond d'un placard." } },
      ],
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
      "@type": "ItemList",
      name: "Packs CubeCraft",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Product",
            name: "CubeCraft 64 pièces",
            description: "64 cubes magnétiques premium. Pack de démarrage. Aimants néodyme N52. Certifié CE & EN 71.",
            image: absoluteImageUrl(SITE_IMAGES.heroPack.src),
            brand: { "@type": "Brand", name: "CubeCraft" },
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: "39.90",
              availability: "https://schema.org/InStock",
              url: "https://cubecrafte.com/commander",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "2847",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Product",
            name: "CubeCraft 128 pièces",
            description: "128 cubes magnétiques premium. Le best-seller. Aimants néodyme N52. Certifié CE & EN 71.",
            image: absoluteImageUrl(SITE_IMAGES.minecraftCastle.src),
            brand: { "@type": "Brand", name: "CubeCraft" },
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: "69.90",
              availability: "https://schema.org/InStock",
              url: "https://cubecrafte.com/commander",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "2847",
            },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Product",
            name: "CubeCraft Pack Famille 256 pièces",
            description: "256 cubes magnétiques premium. Idéal pour toute la famille. Aimants néodyme N52. Certifié CE & EN 71.",
            image: absoluteImageUrl(SITE_IMAGES.childrenPlaying.src),
            brand: { "@type": "Brand", name: "CubeCraft" },
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              price: "119.90",
              availability: "https://schema.org/InStock",
              url: "https://cubecrafte.com/commander",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "2847",
            },
          },
        },
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
      <Problem />
      <Benefits />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <Pricing />
      <Guarantee />
      <LatestArticles />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
