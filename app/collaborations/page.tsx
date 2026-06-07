export const revalidate = 86400;

import Footer from "components/layout/footer";
import type { Metadata } from "next";

const CONTACT_EMAIL = "snuggiesservices@gmail.com";

export const metadata: Metadata = {
  title: "Collaborations & partenariats",
  description:
    "Marques de jouets et acteurs du jeu éducatif : collaborez avec CubeCraft. Articles sponsorisés, insertions de liens, mise en avant produit, newsletter sponsorisée.",
  alternates: { canonical: "https://cubecrafte.com/collaborations" },
};

const COLLAB_TYPES = [
  {
    emoji: "✍️",
    title: "Article sponsorisé",
    text: "Un article dédié à votre produit ou votre marque, rédigé dans notre ligne éditoriale, optimisé SEO et conservé durablement.",
  },
  {
    emoji: "🔗",
    title: "Insertion de lien",
    text: "Un lien contextuel pertinent placé dans un article existant ou à venir, en accord avec notre charte de qualité.",
  },
  {
    emoji: "⭐",
    title: "Mise en avant produit",
    text: "Votre produit intégré à nos sélections et guides d'achat, avec visuel, description et lien.",
  },
  {
    emoji: "📩",
    title: "Newsletter sponsorisée",
    text: "Un encart ou une recommandation dans notre newsletter, auprès de parents engagés.",
  },
];

const AUDIENCE = [
  { value: "2–14 ans", label: "Tranche d'âge ciblée" },
  { value: "Parents", label: "CSP+, soucieux du temps d'écran" },
  { value: "SEO", label: "Trafic organique qualifié" },
  { value: "France", label: "Audience francophone" },
];

export default function CollaborationsPage() {
  return (
    <>
      <main className="min-h-screen bg-blanc">
        {/* Hero */}
        <section className="bg-dark pixel-grid">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20 text-center">
            <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-3 py-1.5 rounded-sm tracking-wider">
              PARTENARIATS
            </span>
            <h1 className="mt-4 font-rubik font-black text-white text-3xl leading-tight sm:text-5xl">
              Collaborons ensemble
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-inter text-lg text-white/70">
              CubeCraft est un média et une boutique dédiés aux jouets créatifs et
              éducatifs anti-écran. Nous accompagnons les parents dans leurs choix —
              et nous mettons en avant les marques qui partagent nos valeurs.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Proposition%20de%20collaboration`}
              className="btn-shimmer mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-4 font-rubik font-bold text-white shadow-lg shadow-creeper/30 transition-transform duration-200 hover:scale-105"
            >
              Proposer une collaboration
            </a>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-14 sm:py-16">
          {/* Audience */}
          <h2 className="text-center font-rubik font-black text-pierre text-2xl sm:text-3xl">
            Notre audience
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {AUDIENCE.map((a) => (
              <div
                key={a.label}
                className="rounded-2xl border-2 border-pierre/10 bg-white p-5 text-center"
              >
                <div className="font-rubik font-black text-creeper text-xl sm:text-2xl">
                  {a.value}
                </div>
                <div className="mt-1 font-inter text-xs text-pierre/60">{a.label}</div>
              </div>
            ))}
          </div>

          {/* Types de collaborations */}
          <h2 className="mt-16 text-center font-rubik font-black text-pierre text-2xl sm:text-3xl">
            Types de collaborations
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {COLLAB_TYPES.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border-2 border-pierre/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blanc text-2xl" aria-hidden>
                  {c.emoji}
                </div>
                <h3 className="mt-4 font-rubik font-black text-pierre text-lg">{c.title}</h3>
                <p className="mt-2 font-inter text-sm leading-relaxed text-pierre/65">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <section className="mt-16 rounded-2xl bg-creeper-light p-8 text-center">
            <h2 className="font-rubik font-black text-creeper-dark text-2xl">
              Travaillons ensemble
            </h2>
            <p className="mx-auto mt-2 max-w-xl font-inter text-creeper-dark/70">
              Présentez-nous votre projet : produit, marque, objectifs et budget.
              Nous revenons vers vous sous 48&nbsp;h.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Proposition%20de%20collaboration`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-creeper px-7 py-4 font-rubik font-bold text-white shadow-md transition-transform duration-200 hover:scale-105"
            >
              {CONTACT_EMAIL}
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
