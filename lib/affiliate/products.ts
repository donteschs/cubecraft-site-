/**
 * Données produits affiliés.
 *
 * Source unique des produits affiliés affichés dans les articles, les blocs
 * « Notre sélection » et les pages /selection/[slug].
 *
 * Pour ajouter un produit : copier un bloc, remplir `affiliateUrl` (lien
 * affilié réel) et `image` (URL externe — Amazon, etc. — ou chemin local
 * sous /public/images/affiliate/). La carte gère une image manquante.
 */
export type AffiliateProduct = {
  id: string;
  title: string;
  description: string;
  image: string; // URL externe (https) ou chemin local "/images/affiliate/..."
  affiliateUrl: string; // lien affilié externe (à remplacer par le vrai)
  category: AffiliateCategory;
  tags: string[];
  price?: string; // ex "29,90 €" — purement indicatif, optionnel
  merchant?: string; // ex "Amazon"
  asin?: string;
};

export type AffiliateCategory =
  | "construction"
  | "stem"
  | "creatif"
  | "montessori"
  | "famille"
  | "accessoires";

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: "sac-rangement-jouets-tapis",
    title: "Boîte de rangement compartimentée",
    description:
      "Une boîte transparente avec compartiments pour trier les cubes, accessoires et petites pièces après le jeu.",
    image: "https://m.media-amazon.com/images/I/41oLdWhbYWL._SL500_.jpg",
    affiliateUrl: "https://www.amazon.fr/dp/B0CQ7D6PJ6?tag=issakanoute-21",
    category: "accessoires",
    tags: ["rangement", "boîte", "accessoire", "famille"],
    price: "21,99 €",
    merchant: "Amazon",
    asin: "B0CQ7D6PJ6",
  },
  {
    id: "boite-rangement-jouets",
    title: "Étagère de rangement enfant SONGMICS",
    description:
      "Une étagère basse avec bacs amovibles pour garder les sets CubeCraft et les livres créatifs à portée d'enfant.",
    image: "https://m.media-amazon.com/images/I/51kiIP5Y6BL._SL500_.jpg",
    affiliateUrl: "https://www.amazon.fr/dp/B07QN2T62H?tag=issakanoute-21",
    category: "accessoires",
    tags: ["rangement", "étagère", "organisation", "accessoire"],
    price: "24,99 €",
    merchant: "Amazon",
    asin: "B07QN2T62H",
  },
  {
    id: "time-timer-visuel-enfant",
    title: "TimeBuddy minuteur visuel enfant",
    description:
      "Un minuteur visuel aide à instaurer une routine : temps d'écran limité, puis temps de construction CubeCraft.",
    image: "https://m.media-amazon.com/images/I/41jwYFMZlcL._SL500_.jpg",
    affiliateUrl: "https://www.amazon.fr/dp/B0D97SZ71D?tag=issakanoute-21",
    category: "accessoires",
    tags: ["anti-écran", "routine", "temps", "famille"],
    price: "17,99 €",
    merchant: "Amazon",
    asin: "B0D97SZ71D",
  },
  {
    id: "coffre-rangement-jouets",
    title: "Coffre à jouets bois HOOBRO",
    description:
      "Un coffre bas pour ranger les grands packs, les livrets de modèles et les créations en cours sans tout mélanger.",
    image: "https://m.media-amazon.com/images/I/51gVwAuzc9L._SL500_.jpg",
    affiliateUrl: "https://www.amazon.fr/dp/B083GN2RT9?tag=issakanoute-21",
    category: "accessoires",
    tags: ["rangement", "coffre", "famille", "accessoire"],
    price: "64,99 €",
    merchant: "Amazon",
    asin: "B083GN2RT9",
  },
  {
    id: "banc-rangement-jouets",
    title: "Banc coffre de rangement blanc",
    description:
      "Un banc coffre compact pour créer un coin construction propre dans une chambre ou une salle de jeux.",
    image: "https://m.media-amazon.com/images/I/31vkk+cR6JL._SL500_.jpg",
    affiliateUrl: "https://www.amazon.fr/dp/B0FD3B7KBP?tag=issakanoute-21",
    category: "accessoires",
    tags: ["rangement", "banc", "coffre", "accessoire"],
    price: "79,99 €",
    merchant: "Amazon",
    asin: "B0FD3B7KBP",
  },
];

const BY_ID = new Map(AFFILIATE_PRODUCTS.map((p) => [p.id, p]));

export function getAffiliateProductsByIds(ids: string[]): AffiliateProduct[] {
  return ids
    .map((id) => BY_ID.get(id))
    .filter((p): p is AffiliateProduct => Boolean(p));
}

export function getAffiliateProductsByCategory(
  category: AffiliateCategory,
): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter((p) => p.category === category);
}

export function getAllAffiliateProducts(): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS;
}
