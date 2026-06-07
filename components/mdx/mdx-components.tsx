import { AffiliateProductCard } from "components/affiliate/affiliate-product-card";
import { AffiliateDisclosure } from "components/affiliate/affiliate-disclosure";
import { AffiliateProductGrid } from "components/affiliate/affiliate-product-grid";
import { NewsletterBlock } from "components/newsletter/newsletter-block";
import { getAffiliateProductsByIds } from "lib/affiliate/products";

/**
 * Composants exposés aux articles MDX (next-mdx-remote).
 *
 * Dans n'importe quel article .mdx, on peut désormais écrire :
 *   <AffiliateGrid title="Notre sélection" ids={["sac-rangement-jouets-tapis"]} />
 *   <AffiliateGrid title="Accessoires" category="accessoires" />
 *   <AffiliateCard id="time-timer-visuel-enfant" />
 *   <Newsletter />
 *   <Disclosure />
 */
function AffiliateCardById({ id }: { id: string }) {
  const [product] = getAffiliateProductsByIds([id]);
  if (!product) return null;
  return (
    <div className="not-prose my-6 max-w-sm">
      <AffiliateProductCard product={product} />
    </div>
  );
}

export const mdxComponents = {
  AffiliateGrid: AffiliateProductGrid,
  AffiliateCard: AffiliateCardById,
  Newsletter: NewsletterBlock,
  Disclosure: AffiliateDisclosure,
};
