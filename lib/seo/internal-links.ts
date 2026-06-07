export type InternalLink = {
  label: string;
  href: string;
  description: string;
  keywords: string[];
};

export const IMPORTANT_PRODUCTS: InternalLink[] = [
  {
    label: "CubeCraft 100 pièces",
    href: "/product/cubecraft-100-pieces",
    description: "le set découverte pour commencer la construction magnétique",
    keywords: ["6 ans", "7 ans", "8 ans", "minecraft", "debut", "anti-ecran"],
  },
  {
    label: "CubeCraft 200 pièces",
    href: "/product/cubecraft-200-pieces",
    description: "le format évolutif pour des constructions plus ambitieuses",
    keywords: ["8 ans", "10 ans", "stem", "magnetique", "construction"],
  },
  {
    label: "Pack Famille 256 pièces",
    href: "/product/cubecraft-pack-famille-256-pieces",
    description: "le grand pack à partager entre frères, soeurs et parents",
    keywords: ["noel", "famille", "cadeau", "fratrie", "anniversaire"],
  },
];

export const IMPORTANT_CATEGORIES: InternalLink[] = [
  {
    label: "boutique CubeCraft",
    href: "/search",
    description: "tous les jouets créatifs et éducatifs disponibles",
    keywords: ["boutique", "produit", "jouet", "selection"],
  },
  {
    label: "meilleurs jouets de construction magnétique",
    href: "/selection/meilleurs-jouets-construction-magnetique",
    description: "une sélection dédiée aux jeux aimantés et aux cubes 3D",
    keywords: [
      "magnetique",
      "construction",
      "cube",
      "minecraft",
      "magformers",
      "magna",
    ],
  },
  {
    label: "meilleurs jouets STEM",
    href: "/selection/meilleurs-jouets-stem-enfant",
    description: "des idées pour développer logique, sciences et créativité",
    keywords: ["stem", "science", "robot", "educatif", "intelligence"],
  },
  {
    label: "idées cadeaux anti-écran",
    href: "/selection/idees-cadeaux-anti-ecran",
    description: "des cadeaux qui occupent les enfants loin des écrans",
    keywords: ["anti-ecran", "cadeau", "anniversaire", "noel", "ecran"],
  },
  {
    label: "jouets Montessori",
    href: "/selection/jouets-montessori-tout-petits",
    description: "des jeux simples, autonomes et manipulables",
    keywords: ["montessori", "autonomie", "creativite"],
  },
  {
    label: "jeux de société en famille",
    href: "/selection/jeux-de-societe-famille",
    description: "des activités partagées pour remplacer les écrans",
    keywords: ["famille", "societe", "anti-ecran"],
  },
];

export const PRIORITY_ARTICLES: InternalLink[] = [
  {
    label: "alternative à Minecraft pour enfant",
    href: "/blog/alternative-minecraft-enfant",
    description: "comment passer du jeu vidéo à la construction réelle",
    keywords: ["minecraft", "cube", "gaming"],
  },
  {
    label: "jeu de construction magnétique enfant 8 ans",
    href: "/blog/jeu-construction-magnetique-enfant-8-ans",
    description: "le guide pour choisir un jeu magnétique à 8 ans",
    keywords: ["8 ans", "magnetique", "construction"],
  },
  {
    label: "meilleur jouet STEM enfant 2026",
    href: "/blog/jouet-stem-enfant-2026",
    description: "les meilleurs jouets pour développer logique et créativité",
    keywords: ["stem", "science", "educatif"],
  },
  {
    label: "limiter le temps d'écran sans crise",
    href: "/blog/limiter-temps-ecran-enfant-sans-crise",
    description: "une méthode douce pour remplacer les écrans",
    keywords: ["anti-ecran", "ecran", "famille"],
  },
  {
    label: "cadeau anniversaire garçon 8 ans",
    href: "/blog/cadeau-anniversaire-garcon-8-ans",
    description: "des idées cadeaux qui durent plus que trois jours",
    keywords: ["cadeau", "anniversaire", "8 ans"],
  },
  {
    label: "Magformers vs CubeCraft",
    href: "/blog/magformers-vs-cubecraft-jouet-magnetique",
    description: "le comparatif pour choisir le bon jouet magnétique",
    keywords: ["magformers", "comparatif", "magnetique"],
  },
];

const DEFAULT_AFFILIATE_IDS = [
  "sac-rangement-jouets-tapis",
  "time-timer-visuel-enfant",
  "boite-rangement-jouets",
];

const TOPIC_AFFILIATE_IDS: Record<string, string[]> = {
  minecraft: [
    "coffre-rangement-jouets",
    "sac-rangement-jouets-tapis",
    "boite-rangement-jouets",
  ],
  magnetique: [
    "sac-rangement-jouets-tapis",
    "boite-rangement-jouets",
    "coffre-rangement-jouets",
  ],
  stem: [
    "time-timer-visuel-enfant",
    "boite-rangement-jouets",
    "coffre-rangement-jouets",
  ],
  montessori: [
    "boite-rangement-jouets",
    "time-timer-visuel-enfant",
    "coffre-rangement-jouets",
  ],
  famille: [
    "sac-rangement-jouets-tapis",
    "time-timer-visuel-enfant",
    "boite-rangement-jouets",
  ],
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function scoreLink(link: InternalLink, topic: string) {
  return link.keywords.reduce(
    (score, keyword) => score + (topic.includes(normalize(keyword)) ? 1 : 0),
    0,
  );
}

function uniqueLinks(
  links: Array<InternalLink | undefined>,
  currentHref?: string,
) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (!link) return false;
    if (link.href === currentHref || seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  }) as InternalLink[];
}

export function getBlogInternalLinks(
  slug: string,
  title: string,
): InternalLink[] {
  const topic = normalize(`${slug} ${title}`);
  const productLinks = [...IMPORTANT_PRODUCTS].sort(
    (a, b) => scoreLink(b, topic) - scoreLink(a, topic),
  );
  const categoryLinks = [...IMPORTANT_CATEGORIES].sort(
    (a, b) => scoreLink(b, topic) - scoreLink(a, topic),
  );

  return uniqueLinks([productLinks[0], categoryLinks[0]]).slice(0, 2);
}

export function getBlogAffiliateProductIds(
  slug: string,
  title: string,
): string[] {
  const topic = normalize(`${slug} ${title}`);
  const match = Object.entries(TOPIC_AFFILIATE_IDS).find(([keyword]) =>
    topic.includes(keyword),
  );

  if (match) return match[1];
  if (topic.includes("ecran") || topic.includes("cadeau")) {
    return [
      "time-timer-visuel-enfant",
      "sac-rangement-jouets-tapis",
      "boite-rangement-jouets",
    ];
  }
  return DEFAULT_AFFILIATE_IDS;
}

export function getProductArticleLinks(handle: string): InternalLink[] {
  const topic = normalize(handle);
  const links = [...PRIORITY_ARTICLES].sort(
    (a, b) => scoreLink(b, topic) - scoreLink(a, topic),
  );

  if (handle.includes("famille") || handle.includes("256")) {
    return uniqueLinks([
      PRIORITY_ARTICLES.find((a) => a.href.includes("limiter-temps-ecran"))!,
      PRIORITY_ARTICLES.find((a) => a.href.includes("cadeau-anniversaire"))!,
      PRIORITY_ARTICLES.find((a) => a.href.includes("jouet-stem"))!,
    ]);
  }

  return uniqueLinks(links).slice(0, 4);
}

export function getSimilarProductLinks(handle: string): InternalLink[] {
  return IMPORTANT_PRODUCTS.filter((product) => !product.href.endsWith(handle));
}

export function getPriorityProductLinks(): InternalLink[] {
  return IMPORTANT_PRODUCTS;
}
