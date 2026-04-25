import { baseUrl } from "lib/utils";

export const SITE_IMAGES = {
  heroPack: {
    src: "/images/cubecraft-cubes-magnetiques-pack-principal.png",
    alt: "CubeCraft pack principal de cubes magnetiques pour enfant",
  },
  detailColors: {
    src: "/images/cubecraft-cubes-magnetiques-detail-couleurs.png",
    alt: "Gros plan CubeCraft sur les cubes magnetiques aux textures Minecraft",
  },
  creations3d: {
    src: "/images/cubecraft-cubes-magnetiques-creations-3d.png",
    alt: "Creations 3D realisees avec les cubes magnetiques CubeCraft",
  },
  topView: {
    src: "/images/cubecraft-cubes-magnetiques-vue-dessus.png",
    alt: "Vue de dessus des cubes magnetiques CubeCraft",
  },
  giftBox: {
    src: "/images/cubecraft-coffret-cadeau-cubes-magnetiques.png",
    alt: "Coffret cadeau CubeCraft pour cubes magnetiques enfant",
  },
  minecraftCastle: {
    src: "/images/cubecraft-chateau-minecraft-cubes-magnetiques.png",
    alt: "Chateau Minecraft construit avec les cubes magnetiques CubeCraft",
  },
  childrenPlaying: {
    src: "/images/cubecraft-enfants-jeu-construction-magnetique.png",
    alt: "Enfants qui jouent avec les cubes magnetiques CubeCraft",
  },
  childPlaying: {
    src: "/images/cubecraft-enfant-joue-cubes-magnetiques.png",
    alt: "Enfant qui joue avec les cubes magnetiques CubeCraft",
  },
  tower: {
    src: "/images/cubecraft-tour-cubes-magnetiques.png",
    alt: "Tour construite avec les cubes magnetiques CubeCraft",
  },
} as const;

export const HOME_SEO_IMAGES = [
  SITE_IMAGES.heroPack.src,
  SITE_IMAGES.minecraftCastle.src,
  SITE_IMAGES.childrenPlaying.src,
];

export const COMMANDER_SEO_IMAGES = [
  SITE_IMAGES.heroPack.src,
  SITE_IMAGES.detailColors.src,
  SITE_IMAGES.creations3d.src,
  SITE_IMAGES.minecraftCastle.src,
];

export const BLOG_DEFAULT_IMAGE = SITE_IMAGES.minecraftCastle.src;

export function absoluteImageUrl(src: string) {
  return new URL(src, baseUrl).toString();
}

export function absoluteImageUrls(srcs: string[]) {
  return srcs.map(absoluteImageUrl);
}
