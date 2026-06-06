/**
 * Sections vendeuses génériques affichées sous chaque fiche produit.
 * Argumentaire de marque CubeCraft : anti-écran, éducatif, sécurité, cadeau.
 */
const REASONS = [
  {
    emoji: "📵",
    title: "Zéro écran",
    text: "Des heures de jeu sans tablette ni télé. L'enfant crée avec ses mains, pas avec un pouce.",
    wrap: "from-creeper-light/50",
  },
  {
    emoji: "🧠",
    title: "Éducatif & STEM",
    text: "Logique, concentration, motricité fine et créativité : on apprend en s'amusant.",
    wrap: "from-ciel/15",
  },
  {
    emoji: "🛡️",
    title: "Sûr & certifié",
    text: "Certifié CE & EN 71, aux normes européennes de sécurité des jouets. Matériaux sans danger.",
    wrap: "from-terre/15",
  },
  {
    emoji: "🎁",
    title: "Le cadeau qui marque",
    text: "Effet « waouh » à l'ouverture. Un cadeau qui ne finit pas au fond d'un placard.",
    wrap: "from-or/15",
  },
];

const TRUST = [
  { value: "30 jours", label: "Satisfait ou remboursé" },
  { value: "4-5 jours", label: "Livraison en France" },
  { value: "+200", label: "Familles conquises" },
  { value: "CE · EN 71", label: "Sécurité certifiée" },
];

export function ProductSellingPoints() {
  return (
    <section className="mt-12 sm:mt-16">
      {/* Pourquoi les familles adorent */}
      <div className="text-center">
        <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-3 py-1.5 rounded-sm tracking-wider">
          POURQUOI L'ADOPTER
        </span>
        <h2 className="mt-4 font-rubik font-black text-pierre text-2xl sm:text-3xl lg:text-4xl">
          Ce que les familles adorent
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((r) => (
          <div
            key={r.title}
            className={`rounded-2xl border-2 border-pierre/10 bg-gradient-to-br ${r.wrap} to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm" aria-hidden>
              {r.emoji}
            </div>
            <h3 className="mt-4 font-rubik font-black text-pierre text-lg">{r.title}</h3>
            <p className="mt-2 font-inter text-sm leading-relaxed text-pierre/65">{r.text}</p>
          </div>
        ))}
      </div>

      {/* Bandeau confiance */}
      <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl bg-dark pixel-grid p-6 sm:p-8 lg:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.label} className="text-center">
            <div className="font-rubik font-black text-or text-2xl sm:text-3xl">{t.value}</div>
            <div className="mt-1 font-inter text-xs text-white/70 sm:text-sm">{t.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
