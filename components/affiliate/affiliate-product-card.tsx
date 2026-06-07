import type { AffiliateProduct } from "lib/affiliate/products";

/**
 * Carte produit affilié.
 *
 * Server component (zéro JS côté client → rapide). Image en lazy-loading.
 * TOUS les liens affiliés portent rel="nofollow sponsored" + target="_blank".
 */
export function AffiliateProductCard({ product }: { product: AffiliateProduct }) {
  const rel = "nofollow sponsored noopener noreferrer";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-pierre/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-creeper hover:shadow-xl">
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel={rel}
        aria-label={`Voir ${product.title}`}
        className="relative block aspect-square overflow-hidden bg-blanc"
      >
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- images affiliées externes multi-domaines
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-pierre/30">
            <span className="font-pixel text-[8px] tracking-wider">CUBECRAFT</span>
            <span className="font-inter text-[10px]">visuel à venir</span>
          </div>
        )}
        {product.merchant ? (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 font-inter text-[10px] font-medium text-pierre/60 shadow-sm">
            {product.merchant}
          </span>
        ) : null}
      </a>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-rubik font-bold leading-snug text-pierre text-sm sm:text-base">
          {product.title}
        </h3>
        <p className="mt-1.5 line-clamp-3 font-inter text-xs leading-relaxed text-pierre/60 sm:text-sm">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          {product.price ? (
            <span className="font-rubik font-black text-creeper text-base">
              {product.price}
            </span>
          ) : (
            <span />
          )}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel={rel}
            className="inline-flex items-center gap-1.5 rounded-xl bg-creeper px-4 py-2.5 font-rubik font-bold text-sm text-white shadow-sm transition-all duration-200 hover:scale-105 active:scale-100"
          >
            Voir le produit
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
