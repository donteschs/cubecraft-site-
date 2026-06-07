export const revalidate = 86400;

import { AffiliateProductGrid } from "components/affiliate/affiliate-product-grid";
import { JsonLd } from "components/json-ld";
import Footer from "components/layout/footer";
import { NewsletterBlock } from "components/newsletter/newsletter-block";
import {
  getAffiliateProductsByCategory,
  getAffiliateProductsByIds,
} from "lib/affiliate/products";
import { getAllSelections, getSelection } from "lib/affiliate/selections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const SITE = "https://cubecrafte.com";

export function generateStaticParams() {
  return getAllSelections().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const selection = getSelection(slug);
  if (!selection) return {};
  return {
    title: selection.title,
    description: selection.metaDescription,
    alternates: { canonical: `${SITE}/selection/${slug}` },
    openGraph: {
      title: selection.title,
      description: selection.metaDescription,
      type: "website",
    },
  };
}

export default async function SelectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const selection = getSelection(slug);
  if (!selection) notFound();

  const products = selection.productIds
    ? getAffiliateProductsByIds(selection.productIds)
    : selection.category
      ? getAffiliateProductsByCategory(selection.category)
      : [];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
      { "@type": "ListItem", position: 2, name: "Sélections", item: `${SITE}/selection` },
      { "@type": "ListItem", position: 3, name: selection.title, item: `${SITE}/selection/${slug}` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: selection.title,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.title,
        description: p.description,
        ...(p.image ? { image: p.image } : {}),
        url: p.affiliateUrl,
        brand: { "@type": "Brand", name: p.merchant || "CubeCraft" },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: selection.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <main className="min-h-screen bg-blanc">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
          {/* Fil d'Ariane */}
          <nav className="mb-6 flex items-center gap-2 font-inter text-sm text-pierre/50">
            <Link href="/" className="hover:text-creeper">Accueil</Link>
            <span>/</span>
            <span className="text-pierre/80">Sélections</span>
          </nav>

          {/* En-tête */}
          <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-3 py-1.5 rounded-sm tracking-wider">
            GUIDE D&apos;ACHAT
          </span>
          <h1 className="mt-4 font-rubik font-black text-pierre text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {selection.title}
          </h1>
          <p className="mt-4 max-w-2xl border-l-4 border-creeper pl-4 font-inter text-lg text-pierre/65">
            {selection.intro}
          </p>

          {/* Grille de produits affiliés */}
          <AffiliateProductGrid title="Notre sélection" products={products} />

          {/* Conseils d'achat */}
          {selection.buyingTips.length > 0 ? (
            <section className="mt-12">
              <h2 className="font-rubik font-black text-pierre text-2xl sm:text-3xl">
                Comment bien choisir ?
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {selection.buyingTips.map((tip) => (
                  <div
                    key={tip.title}
                    className="rounded-2xl border-2 border-pierre/10 bg-white p-5"
                  >
                    <h3 className="font-rubik font-bold text-pierre">{tip.title}</h3>
                    <p className="mt-2 font-inter text-sm leading-relaxed text-pierre/65">
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* FAQ */}
          {selection.faq.length > 0 ? (
            <section className="mt-12">
              <h2 className="font-rubik font-black text-pierre text-2xl sm:text-3xl">
                Questions fréquentes
              </h2>
              <div className="mt-6 space-y-3">
                {selection.faq.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border-2 border-pierre/10 bg-white p-5"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-rubik font-bold text-pierre">
                      {f.q}
                      <svg className="h-5 w-5 flex-shrink-0 text-pierre/40 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </summary>
                    <p className="mt-3 font-inter text-sm leading-relaxed text-pierre/65">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {/* Liens internes */}
          {selection.relatedArticles.length > 0 ? (
            <section className="mt-12">
              <h2 className="font-rubik font-black text-pierre text-xl">
                À lire aussi
              </h2>
              <ul className="mt-4 space-y-2">
                {selection.relatedArticles.map((a) => (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      className="inline-flex items-center gap-2 font-inter text-creeper-dark hover:text-creeper hover:underline"
                    >
                      → {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <NewsletterBlock className="mt-14" />
        </div>
      </main>
      <Footer />
    </>
  );
}
