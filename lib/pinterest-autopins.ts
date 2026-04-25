import { Buffer } from "node:buffer";

const FALLBACK_IMAGES = [
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470443/Whisk_092747553965cd5ae3e4e996c106e938dr_epy1a1.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470441/Whisk_959615b5dd14fddb8d34afd06bad4e98dr_je5m1g.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470440/Whisk_73d2bf4464e743e914844e1e170ea0ffdr_jaqbl6.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470438/Whisk_55d0052c7faf764a3484e82a295cc64bdr_zlvgre.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470437/Whisk_21fe8406a0537f38ec8479f261076368dr_h4ejs8.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470435/Whisk_348f1f1fdc5e111b0b543df5deb40eb6dr_u0kses.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470434/Whisk_19a009ed6a33513908946a206c5af180dr_zxpc9o.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470432/Whisk_893db59d3b2dbaca07e4fbe657bea124dr_mii58s.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470431/Whisk_934a1abfce12b66b7404f8e7f83b68b2dr_wsazyx.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470430/Whisk_966a581f388ad91bdbe4786c5fae6f8fdr_lui7or.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470428/Whisk_4416eb927c0020d8a5046ad544d19c74dr_pwvmw7.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470427/Whisk_e5f6cee57b036e28a5c45f568462a196dr_mwu2dx.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470425/Whisk_fcdbf0d68f55849b74a4a13590ddb054dr_kdhvdt.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470424/Whisk_ee15293a3c4e9c38a3d426b143a45849dr_g39uvr.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776470423/Whisk_c2260f93dc76429982949638a47bff7edr_ms8rot.png",
  "https://res.cloudinary.com/druvbvnob/image/upload/v1776440369/Whisk_5e8f8a6c8e94bfc94584807d324df370dr-removebg-preview_johci7.png",
];

const CLOUDINARY_CLOUD_NAME = "druvbvnob";
const CLOUDINARY_PINS_FOLDER = "Pins";
const CLOUDINARY_SEARCH_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

type CloudinaryAsset = {
  asset_id?: string;
  public_id?: string;
  resource_type: "image" | "video" | string;
  secure_url?: string;
  version?: number | string;
  created_at?: string;
};

type PinTemplate = { title: string; content: string };

const TEMPLATES: PinTemplate[] = [
  {
    title: "Jouet anti-écran — Cubes magnétiques CubeCraft",
    content:
      "Il construit pendant des heures sans toucher à sa tablette 🧲\n\nLes cubes magnétiques CubeCraft remplacent les écrans par la créativité. Certifiés CE & EN 71.\n\n✨ Offre lancement -30%\n\n#joueteducatif #antiécran #parentalité #montessori #construction",
  },
  {
    title: "Le Minecraft qu'ils peuvent toucher — CubeCraft",
    content:
      "Ton enfant adore Minecraft ? Offre-lui le vrai 🎮🧱\n\nAvec CubeCraft, il construit ses créations en 3D avec de vrais cubes magnétiques.\n\n🔥 -30% offre de lancement\n\n#minecraft #jouetenfant #construction #gaming #cadeau",
  },
  {
    title: "Développe la créativité de ton enfant — CubeCraft",
    content:
      "La science dit que construire développe l'intelligence spatiale et la logique 🧠\n\nCubeCraft : 64 cubes magnétiques premium pour enfants de 6 à 14 ans.\n\n#STEM #joueteducatif #montessori #développementenfant",
  },
  {
    title: "Le cadeau parfait pour les enfants — CubeCraft",
    content:
      "Fatigué des jouets qu'on oublie après 5 minutes ? 🎁\n\nLes cubes magnétiques CubeCraft occupent les enfants pendant des heures.\n\n💚 Livraison rapide · Certifié CE\n\n#cadeauenfant #idéecadeau #jouetenfant #noel #anniversaire",
  },
  {
    title: "Construction magnétique 3D — CubeCraft pour enfants",
    content:
      "Châteaux, robots, animaux, maisons... Les possibilités sont infinies ! 😍\n\n64 cubes magnétiques N52 ultra-résistants. Certifié CE & EN 71.\n\n⚡ Aimants 3x plus puissants que la concurrence\n\n#constructionmagnétique #jouetcréatif #STEM #jouet",
  },
  {
    title: "Alternative aux écrans — CubeCraft jouet éducatif",
    content:
      "Les enfants passent en moyenne 5h/jour sur les écrans. CubeCraft change ça 📱❌\n\nUn jouet qui captive autant qu'une tablette, mais qui développe de vraies compétences.\n\n🌱 Pour enfants de 6 à 14 ans\n\n#antiécran #parentalité #joueteducatif #montessori",
  },
  {
    title: "Pack famille 256 pièces — CubeCraft magnétique",
    content:
      "Quand toute la famille construit ensemble 👨‍👩‍👧‍👦✨\n\nLe Pack Famille 256 pièces CubeCraft : des heures de jeu partagé.\n\n🏠 Idéal pour la maison · Certifié CE & EN 71\n\n#jeuxenfamille #jouetenfant #constructionmagnétique #cadeau",
  },
  {
    title: "Top 10 jeux anti-écran qui captivent vraiment les enfants 🧱",
    content:
      "Votre enfant passe 6h/jour sur les écrans ? Ces 10 jeux rivalisent avec Minecraft — sans tablette 📱❌\n\nLe #1 fait oublier la console pendant des heures.\n\n👉 Liste complète sur cubecrafte.com/blog\n\n#antiécran #jouetenfant #parentalité #minecraft #joueteducatif",
  },
  {
    title: "Cadeau garçon 8 ans fan de Minecraft — notre top 5 🎁",
    content:
      "Fan de Minecraft mais trop d'écrans ? Ce cadeau reproduit la même sensation en vrai 🧲\n\n2847 parents satisfaits · Note 4,9/5 · Livraison rapide\n\n👉 cubecrafte.com/blog/meilleur-cadeau-garcon-8-ans-minecraft\n\n#cadeauenfant #minecraft #jouetenfant #anniversaire #noel",
  },
  {
    title: "Meilleur jouet STEM 2026 — top 7 pour enfants 6-14 ans 🔬",
    content:
      "Ils apprennent géométrie, logique et physique sans s'en rendre compte 🧠\n\nNotre sélection des meilleurs jouets STEM par tranche d'âge.\n\n👉 cubecrafte.com/blog/jouet-stem-enfant-2026\n\n#jouetSTEM #éducation #parentalité #montessori #joueteducatif",
  },
  {
    title: "Jouet Montessori 8 ans — les vrais critères ✅",
    content:
      "Un vrai jouet Montessori : ouvert, concret, autonome, progressif.\n\nVoici lesquels respectent vraiment ces critères à 8 ans 🌱\n\n👉 cubecrafte.com/blog/jouet-montessori-8-ans-creativite\n\n#montessori #joueteducatif #parentalité #développementenfant",
  },
  {
    title: "Magformers vs CubeCraft — lequel choisir en 2026 ? ⚡",
    content:
      "Prix, aimants, certifications, âge recommandé — comparatif complet 👇\n\nSpoiler : pour les 8-12 ans, le choix est clair.\n\n👉 cubecrafte.com/blog/magformers-vs-cubecraft-jouet-magnetique\n\n#magformers #jouetmagnétique #constructionmagnétique #jouetenfant",
  },
];

export type PinMediaItem = {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
};

export type Pin = {
  mediaItem: PinMediaItem;
  imageUrl: string;
  title: string;
  content: string;
};

function getCloudinaryVideoThumbnail(asset: CloudinaryAsset): string | undefined {
  if (asset.resource_type !== "video" || !asset.public_id || !asset.version) {
    return undefined;
  }

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_jpg,q_auto,so_2/v${asset.version}/${asset.public_id}.jpg`;
}

async function getCloudinaryFolderMediaItems(): Promise<PinMediaItem[]> {
  if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return [];
  }

  try {
    const auth = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64");
    const res = await fetch(CLOUDINARY_SEARCH_API, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        expression: `asset_folder=${CLOUDINARY_PINS_FOLDER}`,
        max_results: 100,
        sort_by: [{ created_at: "desc" }],
      }),
    });

    if (!res.ok) {
      throw new Error(`cloudinary folder request failed: ${res.status}`);
    }

    const data = (await res.json()) as { resources?: CloudinaryAsset[] };
    const items =
      data.resources?.reduce<PinMediaItem[]>((acc, asset) => {
        const original = asset.secure_url;
        if (!original) {
          return acc;
        }

        if (asset.resource_type === "video") {
          acc.push({
            type: "video",
            url: original,
            thumbnail: getCloudinaryVideoThumbnail(asset),
          });
          return acc;
        }

        if (asset.resource_type === "image") {
          acc.push({
            type: "image",
            url: original,
          });
        }

        return acc;
      }, []) ?? [];

    if (items.length > 0) {
      return items;
    }
  } catch (error) {
    console.error("[pinterest-autopins] failed to load Pins folder assets", error);
  }

  return [];
}

export async function getPinForSlot(slot: number): Promise<Pin> {
  const cloudinaryMediaItems = await getCloudinaryFolderMediaItems();
  const mediaItems =
    cloudinaryMediaItems.length > 0
      ? cloudinaryMediaItems
      : FALLBACK_IMAGES.map((url) => ({ type: "image" as const, url }));
  const imgIndex = slot % mediaItems.length;
  const tplIndex = slot % TEMPLATES.length;
  const mediaItem = mediaItems[imgIndex]!;

  return {
    mediaItem,
    imageUrl: mediaItem.type === "image" ? mediaItem.url : mediaItem.thumbnail || mediaItem.url,
    title: TEMPLATES[tplIndex]!.title,
    content: TEMPLATES[tplIndex]!.content,
  };
}
