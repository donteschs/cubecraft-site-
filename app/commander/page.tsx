import type { Metadata } from "next";
import { getProduct } from "lib/shopify";
import { COMMANDER_SEO_IMAGES, absoluteImageUrl, absoluteImageUrls } from "lib/site-images";
import { ProductUI } from "./product-ui";
import { JsonLd } from "components/json-ld";
import Footer from "components/layout/footer";

export const metadata: Metadata = {
  title: "Cubes Magnétiques CubeCraft — Pack 100, 200 & 400 pièces",
  description:
    "Commandez les cubes magnétiques CubeCraft. 100, 200 ou 400 pièces. Certifié CE & EN 71, aimants N52. Offre de lancement -30%. Livraison gratuite, garantie 30 jours.",
  openGraph: {
    title: "Cubes Magnétiques CubeCraft — Le Minecraft qu'ils peuvent toucher",
    description: "Pack 100 à 39,90 € (au lieu de 59,90 €). Certifié CE, N52. Livraison 4-5 jours.",
    type: "website",
    images: absoluteImageUrls(COMMANDER_SEO_IMAGES),
  },
  twitter: {
    card: "summary_large_image",
    title: "Cubes Magnétiques CubeCraft — Pack 100, 200 & 400 pièces",
    description:
      "Commandez les cubes magnétiques CubeCraft. 100, 200 ou 400 pièces. Certifié CE & EN 71, aimants N52.",
    images: [absoluteImageUrl(COMMANDER_SEO_IMAGES[0]!)],
  },
};

export default async function CommanderPage() {
  const [p100, p200, p400, pUpsell] = await Promise.all([
    getProduct("cubecraft-100-pieces"),
    getProduct("cubecraft-200-pieces"),
    getProduct("cubecraft-pack-famille-256-pieces"),
    getProduct("jeu-magnetique-pierres-strategie"),
  ]);

  // Shopify variant GIDs — used by addItemAndCheckout server action
  const variantIds: Record<string, string | undefined> = {
    "100": p100?.variants[0]?.id,
    "200": p200?.variants[0]?.id,
    "400": p400?.variants[0]?.id,
  };

  // Fallback URLs in case a variant ID is missing
  const checkoutUrls: Record<string, string> = {
    "100": "https://luxwatch-8683.myshopify.com/products/cubecraft-100-pieces",
    "200": "https://luxwatch-8683.myshopify.com/products/cubecraft-200-pieces",
    "400": "https://luxwatch-8683.myshopify.com/products/cubecraft-pack-famille-256-pieces",
  };

  const upsellVariantId = pUpsell?.variants[0]?.id;

  const shippingDetails = {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: "0",
      currency: "EUR",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 2,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 3,
        maxValue: 5,
        unitCode: "DAY",
      },
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "FR",
    },
  };

  const returnPolicy = {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "FR",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 30,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };

  const productImage = absoluteImageUrl(COMMANDER_SEO_IMAGES[0]!);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Cubes Magnétiques CubeCraft",
    description:
      "Cubes magnétiques inspirés de Minecraft avec aimants néodyme N52. Construction 3D libre, certifiés CE & EN 71. Pour les enfants de 6 à 14 ans.",
    image: productImage,
    brand: {
      "@type": "Brand",
      name: "CubeCraft",
    },
    url: "https://cubecrafte.com/commander",
    offers: [
      {
        "@type": "Offer",
        name: "CubeCraft 100 pièces",
        price: "39.90",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://cubecrafte.com/commander",
        itemCondition: "https://schema.org/NewCondition",
        image: productImage,
        shippingDetails,
        hasMerchantReturnPolicy: returnPolicy,
      },
      {
        "@type": "Offer",
        name: "CubeCraft 200 pièces",
        price: "69.90",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://cubecrafte.com/commander",
        itemCondition: "https://schema.org/NewCondition",
        image: productImage,
        shippingDetails,
        hasMerchantReturnPolicy: returnPolicy,
      },
      {
        "@type": "Offer",
        name: "Pack Famille 400 pièces",
        price: "119.90",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://cubecrafte.com/commander",
        itemCondition: "https://schema.org/NewCondition",
        image: productImage,
        shippingDetails,
        hasMerchantReturnPolicy: returnPolicy,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "À partir de quel âge peut-on utiliser les cubes CubeCraft ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les cubes CubeCraft sont recommandés à partir de 6 ans. La tranche idéale est 8-12 ans. Ils contiennent des aimants puissants — déconseillés aux enfants de moins de 3 ans.",
        },
      },
      {
        "@type": "Question",
        name: "Les aimants sont-ils dangereux ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les aimants sont encapsulés dans chaque cube en ABS solide et ne peuvent pas être retirés. Les cubes CubeCraft sont certifiés CE et EN 71, les normes européennes de sécurité pour les jouets. Ils sont sûrs pour les enfants de 6 ans et plus.",
        },
      },
      {
        "@type": "Question",
        name: "Combien de pièces faut-il pour bien jouer ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le pack 100 pièces est idéal pour commencer — il permet des heures de construction variée. Le pack 200 pièces convient aux enfants ambitieux qui veulent reproduire des structures Minecraft complexes. Le Pack Famille 400 pièces est parfait pour jouer à plusieurs.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la différence avec les LEGO Minecraft ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les LEGO Minecraft suivent des instructions précises pour construire un set unique. Les cubes CubeCraft n'ont pas de notice : chaque session est libre et différente, comme dans le vrai jeu Minecraft. L'assemblage est aussi magnétique (instantané) plutôt que manuel.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les délais de livraison ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La livraison est offerte en France. Les commandes sont expédiées en 1-2 jours ouvrés et livraison en 3-5 jours. Retours acceptés sous 30 jours.",
        },
      },
      {
        "@type": "Question",
        name: "Les cubes sont-ils compatibles avec d'autres marques de cubes magnétiques ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les cubes CubeCraft utilisent des aimants néodyme N52 standard. Ils sont compatibles avec la plupart des cubes magnétiques du marché qui respectent la même taille (2 cm). En revanche, ils ne sont pas compatibles avec les Magformers (formes plates).",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <ProductUI variantIds={variantIds} checkoutUrls={checkoutUrls} upsellVariantId={upsellVariantId} />
      <Footer />
    </>
  );
}
