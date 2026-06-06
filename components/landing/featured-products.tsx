import Image from "next/image";
import Link from "next/link";
import Price from "components/price";
import { getProducts } from "lib/shopify";

/**
 * Best-sellers — grille dynamique des produits actifs (Shopify).
 * S'adapte automatiquement au catalogue : pas de hardcoding produit.
 */
export async function FeaturedProducts() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts({ sortKey: "BEST_SELLING" });
  } catch {
    return null;
  }

  const list = products.filter((p) => p.featuredImage?.url).slice(0, 4);
  if (list.length === 0) return null;

  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-10 text-center">
          <span className="font-pixel text-[9px] text-or-dark bg-or/15 border border-or/30 px-3 py-1.5 rounded-sm tracking-wider">
            BEST-SELLERS
          </span>
          <h2 className="mt-4 font-rubik font-black text-pierre text-3xl sm:text-4xl lg:text-5xl">
            Les jouets préférés des familles
          </h2>
        </div>

        {/* Grille produits */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {list.map((product) => (
            <Link
              key={product.handle}
              href={`/product/${product.handle}`}
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-pierre/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-creeper hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-blanc">
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-rubik font-bold text-pierre text-sm sm:text-base leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <Price
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                    className="font-rubik font-black text-creeper text-lg sm:text-xl"
                    currencyCodeClassName="hidden"
                  />
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-creeper/10 text-creeper transition-colors duration-200 group-hover:bg-creeper group-hover:text-white">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/search"
            className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-rubik font-bold text-white text-base shadow-lg shadow-creeper/30 transition-all duration-200 hover:scale-105"
          >
            Voir les autres
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
