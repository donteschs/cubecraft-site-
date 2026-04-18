const IMAGES = [
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
];

export type Pin = { imageUrl: string; title: string; content: string };

export function getPinForSlot(slot: number): Pin {
  const imgIndex = slot % IMAGES.length;
  const tplIndex = slot % TEMPLATES.length;
  return {
    imageUrl: IMAGES[imgIndex]!,
    title: TEMPLATES[tplIndex]!.title,
    content: TEMPLATES[tplIndex]!.content,
  };
}
