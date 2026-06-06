export const dynamic = "force-dynamic";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";

export const metadata = {
  title: "Boutique — Tous nos jouets créatifs & éducatifs",
  description:
    "Découvrez toute la boutique CubeCraft : construction magnétique, STEM, créatif, Montessori et jeux en famille. Des jouets éducatifs anti-écran, certifiés CE & EN 71.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });

  return (
    <>
      {/* En-tête */}
      <div className="mb-8">
        <span className="font-pixel text-[9px] text-creeper bg-creeper/10 border border-creeper/30 px-3 py-1.5 rounded-sm tracking-wider">
          LA BOUTIQUE
        </span>
        <h1 className="mt-4 font-rubik font-black text-pierre text-3xl sm:text-4xl">
          {searchValue ? `Résultats pour « ${searchValue} »` : "Tous nos jouets"}
        </h1>
        <p className="mt-2 font-inter text-sm text-pierre/60">
          {searchValue
            ? products.length === 0
              ? "Aucun produit ne correspond à votre recherche."
              : `${products.length} ${products.length > 1 ? "produits trouvés" : "produit trouvé"}.`
            : "Des jouets créatifs et éducatifs pour remplacer les écrans — certifiés CE & EN 71."}
        </p>
      </div>

      {products.length > 0 ? (
        <Grid className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
