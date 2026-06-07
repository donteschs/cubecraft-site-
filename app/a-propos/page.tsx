export const revalidate = 86400;

import Footer from "components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos de CubeCraft",
  description:
    "Qui sommes-nous ? CubeCraft est une marque française de jouets créatifs et éducatifs, pensés comme une alternative aux écrans. Notre mission, nos valeurs et notre façon de sélectionner les jouets.",
  alternates: { canonical: "https://cubecrafte.com/a-propos" },
};

const VALUES = [
  {
    emoji: "📵",
    title: "Moins d'écrans",
    text: "Nous croyons que les meilleures heures d'enfance se vivent avec les mains, pas avec un pouce. Chaque jouet que nous mettons en avant remplace du temps d'écran par du jeu réel.",
  },
  {
    emoji: "🧠",
    title: "Apprendre en jouant",
    text: "Construction, logique, sciences, motricité : nous privilégions les jouets qui développent une vraie compétence, sans jamais sacrifier le plaisir.",
  },
  {
    emoji: "🛡️",
    title: "La sécurité d'abord",
    text: "Nos produits et nos recommandations respectent les normes européennes CE et EN 71. Un jouet entre les mains d'un enfant ne se négocie pas.",
  },
  {
    emoji: "💚",
    title: "L'honnêteté",
    text: "Nous ne recommandons que ce que nous achèterions pour nos propres enfants. Nos liens partenaires sont signalés et n'influencent jamais notre avis.",
  },
];

export default function AProposPage() {
  return (
    <>
      <main className="min-h-screen bg-blanc">
        {/* Hero */}
        <section className="bg-dark pixel-grid">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20 text-center">
            <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-3 py-1.5 rounded-sm tracking-wider">
              À PROPOS
            </span>
            <h1 className="mt-4 font-rubik font-black text-white text-3xl leading-tight sm:text-5xl">
              On construit un monde avec moins d&apos;écrans.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-inter text-lg text-white/70">
              CubeCraft est une marque et un média français dédiés aux jouets
              créatifs et éducatifs. Notre conviction : un enfant qui crée,
              construit et expérimente avec ses mains grandit mieux qu&apos;un
              enfant scotché à une tablette.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-14 sm:py-16 font-inter text-pierre/80">
          {/* Mission */}
          <section>
            <h2 className="font-rubik font-black text-pierre text-2xl sm:text-3xl">
              Notre mission
            </h2>
            <p className="mt-4 leading-relaxed">
              Tout est parti d&apos;un constat de parents : les enfants adorent
              construire des mondes dans des jeux vidéo comme Minecraft, mais
              passent des heures devant un écran pour le faire. Et si on
              ramenait cette envie de bâtir dans le monde réel ? C&apos;est l&apos;idée
              derrière CubeCraft — et derrière chaque jouet que nous concevons
              ou sélectionnons.
            </p>
            <p className="mt-3 leading-relaxed">
              Aujourd&apos;hui, nous accompagnons les familles de deux façons :
              avec notre propre gamme de cubes et jeux de construction, et avec
              des <Link href="/selection" className="text-creeper hover:underline">guides d&apos;achat indépendants</Link> qui
              aident à choisir le bon jouet, par âge et par passion.
            </p>
          </section>

          {/* Valeurs */}
          <section className="mt-14">
            <h2 className="font-rubik font-black text-pierre text-2xl sm:text-3xl">
              Nos valeurs
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {VALUES.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border-2 border-pierre/10 bg-white p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blanc text-2xl" aria-hidden>
                    {v.emoji}
                  </div>
                  <h3 className="mt-4 font-rubik font-black text-pierre text-lg">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pierre/65">{v.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comment on sélectionne */}
          <section className="mt-14">
            <h2 className="font-rubik font-black text-pierre text-2xl sm:text-3xl">
              Comment nous choisissons les jouets
            </h2>
            <p className="mt-4 leading-relaxed">
              Chaque jouet recommandé sur CubeCraft passe par la même grille de
              lecture :
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex gap-3"><span className="text-creeper">✓</span> Est-il <strong className="text-pierre">sûr</strong> ? Certifié CE et EN 71, matériaux sans danger.</li>
              <li className="flex gap-3"><span className="text-creeper">✓</span> Apprend-il quelque chose ? Créativité, logique, motricité, sciences.</li>
              <li className="flex gap-3"><span className="text-creeper">✓</span> Tient-il dans le temps ? Un bon jouet se rejoue, il ne finit pas au placard.</li>
              <li className="flex gap-3"><span className="text-creeper">✓</span> Fonctionne-t-il <strong className="text-pierre">sans écran</strong> ? C&apos;est notre fil rouge.</li>
            </ul>
          </section>

          {/* Équipe */}
          <section className="mt-14">
            <h2 className="font-rubik font-black text-pierre text-2xl sm:text-3xl">
              Qui est derrière CubeCraft ?
            </h2>
            <p className="mt-4 leading-relaxed">
              CubeCraft est édité par <strong className="text-pierre">Issa Kanouté</strong>,
              passionné de jeux éducatifs, basé à Paris. Derrière le site, une
              personne réelle qui teste, écrit et répond elle-même à vos
              questions. Une remarque, une suggestion de jouet, une demande de
              partenariat ? Écrivez-nous, un humain vous répondra.
            </p>
          </section>

          {/* Contact */}
          <section className="mt-12 rounded-2xl bg-creeper-light p-8 text-center">
            <h2 className="font-rubik font-black text-creeper-dark text-2xl">
              Parlons-en
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-creeper-dark/70">
              CubeCraft — Issa Kanouté · 14 rue de la Santé, France
            </p>
            <a
              href="mailto:snuggiesservices@gmail.com"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-creeper px-7 py-4 font-rubik font-bold text-white shadow-md transition-transform duration-200 hover:scale-105"
            >
              snuggiesservices@gmail.com
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
