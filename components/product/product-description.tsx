import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-4 flex flex-col border-b pb-4 dark:border-neutral-700 md:mb-6 md:pb-6">
        <h1 className="mb-2 text-2xl font-medium sm:text-4xl lg:text-5xl">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 px-4 py-2 text-base font-semibold text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-relaxed dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-black md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none dark:md:bg-transparent">
        <AddToCart product={product} />
      </div>
    </>
  );
}
