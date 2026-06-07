import { AffiliateProductCard } from "components/affiliate/affiliate-product-card";
import { AffiliateDisclosure } from "components/affiliate/affiliate-disclosure";
import {
  getAffiliateProductsByCategory,
  getAffiliateProductsByIds,
  type AffiliateCategory,
  type AffiliateProduct,
} from "lib/affiliate/products";

/**
 * Grille de produits affiliés — « Notre sélection », « Accessoires recommandés »…
 *
 * Utilisable directement dans les articles MDX :
 *   <AffiliateGrid title="Notre sélection" ids={["sac-rangement-jouets-tapis"]} />
 *   <AffiliateGrid title="Accessoires" category="accessoires" />
 *
 * Résout les produits depuis lib/affiliate/products.ts (source unique).
 */
type AffiliateProductGridProps = {
  title?: string;
  /** IDs explicites (priorité sur category) */
  ids?: string[];
  /** Ou bien toute une catégorie */
  category?: AffiliateCategory;
  /** Ou bien des produits déjà résolus (usage avancé) */
  products?: AffiliateProduct[];
  /** Affiche la mention liens affiliés (true par défaut) */
  disclosure?: boolean;
};

export function AffiliateProductGrid({
  title = "Notre sélection",
  ids,
  category,
  products,
  disclosure = true,
}: AffiliateProductGridProps) {
  const list =
    products ??
    (ids
      ? getAffiliateProductsByIds(ids)
      : category
        ? getAffiliateProductsByCategory(category)
        : []);

  if (list.length === 0) return null;

  return (
    <section className="not-prose my-10">
      {title ? (
        <div className="mb-5 flex items-center gap-3">
          <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-2.5 py-1 rounded-sm tracking-wider">
            SÉLECTION
          </span>
          <h3 className="font-rubik font-black text-pierre text-xl sm:text-2xl">
            {title}
          </h3>
        </div>
      ) : null}

      {disclosure ? <AffiliateDisclosure className="mb-5" /> : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((product) => (
          <AffiliateProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
