const CLOUD = "druvbvnob";
const BASE = `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto`;

function img(id: string) {
  return `${BASE}/${id}`;
}

const IMAGES = [
  "Whisk_04c245b3be0535c81d242e1c301414f5dr",
  "Whisk_092747553965cd5ae3e4e996c106e938dr",
  "Whisk_0f4f789c58d8d62974e423a8f570af63dr",
  "Whisk_155d0dfae92253caf61441483e36bfc2dr",
  "Whisk_19a009ed6a33513908946a206c5af180dr",
  "Whisk_21fe8406a0537f38ec8479f261076368dr",
  "Whisk_2e77d6b4c9dcdbc81cc4c750e9dc7528dr",
  "Whisk_318bd88d5ee4c12af1e48db7190bff31dr",
  "Whisk_348f1f1fdc5e111b0b543df5deb40eb6dr",
  "Whisk_3a817e40ca67661b44e49474474bb3ecdr",
  "Whisk_4416eb927c0020d8a5046ad544d19c74dr",
  "Whisk_49ebf466efa83188d3c4771deac3c2bcdr",
  "Whisk_4f8df5f9260d81496f0406e53e7c984adr",
  "Whisk_55d0052c7faf764a3484e82a295cc64bdr",
  "Whisk_5e8f8a6c8e94bfc94584807d324df370dr",
  "Whisk_73d2bf4464e743e914844e1e170ea0ffdr",
  "Whisk_7727e7d9a2fc0ca8edb412a2bfef94badr",
  "Whisk_86eed3c52579d98badd4ea718118cbd0dr",
  "Whisk_893db59d3b2dbaca07e4fbe657bea124dr",
  "Whisk_92202c68c92e25abbe649526b03243acdr",
  "Whisk_934a1abfce12b66b7404f8e7f83b68b2dr",
  "Whisk_959615b5dd14fddb8d34afd06bad4e98dr",
  "Whisk_966a581f388ad91bdbe4786c5fae6f8fdr",
  "Whisk_9b647a4cdf4c325b8ca46f48d125c6c2dr",
  "Whisk_a77833dc274bb5b85684b9896b1c42a2dr",
  "Whisk_ac8b993cad545be894c4f262db608fe0dr",
  "Whisk_b54ecd84db611509fcf4f1c1358df149dr",
  "Whisk_bbf14dbd9b0fcabbff642a7266be0e87dr",
  "Whisk_c2260f93dc76429982949638a47bff7edr",
  "Whisk_dec7a8d751bc3f89155419032530d4b0dr",
  "Whisk_e0491f06c6de0fd849142065e3936d14dr",
  "Whisk_e1352228ec6b4dea08a4d1c4b8c56da4dr",
  "Whisk_e3f2c5690af1a96b5ce44bb13c3ad61cdr",
  "Whisk_e4f3230274e557b84f74b4c45bb3c5b4dr",
  "Whisk_e5f6cee57b036e28a5c45f568462a196dr",
  "Whisk_ea719c5da57c4e5aa574b52679816569dr",
  "Whisk_ee15293a3c4e9c38a3d426b143a45849dr",
  "Whisk_fcdbf0d68f55849b74a4a13590ddb054dr",
  "Whisk_fdb08157e1632a8b51043c044b78354fdr",
];

type PinTemplate = { title: string; content: string };

const TEMPLATES: PinTemplate[] = [
  {
    title: "Jouet anti-écran — Cubes magnétiques CubeCraft",
    content:
      "Il construit pendant des heures sans toucher à sa tablette 🧲\n\nLes cubes magnétiques CubeCraft remplacent les écrans par la créativité. Certifiés CE & EN 71, aimants N52 ultra-puissants.\n\n✨ Offre lancement -30%\n\n#joueteducatif #antiécran #parentalité #montessori #construction",
  },
  {
    title: "Le Minecraft qu'ils peuvent toucher — CubeCraft",
    content:
      "Ton enfant adore Minecraft ? Offre-lui le vrai 🎮🧱\n\nAvec CubeCraft, il construit ses créations en 3D avec de vrais cubes magnétiques. Le jeu vidéo devient réalité.\n\n🔥 -30% offre de lancement\n\n#minecraft #jouetenfant #construction #gaming #cadeau",
  },
  {
    title: "Développe la créativité de ton enfant — CubeCraft",
    content:
      "La science dit que construire développe l'intelligence spatiale, la logique et la concentration 🧠\n\nCubeCraft : 64 cubes magnétiques premium pour enfants de 6 à 14 ans. Certifiés CE, EN 71.\n\n#STEM #joueteducatif #intelligencespatiale #montessori #développementenfant",
  },
  {
    title: "Le cadeau parfait pour les enfants — CubeCraft",
    content:
      "Fatigué des jouets qu'on oublie après 5 minutes ? 🎁\n\nLes cubes magnétiques CubeCraft occupent les enfants pendant des heures. Le cadeau dont ils parlent encore des semaines après.\n\n💚 Livraison rapide · Certifié CE\n\n#cadeauenfant #idéecadeau #jouetenfant #noel #anniversaire",
  },
  {
    title: "Construction magnétique 3D — CubeCraft pour enfants",
    content:
      "Regarde ce qu'un enfant de 8 ans peut construire avec CubeCraft 😍\n\nChâteaux, robots, animaux, maisons... Les possibilités sont infinies ! 64 cubes magnétiques N52 ultra-résistants.\n\n⚡ Aimants 3x plus puissants que la concurrence\n\n#constructionmagnétique #jouetcréatif #bricolageenfant #STEM #jouet",
  },
  {
    title: "Alternative aux écrans — CubeCraft jouet éducatif",
    content:
      "Les enfants passent en moyenne 5h/jour sur les écrans. CubeCraft change ça 📱❌\n\nUn jouet qui captive autant qu'une tablette, mais qui développe de vraies compétences. Montessori-approved.\n\n🌱 Pour enfants de 6 à 14 ans\n\n#antiécran #tempsécran #parentalité #joueteducatif #montessori",
  },
  {
    title: "Pack famille 256 pièces — CubeCraft magnétique",
    content:
      "Quand toute la famille construit ensemble 👨‍👩‍👧‍👦✨\n\nLe Pack Famille 256 pièces CubeCraft : des heures de jeu partagé, des constructions impossibles, des souvenirs qui durent.\n\n🏠 Idéal pour la maison · Certifié CE & EN 71\n\n#jeuxenfamille #jouetenfant #constructionmagnétique #cadeau #qualité",
  },
];

export type Pin = {
  imageUrl: string;
  title: string;
  content: string;
};

export function getPinForSlot(slot: number): Pin {
  const imgIndex = slot % IMAGES.length;
  const tplIndex = slot % TEMPLATES.length;
  const tpl = TEMPLATES[tplIndex]!;
  return {
    imageUrl: img(IMAGES[imgIndex]!),
    title: tpl.title,
    content: tpl.content,
  };
}
