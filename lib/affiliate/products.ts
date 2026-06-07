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
    id: "magformers-classic-30",
    title: "Magformers Classic 30 pièces",
    description:
      "Tuiles magnétiques colorées pour construire en 3D. Une référence du jeu de construction magnétique, dès 3 ans.",
    image: "",
    affiliateUrl: "https://www.amazon.fr/dp/EXEMPLE?tag=cubecrafte-21",
    category: "construction",
    tags: ["magnétique", "construction", "3 ans", "best-seller"],
    price: "39,90 €",
    merchant: "Amazon",
  },
  {
    id: "lego-classic-boite-creative",
    title: "LEGO Classic — La boîte de briques créatives",
    description:
      "790 briques LEGO de toutes les couleurs pour libérer l'imagination. Un incontournable de la créativité.",
    image: "",
    affiliateUrl: "https://www.amazon.fr/dp/EXEMPLE?tag=cubecrafte-21",
    category: "creatif",
    tags: ["briques", "créatif", "4 ans", "cadeau"],
    price: "34,99 €",
    merchant: "Amazon",
  },
  {
    id: "robot-coding-mtbot",
    title: "Robot de codage pour enfant",
    description:
      "Initiation au codage sans écran : l'enfant programme les déplacements et relève des défis logiques.",
    image: "",
    affiliateUrl: "https://www.amazon.fr/dp/EXEMPLE?tag=cubecrafte-21",
    category: "stem",
    tags: ["codage", "robot", "STEM", "6 ans"],
    price: "49,90 €",
    merchant: "Amazon",
  },
  {
    id: "kit-experiences-sciences",
    title: "Coffret 30 expériences scientifiques",
    description:
      "Un mini-labo à la maison : volcan, cristaux, réactions colorées. Pour éveiller la curiosité scientifique.",
    image: "",
    affiliateUrl: "https://www.amazon.fr/dp/EXEMPLE?tag=cubecrafte-21",
    category: "stem",
    tags: ["sciences", "expériences", "STEM", "cadeau"],
    price: "29,90 €",
    merchant: "Amazon",
  },
  {
    id: "jouet-montessori-bois",
    title: "Jouet d'éveil Montessori en bois",
    description:
      "Tri des formes et encastrements en bois naturel. Développe la motricité fine des tout-petits.",
    image: "",
    affiliateUrl: "https://www.amazon.fr/dp/EXEMPLE?tag=cubecrafte-21",
    category: "montessori",
    tags: ["montessori", "bois", "éveil", "2 ans"],
    price: "24,90 €",
    merchant: "Amazon",
  },
  {
    id: "jeu-societe-famille",
    title: "Jeu de société stratégie en famille",
    description:
      "Règles simples, parties rapides : le rituel anti-écran parfait pour rassembler toute la famille.",
    image: "",
    affiliateUrl: "https://www.amazon.fr/dp/EXEMPLE?tag=cubecrafte-21",
    category: "famille",
    tags: ["jeu de société", "famille", "anti-écran", "6 ans"],
    price: "22,90 €",
    merchant: "Amazon",
  },
];

const BY_ID = new Map(AFFILIATE_PRODUCTS.map((p) => [p.id, p]));

export function getAffiliateProductsByIds(ids: string[]): AffiliateProduct[] {
  return ids.map((id) => BY_ID.get(id)).filter((p): p is AffiliateProduct => Boolean(p));
}

export function getAffiliateProductsByCategory(
  category: AffiliateCategory,
): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter((p) => p.category === category);
}

export function getAllAffiliateProducts(): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS;
}
