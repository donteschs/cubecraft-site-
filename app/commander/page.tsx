import type { Metadata } from "next";
import { getProduct } from "lib/shopify";
import { ProductUI } from "./product-ui";

export const metadata: Metadata = {
  title: "Cubes Magnétiques CubeCraft — Pack 100, 200 & 400 pièces",
  description:
    "Commandez les cubes magnétiques CubeCraft. 100, 200 ou 400 pièces. Certifié CE & EN 71, aimants N52. Offre de lancement -30%. Livraison gratuite, garantie 30 jours.",
  openGraph: {
    title: "Cubes Magnétiques CubeCraft — Le Minecraft qu'ils peuvent toucher",
    description: "Pack 100 à 39,90 € (au lieu de 59,90 €). Certifié CE, N52. Expédié sous 24h.",
    type: "website",
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

  return <ProductUI variantIds={variantIds} checkoutUrls={checkoutUrls} upsellVariantId={upsellVariantId} />;
}
