import Link from "next/link";
import Image from "next/image";
import { SITE_IMAGES } from "lib/site-images";

/**
 * Nos univers — bento de collections pour la boutique généraliste.
 * Chaque carte pointe vers /search/[handle] (page collection Shopify).
 * Classes Tailwind littérales par univers (pas de génération dynamique).
 */
type Universe = {
  handle: string;
  title: string;
  tagline: string;
  emoji: string;
  image: string; // chemin vers l'image de mockup
  wrap: string; // styles de la carte (fond + bordure hover)
  icon: string; // pastille emoji
  cta: string; // couleur du lien
  span?: string; // taille bento
};

const UNIVERSES: Universe[] = [
  {
    handle: "cubes-construction-magnetique",
    title: "Cubes & Construction",
    tagline: "Aimants, blocs 3D & créativité sans limite",
    emoji: "🧱",
    image: SITE_IMAGES.universeConstruction.src,
    wrap: "bg-gradient-to-br from-creeper-light/20 via-white to-white border-creeper/15 hover:border-creeper",
    icon: "bg-creeper text-white",
    cta: "text-creeper-dark",
    span: "col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    handle: "stem-sciences",
    title: "STEM & Sciences",
    tagline: "Robots, expériences, logique",
    emoji: "🔬",
    image: SITE_IMAGES.universeStem.src,
    wrap: "bg-gradient-to-br from-ciel/15 via-white to-white border-ciel/20 hover:border-ciel",
    icon: "bg-ciel text-white",
    cta: "text-ciel",
  },
  {
    handle: "creatif-dessin",
    title: "Créatif & Dessin",
    tagline: "Dessiner, créer, modeler",
    emoji: "🎨",
    image: SITE_IMAGES.universeCreatif.src,
    wrap: "bg-gradient-to-br from-or/15 via-white to-white border-or/25 hover:border-or",
    icon: "bg-or text-dark",
    cta: "text-or-dark",
  },
  {
    handle: "eveil-montessori",
    title: "Éveil & Montessori",
    tagline: "Pour les tout-petits",
    emoji: "🌱",
    image: SITE_IMAGES.universeMontessori.src,
    wrap: "bg-gradient-to-br from-terre/15 via-white to-white border-terre/20 hover:border-terre",
    icon: "bg-terre text-white",
    cta: "text-terre",
  },
  {
    handle: "jeux-famille",
    title: "Jeux & Famille",
    tagline: "Ensemble, sans écran",
    emoji: "🎲",
    image: SITE_IMAGES.universeFamille.src,
    wrap: "bg-gradient-to-br from-pierre/10 via-white to-white border-pierre/20 hover:border-pierre",
    icon: "bg-pierre text-white",
    cta: "text-pierre",
  },
];

export function Universes() {
  return (
    <section id="univers" className="relative bg-blanc py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-10 sm:mb-14 text-center">
          <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-3 py-1.5 rounded-sm tracking-wider">
            LA BOUTIQUE
          </span>
          <h2 className="mt-4 font-rubik font-black text-pierre text-3xl sm:text-4xl lg:text-5xl">
            Explore nos univers
          </h2>
          <p className="mt-3 font-inter text-pierre/60 text-base sm:text-lg max-w-2xl mx-auto">
            Des jouets créatifs et éducatifs, triés par passion. Tous certifiés
            CE &amp; EN&nbsp;71, pensés pour remplacer les écrans.
          </p>
        </div>

        {/* Bento */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 lg:auto-rows-[210px]">
          {UNIVERSES.map((u) => (
            <Link
              key={u.handle}
              href={`/search/${u.handle}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${u.wrap} ${u.span ?? ""}`}
            >
              {/* Emojis badge - keeping a subtle micro touch */}
              <div
                className={`flex items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 z-10 ${u.icon} ${
                  u.span ? "w-14 h-14 text-2xl sm:w-16 sm:h-16 sm:text-3xl" : "w-10 h-10 text-xl"
                }`}
                aria-hidden
              >
                {u.emoji}
              </div>

              {/* Background Mockup Image with subtle gradient and scales on hover */}
              <div className={`absolute right-0 bottom-0 pointer-events-none select-none z-0 ${
                u.span 
                  ? "w-[50%] h-[55%] sm:h-[65%] lg:w-[55%] lg:h-[70%]" 
                  : "w-[48%] h-[55%] sm:h-[62%]"
              }`}>
                <Image
                  src={u.image}
                  alt={u.title}
                  fill
                  sizes={u.span ? "(max-width: 1024px) 50vw, 30vw" : "25vw"}
                  className="object-contain object-right-bottom transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <div className="mt-4 text-left z-10 max-w-[65%] sm:max-w-[60%] flex flex-col justify-end">
                <h3
                  className={`font-rubik font-black text-pierre leading-tight ${
                    u.span ? "text-xl sm:text-2xl lg:text-3xl" : "text-base sm:text-lg"
                  }`}
                >
                  {u.title}
                </h3>
                <p className="mt-1 font-inter text-pierre/60 text-xs sm:text-sm line-clamp-2">
                  {u.tagline}
                </p>
                <span
                  className={`mt-2.5 inline-flex items-center gap-1 font-rubik font-bold text-xs sm:text-sm ${u.cta}`}
                >
                  Explorer
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
