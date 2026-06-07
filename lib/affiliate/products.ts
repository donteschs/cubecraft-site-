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
    title: "Sac de rangement tapis de jeu",
    description:
      "Un tapis qui se referme en sac pour garder les cubes, accessoires et petites pièces au même endroit après le jeu.",
    image:
      "https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=FR&ASIN=B07YF8FQGZ&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL500_",
    affiliateUrl:
      "https://www.amazon.fr/s?k=sac+rangement+jouets+tapis+jeu&tag=issakanoute-21",
    category: "accessoires",
    tags: ["rangement", "tapis", "accessoire", "famille"],
    price: "Voir le prix",
    merchant: "Amazon",
    asin: "B07YF8FQGZ",
  },
  {
    id: "boite-rangement-jouets",
    title: "Boîte de rangement pour jouets",
    description:
      "Une boîte transparente ou compartimentée pour trier les cubes par couleur et éviter les pièces perdues.",
    image:
      "https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=FR&ASIN=B000KN4DQ4&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL500_",
    affiliateUrl:
      "https://www.amazon.fr/s?k=boite+rangement+jouets+compartiments&tag=issakanoute-21",
    category: "accessoires",
    tags: ["rangement", "boîte", "organisation", "accessoire"],
    price: "Voir le prix",
    merchant: "Amazon",
    asin: "B000KN4DQ4",
  },
  {
    id: "time-timer-visuel-enfant",
    title: "Minuteur visuel pour routine sans écran",
    description:
      "Un minuteur visuel aide à instaurer une routine : temps d'écran limité, puis temps de construction CubeCraft.",
    image:
      "https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=FR&ASIN=B000J5OFW0&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL500_",
    affiliateUrl:
      "https://www.amazon.fr/s?k=minuteur+visuel+enfant+time+timer&tag=issakanoute-21",
    category: "accessoires",
    tags: ["anti-écran", "routine", "temps", "famille"],
    price: "Voir le prix",
    merchant: "Amazon",
    asin: "B000J5OFW0",
  },
  {
    id: "livre-idees-construction-enfant",
    title: "Livre d'idées de constructions pour enfant",
    description:
      "Des idées de modèles et défis créatifs pour relancer l'inspiration quand l'enfant a déjà son set CubeCraft.",
    image:
      "https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=FR&ASIN=2324024075&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL500_",
    affiliateUrl:
      "https://www.amazon.fr/s?k=livre+id%C3%A9es+construction+enfant&tag=issakanoute-21",
    category: "accessoires",
    tags: ["inspiration", "construction", "livre", "créatif"],
    price: "Voir le prix",
    merchant: "Amazon",
    asin: "2324024075",
  },
  {
    id: "carnet-croquis-enfant",
    title: "Carnet de croquis pour plans de construction",
    description:
      "Un carnet simple pour dessiner ses maisons, tours et circuits avant de les construire avec CubeCraft.",
    image:
      "https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=FR&ASIN=B07H2C66S1&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL500_",
    affiliateUrl:
      "https://www.amazon.fr/s?k=carnet+croquis+enfant&tag=issakanoute-21",
    category: "accessoires",
    tags: ["dessin", "plan", "créatif", "stem"],
    price: "Voir le prix",
    merchant: "Amazon",
    asin: "B07H2C66S1",
  },
  {
    id: "lampe-bureau-enfant",
    title: "Lampe de bureau pour coin construction",
    description:
      "Une lumière douce et orientable pour installer un vrai coin créatif, même le soir ou les jours de pluie.",
    image:
      "https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=FR&ASIN=B08V8LQW6M&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL500_",
    affiliateUrl:
      "https://www.amazon.fr/s?k=lampe+bureau+enfant+led&tag=issakanoute-21",
    category: "accessoires",
    tags: ["bureau", "lumière", "créatif", "accessoire"],
    price: "Voir le prix",
    merchant: "Amazon",
    asin: "B08V8LQW6M",
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
