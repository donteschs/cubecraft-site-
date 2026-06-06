export const revalidate = 3600;

import Footer from "components/layout/footer";
import Price from "components/price";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { ProductSellingPoints } from "components/product/selling-points";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable },
    },
    openGraph: url
      ? { images: [{ url, width, height, alt }] }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    brand: { "@type": "Brand", name: "CubeCraft" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "214",
    },
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 md:pb-16">
        {/* Fil d'Ariane */}
        <nav className="mb-6 flex items-center gap-2 font-inter text-sm text-pierre/50">
          <Link href="/" className="hover:text-creeper">Accueil</Link>
          <span>/</span>
          <Link href="/search" className="hover:text-creeper">Boutique</Link>
          <span>/</span>
          <span className="truncate text-pierre/80">{product.title}</span>
        </nav>

        {/* Carte produit */}
        <div className="flex flex-col gap-6 rounded-3xl border-2 border-pierre/10 bg-white p-4 sm:p-6 md:p-10 lg:flex-row lg:gap-12">
          <div className="h-full w-full basis-full lg:basis-3/5">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-2xl bg-blanc" />
              }
            >
              <Gallery
                images={product.images.slice(0, 6).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/5">
            <Suspense
              fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-10 w-3/4 rounded bg-pierre/10" />
                  <div className="h-8 w-1/3 rounded-full bg-pierre/10" />
                  <div className="h-4 w-full rounded bg-pierre/5" />
                  <div className="h-4 w-5/6 rounded bg-pierre/5" />
                </div>
              }
            >
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>

        {/* Sections vendeuses */}
        <ProductSellingPoints />

        {/* Cross-sell */}
        <RelatedProducts id={product.id} />
      </div>
      <Footer />
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);
  const list = relatedProducts.filter((p) => p.featuredImage?.url).slice(0, 4);

  if (!list.length) return null;

  return (
    <section className="mt-14 sm:mt-20">
      <h2 className="mb-8 text-center font-rubik font-black text-pierre text-2xl sm:text-3xl">
        Tu aimeras aussi
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {list.map((product) => (
          <Link
            key={product.handle}
            href={`/product/${product.handle}`}
            prefetch
            className="group flex flex-col overflow-hidden rounded-2xl border-2 border-pierre/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-creeper hover:shadow-xl"
          >
            <div className="relative aspect-square overflow-hidden bg-blanc">
              <NextImage
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-rubik font-bold text-pierre text-sm leading-snug line-clamp-2">
                {product.title}
              </h3>
              <Price
                amount={product.priceRange.maxVariantPrice.amount}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                className="mt-2 font-rubik font-black text-creeper text-lg"
                currencyCodeClassName="hidden"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
