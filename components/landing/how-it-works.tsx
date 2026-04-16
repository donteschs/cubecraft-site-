import Image from "next/image";
import { AnimateOnScroll } from "components/ui/animate-on-scroll";

const steps = [
  {
    num: "01",
    title: "Ouvrez la boîte",
    desc: "64 cubes magnétiques aux couleurs vives, prêts à l'emploi. Pas de montage, pas de notice compliquée.",
    img: "/images/Whisk_0f4f789c58d8d62974e423a8f570af63dr.png",
    alt: "Boîte cadeau CubeCraft",
  },
  {
    num: "02",
    title: "Laissez-les créer",
    desc: "Maisons, robots, animaux, tours, véhicules… Chaque cube s'aimante aux autres en un clic satisfaisant.",
    img: "/images/Whisk_19a009ed6a33513908946a206c5af180dr.png",
    alt: "Enfants qui jouent avec CubeCraft",
  },
  {
    num: "03",
    title: "Observez la magie",
    desc: "Votre enfant entre dans un état de flow — concentration totale, créativité libérée, satisfaction profonde.",
    img: "/images/Whisk_4416eb927c0020d8a5046ad544d19c74dr.png",
    alt: "Enfant concentré sur sa construction CubeCraft",
  },
];

const boxContents = [
  { qty: "64", label: "cubes magnétiques", sub: "8 couleurs premium" },
  { qty: "1",  label: "pochette de rangement", sub: "en tissu résistant" },
  { qty: "20", label: "modèles d'inspiration", sub: "pour bien démarrer" },
  { qty: "1",  label: "accès communauté", sub: "CubeCraft en ligne" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-dark pixel-grid py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-pixel text-[9px] text-creeper tracking-widest uppercase block mb-3 sm:mb-4">
            Comment ça marche
          </span>
          <h2 className="font-rubik font-black text-white text-2xl sm:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4">
            Simple comme{" "}
            <span className="text-gradient-green">bonjour</span>
          </h2>
          <p className="text-white/50 text-base sm:text-xl font-inter max-w-xl mx-auto">
            Trois étapes. Des heures de plaisir.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
          {steps.map((step, idx) => (
            <AnimateOnScroll key={step.num} direction="up" delay={idx * 120}>
            <div className="relative group h-full">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden sm:block absolute top-16 left-[calc(100%_-_16px)] w-8 h-0.5 bg-gradient-to-r from-creeper/50 to-transparent z-10" />
              )}

              <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-creeper/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-creeper/10">
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <Image
                    src={step.img}
                    alt={step.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="font-pixel text-[10px] text-creeper mb-2 sm:mb-3">
                    ÉTAPE {step.num}
                  </div>
                  <h3 className="font-rubik font-bold text-white text-lg sm:text-xl mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed font-inter">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* What's in the box */}
        <div className="mt-10 sm:mt-16 bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6">
            <svg className="w-5 h-5 text-creeper" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <h3 className="font-rubik font-bold text-white text-base sm:text-xl">
              Contenu de la boîte
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {boxContents.map((item) => (
              <div key={item.label} className="text-center p-3 sm:p-4 rounded-xl bg-dark/50 border border-dark-border">
                <div className="font-rubik font-black text-creeper text-2xl sm:text-3xl mb-1">
                  {item.qty}
                </div>
                <div className="text-white text-xs sm:text-sm font-fredoka font-semibold capitalize leading-snug">
                  {item.label}
                </div>
                <div className="text-white/40 text-[10px] sm:text-xs mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
