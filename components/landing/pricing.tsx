import Link from "next/link";

const plans = [
  {
    name: "Starter",
    pieces: "64 pièces",
    description: "Parfait pour débuter. 8 couleurs premium, des heures de jeu.",
    normalPrice: "59,90 €",
    launchPrice: "39,90 €",
    savings: "Économisez 20 €",
    features: ["64 cubes magnétiques", "8 couleurs vives", "Pochette de rangement", "20 modèles d'inspiration", "Accès communauté CubeCraft", "Certifié CE & EN 71"],
    cta: "Choisir ce pack",
    highlight: false,
    badge: null,
    color: "border-gray-200",
    ctaClass: "bg-pierre text-white hover:bg-pierre/90 cursor-pointer",
  },
  {
    name: "Pro",
    pieces: "128 pièces",
    description: "Le choix des familles. Pour des constructions épiques et jouer à plusieurs.",
    normalPrice: "99,90 €",
    launchPrice: "69,90 €",
    savings: "Économisez 30 €",
    features: ["128 cubes magnétiques", "8 couleurs vives", "Pochette de rangement XL", "20 modèles d'inspiration", "Accès communauté CubeCraft", "Certifié CE & EN 71", "Emballage cadeau premium"],
    cta: "Choisir ce pack",
    highlight: true,
    badge: "⭐ Plus populaire",
    color: "border-creeper",
    ctaClass: "btn-shimmer text-white cursor-pointer shadow-lg shadow-creeper/30 animate-pulse-green",
  },
  {
    name: "Famille",
    pieces: "256 pièces",
    description: "Le pack ultime. Pour les grands projets et les familles nombreuses.",
    normalPrice: "179,90 €",
    launchPrice: "119,90 €",
    savings: "Économisez 60 €",
    features: ["256 cubes magnétiques", "8 couleurs vives", "Sac de rangement premium", "20 modèles d'inspiration", "Accès communauté VIP", "Certifié CE & EN 71", "Emballage cadeau luxe", "Livraison prioritaire"],
    cta: "Choisir ce pack",
    highlight: false,
    badge: "🏆 Meilleure valeur",
    color: "border-or",
    ctaClass: "bg-or text-dark font-bold hover:bg-or-dark cursor-pointer",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-gradient-to-b from-blanc to-creeper-light/20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-pixel text-[9px] text-creeper-dark tracking-widest uppercase block mb-3 sm:mb-4">
            Nos Packs
          </span>
          <h2 className="font-rubik font-black text-pierre text-2xl sm:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-4">
            <span className="text-gradient-green">Offre de lancement</span>
            <br />
            Plus que quelques heures
          </h2>
          <p className="text-pierre/60 text-base sm:text-xl font-inter max-w-xl mx-auto">
            Stock limité — 127 unités restantes sur cette production.
          </p>

          {/* Urgency bar */}
          <div className="inline-flex items-center gap-2 mt-4 bg-or/10 border border-or/20 text-or-dark rounded-full px-4 py-2 text-sm font-inter">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-or opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-or" />
            </span>
            <strong>127 unités</strong> restantes · Offre expire bientôt
          </div>
        </div>

        {/* Cards — horizontal scroll on xs, grid on md+ */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-3 snap-x snap-mandatory sm:snap-none -mx-4 sm:mx-0 px-4 sm:px-0">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl border-2 ${plan.color} ${
                plan.highlight ? "shadow-2xl shadow-creeper/20 sm:scale-[1.02]" : "shadow-sm"
              } flex flex-col overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1 flex-shrink-0 w-[80vw] sm:w-auto snap-start`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`text-center py-2 text-sm font-rubik font-bold ${
                  plan.highlight ? "bg-creeper text-white" : plan.name === "Famille" ? "bg-or text-dark" : "bg-gray-100 text-pierre"
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-5 sm:p-7 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-4 sm:mb-6">
                  <div className="font-fredoka font-semibold text-pierre/60 text-xs sm:text-sm uppercase tracking-wide mb-1">{plan.name}</div>
                  <div className="font-rubik font-black text-pierre text-xl sm:text-2xl mb-2">{plan.pieces}</div>
                  <p className="text-pierre/60 text-sm font-inter leading-relaxed">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
                  <div className="font-rubik font-black text-3xl sm:text-4xl text-creeper-dark mb-1">
                    {plan.launchPrice}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-inter text-pierre/40 line-through text-sm">{plan.normalPrice}</span>
                    <span className="bg-or/20 text-or-dark text-xs font-rubik font-bold px-2 py-0.5 rounded-full">{plan.savings}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm font-inter text-pierre/70">
                      <svg className="w-4 h-4 text-creeper flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z" clipRule="evenodd" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/commander"
                  className={`w-full text-center rounded-xl py-4 font-rubik font-bold text-base transition-all duration-200 hover:scale-[1.02] active:scale-100 min-h-[52px] flex items-center justify-center ${plan.ctaClass}`}
                >
                  {plan.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint on mobile */}
        <p className="text-center text-pierre/30 text-xs font-inter mt-2 sm:hidden">
          Glissez pour voir les autres packs →
        </p>

        {/* Reassurance row */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124A17.9 17.9 0 0016.5 9.557M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677" /></svg>, text: "Livraison gratuite\nen France" },
            { icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>, text: "Livraison\n3-4 jours" },
            { icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>, text: "Garantie\n30 jours" },
            { icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>, text: "Paiement\nsécurisé" },
          ].map((item) => (
            <div key={item.text} className="text-center py-3 sm:py-4 px-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-creeper flex justify-center mb-1.5">{item.icon}</div>
              <div className="text-pierre/70 text-xs font-inter whitespace-pre-line leading-relaxed">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
