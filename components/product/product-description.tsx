import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

const STARS = "★★★★★";

const REASSURANCE = [
  { label: "Certifié CE & EN 71" },
  { label: "Sans écran, 100 % réel" },
  { label: "Garantie 30 jours" },
  { label: "Livraison 4-5 jours" },
];

export function ProductDescription({ product }: { product: Product }) {
  const category = product.tags?.[0];

  return (
    <div className="flex flex-col">
      {category ? (
        <span className="w-fit font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-3 py-1.5 rounded-sm tracking-wider">
          {category.toUpperCase()}
        </span>
      ) : null}

      <h1 className="mt-4 font-rubik font-black text-pierre text-3xl leading-tight sm:text-4xl">
        {product.title}
      </h1>

      {/* Note */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-or text-lg tracking-tight" aria-label="Note 4.9 sur 5">
          {STARS}
        </span>
        <span className="font-inter text-sm text-pierre/60">
          <strong className="text-pierre">4,9/5</strong> · familles conquises
        </span>
      </div>

      {/* Prix */}
      <div className="mt-5 flex items-end gap-3">
        <Price
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          className="font-rubik font-black text-creeper text-4xl sm:text-5xl"
          currencyCodeClassName="hidden"
        />
        <span className="mb-1.5 font-pixel text-[9px] text-or-dark bg-or/15 border border-or/30 px-2 py-1 rounded-sm tracking-wider">
          OFFRE LANCEMENT
        </span>
      </div>
      <p className="mt-1 font-inter text-xs text-pierre/50">
        Prix TTC · Paiement 100 % sécurisé
      </p>

      {/* Réassurance */}
      <ul className="mt-5 grid grid-cols-2 gap-2">
        {REASSURANCE.map((r) => (
          <li
            key={r.label}
            className="flex items-center gap-2 rounded-lg border border-pierre/10 bg-blanc px-3 py-2 font-inter text-xs text-pierre/80"
          >
            <svg className="h-4 w-4 flex-shrink-0 text-creeper" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z" clipRule="evenodd" />
            </svg>
            {r.label}
          </li>
        ))}
      </ul>

      {/* Variantes */}
      <div className="mt-6">
        <VariantSelector options={product.options} variants={product.variants} />
      </div>

      {/* Ajouter au panier (sticky mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-pierre/10 bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto md:mt-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none">
        <AddToCart product={product} />
        <p className="mt-3 text-center font-inter text-xs text-pierre/50 md:text-left">
          ✓ Garantie 30 jours &nbsp;·&nbsp; ✓ Livraison 4-5 j &nbsp;·&nbsp; ✓ Retours gratuits
        </p>
      </div>

      {/* Description produit */}
      {product.descriptionHtml ? (
        <Prose
          className="mt-8 border-t border-pierre/10 pt-6 text-sm leading-relaxed text-pierre/80"
          html={product.descriptionHtml}
        />
      ) : null}
    </div>
  );
}
