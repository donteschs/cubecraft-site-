"use client";

import { useState } from "react";

const faqs = [
  {
    q: "À partir de quel âge mon enfant peut jouer avec CubeCraft ?",
    a: "CubeCraft est recommandé à partir de 6 ans. Les cubes contiennent des aimants puissants et sont certifiés CE. Pour les enfants de 3 à 5 ans, nous recommandons de jouer sous surveillance parentale.",
  },
  {
    q: "Les aimants sont-ils dangereux ?",
    a: "Nos cubes sont certifiés CE et conformes aux normes européennes EN 71. Les aimants sont encapsulés dans une coque ABS résistante — impossible de les extraire. C'est aussi sûr qu'un LEGO.",
  },
  {
    q: "Combien de cubes faut-il pour bien jouer ?",
    a: "Le pack 100 pièces est parfait pour débuter. Pour des constructions plus ambitieuses ou pour jouer à plusieurs, on recommande le pack 200 ou le Pack Famille 400.",
  },
  {
    q: "Est-ce que ça tient vraiment bien ensemble ?",
    a: "Oui. Chaque cube contient des aimants néodyme de grade N52 — les plus puissants du marché. Les constructions tiennent solidement, même en hauteur.",
  },
  {
    q: "Mon enfant aime Minecraft, est-ce qu'il va aimer CubeCraft ?",
    a: "C'est exactement pour ça qu'on a créé CubeCraft. Les cubes reprennent le concept de construction par blocs que votre enfant adore, mais dans le monde réel. 95% des enfants fans de Minecraft adorent CubeCraft.",
  },
  {
    q: "Comment ça se nettoie ?",
    a: "Un coup de lingette humide suffit. Les cubes sont en ABS alimentaire, résistant à l'eau et aux chocs.",
  },
  {
    q: "Vous livrez en combien de temps ?",
    a: "Expédition sous 24h. Livraison en 2-4 jours ouvrés en France métropolitaine (Colissimo). Livraison en Europe sous 5-7 jours.",
  },
  {
    q: "Et si mon enfant n'aime pas ?",
    a: "Garantie \"Créativité ou Remboursé\" 30 jours. Renvoyez le produit dans son état d'origine, on vous rembourse intégralement. Aucune question posée.",
  },
  {
    q: "Est-ce un bon cadeau d'anniversaire ou de Noël ?",
    a: "C'est LE cadeau que les parents nous remercient d'avoir créé. Emballage premium inclus. Effet \"waouh\" garanti à l'ouverture. Et contrairement aux jouets classiques, celui-ci ne finit pas au fond d'un placard.",
  },
  {
    q: "Est-ce compatible avec d'autres jeux de construction ?",
    a: "CubeCraft est un système autonome. Les cubes se connectent entre eux magnétiquement — pas besoin de compatibilité externe. Plus vous avez de cubes, plus les possibilités sont infinies.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-blanc py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="font-pixel text-[9px] text-creeper-dark tracking-widest uppercase block mb-4">
            FAQ
          </span>
          <h2 className="font-rubik font-black text-pierre text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Vos questions,{" "}
            <span className="text-gradient-green">nos réponses</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "border-creeper bg-creeper-light/20 shadow-sm"
                    : "border-gray-200 bg-white hover:border-creeper/30"
                }`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="font-rubik font-semibold text-pierre text-base leading-snug">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-creeper flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-pierre/70 text-sm leading-relaxed font-inter">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
