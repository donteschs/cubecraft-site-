export const revalidate = 86400;

import Footer from "components/layout/footer";
import { getAllSelections } from "lib/affiliate/selections";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides d'achat & sélections de jouets",
  description:
    "Tous nos guides d'achat et sélections de jouets créatifs et éducatifs : construction, STEM, Montessori, cadeaux anti-écran, jeux de famille.",
  alternates: { canonical: "https://cubecrafte.com/selection" },
};

export default function SelectionIndexPage() {
  const selections = getAllSelections();

  return (
    <>
      <main className="min-h-screen bg-blanc">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-3 py-1.5 rounded-sm tracking-wider">
            GUIDES D&apos;ACHAT
          </span>
          <h1 className="mt-4 font-rubik font-black text-pierre text-3xl sm:text-4xl lg:text-5xl">
            Nos sélections de jouets
          </h1>
          <p className="mt-3 max-w-2xl font-inter text-lg text-pierre/60">
            Des guides d&apos;achat clairs pour choisir le bon jouet — par passion,
            par âge et par budget.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {selections.map((s) => (
              <Link
                key={s.slug}
                href={`/selection/${s.slug}`}
                className="group rounded-2xl border-2 border-pierre/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-creeper hover:shadow-xl"
              >
                <h2 className="font-rubik font-black text-pierre text-lg leading-snug">
                  {s.title}
                </h2>
                <p className="mt-2 line-clamp-2 font-inter text-sm text-pierre/60">
                  {s.metaDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-rubik font-bold text-sm text-creeper-dark">
                  Voir le guide
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
