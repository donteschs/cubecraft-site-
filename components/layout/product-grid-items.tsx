import Price from "components/price";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <li key={product.handle}>
          <Link
            href={`/product/${product.handle}`}
            prefetch={true}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-pierre/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-creeper hover:shadow-xl"
          >
            <div className="relative aspect-square overflow-hidden bg-blanc">
              {product.featuredImage?.url ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-pixel text-[8px] text-pierre/30">
                  CUBECRAFT
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-rubik font-bold text-pierre text-sm leading-snug line-clamp-2 sm:text-base">
                {product.title}
              </h3>
              <div className="mt-auto flex items-center justify-between pt-3">
                <Price
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  className="font-rubik font-black text-creeper text-lg"
                  currencyCodeClassName="hidden"
                />
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-creeper/10 text-creeper transition-colors duration-200 group-hover:bg-creeper group-hover:text-white">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
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
        </li>
      ))}
    </>
  );
}
