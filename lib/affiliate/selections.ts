import type { AffiliateCategory } from "lib/affiliate/products";

/**
 * Pages « sélection shopping » → /selection/[slug].
 *
 * Source unique : ajouter une entrée ici crée automatiquement une page SEO
 * complète (intro, grille affiliée, conseils d'achat, FAQ, liens internes).
 */
export type SelectionPage = {
  slug: string;
  title: string; // H1 + base du <title>
  metaDescription: string;
  intro: string;
  /** Produits affiliés affichés (IDs de lib/affiliate/products.ts) */
  productIds?: string[];
  /** Ou toute une catégorie si productIds absent */
  category?: AffiliateCategory;
  buyingTips: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  relatedArticles: { label: string; href: string }[];
};

export const SELECTIONS: SelectionPage[] = [
  {
    slug: "meilleurs-jouets-construction-magnetique",
    title: "Les meilleurs jouets de construction magnétique",
    metaDescription:
      "Notre sélection des meilleurs jeux de construction magnétique pour enfant : tuiles, cubes et aimants pour construire en 3D. Comparatif et conseils d'achat 2026.",
    intro:
      "La construction magnétique est l'une des activités les plus complètes pour les enfants : créativité, géométrie, motricité fine. Voici notre sélection des meilleures références, testées et approuvées.",
    productIds: [
      "sac-rangement-jouets-tapis",
      "boite-rangement-jouets",
      "coffre-rangement-jouets",
    ],
    buyingTips: [
      {
        title: "Vérifiez la puissance des aimants",
        text: "Des aimants trop faibles découragent l'enfant : les constructions s'effondrent. Privilégiez les aimants solides et bien encapsulés.",
      },
      {
        title: "Comptez le nombre de pièces",
        text: "Pour débuter, 50 à 100 pièces suffisent. Au-delà de 8 ans, visez 150+ pour des constructions ambitieuses.",
      },
      {
        title: "Exigez la certification CE & EN 71",
        text: "C'est la garantie que les aimants et matériaux respectent les normes de sécurité européennes.",
      },
    ],
    faq: [
      {
        q: "À partir de quel âge ?",
        a: "Dès 3 ans pour les grosses tuiles, dès 6 ans pour les petits cubes aimantés.",
      },
      {
        q: "Les aimants sont-ils dangereux ?",
        a: "Non, s'ils sont certifiés EN 71 et encapsulés dans une coque solide — impossibles à extraire.",
      },
    ],
    relatedArticles: [
      {
        label: "Guide : bien choisir un jeu de construction",
        href: "/blog/jeux-construction-enfant",
      },
      {
        label: "Alternative Minecraft pour enfant",
        href: "/blog/alternative-minecraft-enfant",
      },
    ],
  },
  {
    slug: "meilleurs-jouets-stem-enfant",
    title: "Les meilleurs jouets STEM pour enfant",
    metaDescription:
      "Robots de codage, kits de sciences, circuits : notre sélection des meilleurs jouets STEM pour développer la logique et la curiosité des enfants.",
    intro:
      "Les jouets STEM (sciences, technologie, ingénierie, maths) apprennent en jouant. Voici nos coups de cœur pour éveiller l'esprit scientifique de votre enfant, sans écran.",
    productIds: [
      "time-timer-visuel-enfant",
      "boite-rangement-jouets",
      "coffre-rangement-jouets",
    ],
    buyingTips: [
      {
        title: "Adaptez à l'âge",
        text: "Les robots de codage conviennent dès 6 ans ; les kits de chimie plutôt dès 8 ans.",
      },
      {
        title: "Privilégiez le sans-écran",
        text: "Les meilleurs jouets STEM ne nécessitent ni tablette ni application pour fonctionner.",
      },
      {
        title: "Cherchez la rejouabilité",
        text: "Un bon kit propose des dizaines de défis ou d'expériences, pas une seule.",
      },
    ],
    faq: [
      {
        q: "STEM, ça veut dire quoi ?",
        a: "Science, Technology, Engineering, Mathematics — des jouets qui développent le raisonnement logique.",
      },
      {
        q: "Faut-il un écran ?",
        a: "Non, notre sélection privilégie les jouets STEM 100 % physiques.",
      },
    ],
    relatedArticles: [
      {
        label: "Pourquoi les jouets STEM en 2026 ?",
        href: "/blog/jouet-stem-enfant-2026",
      },
      {
        label: "Développer l'intelligence spatiale",
        href: "/blog/developpement-intelligence-spatiale",
      },
    ],
  },
  {
    slug: "idees-cadeaux-anti-ecran",
    title: "Idées cadeaux anti-écran pour enfant",
    metaDescription:
      "À court d'idées ? Notre sélection de cadeaux anti-écran qui font briller les yeux des enfants : construction, créatif, sciences, jeux de famille.",
    intro:
      "Offrir un cadeau qui éloigne des écrans tout en faisant plaisir, c'est possible. Voici nos idées préférées, par âge et par passion.",
    productIds: [
      "sac-rangement-jouets-tapis",
      "boite-rangement-jouets",
      "time-timer-visuel-enfant",
      "coffre-rangement-jouets",
    ],
    buyingTips: [
      {
        title: "Partez de sa passion",
        text: "Un enfant fan de Minecraft adorera la construction ; un curieux, un kit de sciences.",
      },
      {
        title: "Pensez durabilité",
        text: "Un bon cadeau anti-écran se rejoue des centaines de fois — il ne finit pas au placard.",
      },
    ],
    faq: [
      {
        q: "Quel budget prévoir ?",
        a: "De 20 à 60 € pour un cadeau de qualité qui dure.",
      },
      {
        q: "Et pour les fratries ?",
        a: "Privilégiez les jeux de société ou les grands packs de construction à partager.",
      },
    ],
    relatedArticles: [
      {
        label: "10 meilleurs jeux anti-écran",
        href: "/blog/10-meilleurs-jeux-anti-ecran-enfant",
      },
      {
        label: "Cadeau de Noël enfant 10 ans",
        href: "/blog/cadeau-noel-enfant-10-ans",
      },
    ],
  },
  {
    slug: "jouets-montessori-tout-petits",
    title: "Les meilleurs jouets Montessori pour tout-petits",
    metaDescription:
      "Notre sélection de jouets Montessori en bois pour les 2-6 ans : motricité fine, autonomie, éveil sensoriel. Conseils d'achat et FAQ.",
    intro:
      "La pédagogie Montessori valorise l'autonomie et le jeu libre. Voici notre sélection de jouets d'éveil en bois pour accompagner les tout-petits.",
    productIds: [
      "boite-rangement-jouets",
      "time-timer-visuel-enfant",
      "coffre-rangement-jouets",
    ],
    buyingTips: [
      {
        title: "Misez sur le bois",
        text: "Matériau naturel, durable et agréable au toucher — au cœur de l'esprit Montessori.",
      },
      {
        title: "Un jouet, un objectif",
        text: "Les meilleurs jouets Montessori isolent une compétence (tri, encastrement, couleurs).",
      },
    ],
    faq: [
      {
        q: "Dès quel âge ?",
        a: "La plupart conviennent dès 18 mois à 2 ans, sous surveillance.",
      },
      {
        q: "Pourquoi le bois ?",
        a: "Plus durable, plus sain et plus sensoriel que le plastique.",
      },
    ],
    relatedArticles: [
      {
        label: "Le guide du jouet Montessori",
        href: "/blog/jouet-montessori-guide",
      },
    ],
  },
  {
    slug: "jeux-de-societe-famille",
    title: "Les meilleurs jeux de société en famille",
    metaDescription:
      "Notre sélection de jeux de société pour des soirées en famille sans écran : stratégie, rapidité, coopération. Dès 6 ans.",
    intro:
      "Rien ne vaut une partie en famille pour décrocher des écrans. Voici nos jeux de société favoris, simples à prendre en main et hautement rejouables.",
    productIds: [
      "sac-rangement-jouets-tapis",
      "time-timer-visuel-enfant",
      "boite-rangement-jouets",
    ],
    buyingTips: [
      {
        title: "Visez des parties courtes",
        text: "15 à 30 minutes : assez pour s'amuser, pas trop pour les plus jeunes.",
      },
      {
        title: "Vérifiez l'âge minimum",
        text: "Indiqué sur la boîte — il garantit que les règles sont à la portée de l'enfant.",
      },
    ],
    faq: [
      {
        q: "À partir de combien de joueurs ?",
        a: "La plupart se jouent dès 2 joueurs, idéal pour un duo parent-enfant.",
      },
      { q: "Quel âge minimum ?", a: "Notre sélection démarre à 6 ans." },
    ],
    relatedArticles: [
      {
        label: "Limiter le temps d'écran sans crise",
        href: "/blog/limiter-temps-ecran-enfant-sans-crise",
      },
    ],
  },
];

const BY_SLUG = new Map(SELECTIONS.map((s) => [s.slug, s]));

export function getSelection(slug: string): SelectionPage | undefined {
  return BY_SLUG.get(slug);
}

export function getAllSelections(): SelectionPage[] {
  return SELECTIONS;
}
