"use client";

import { addItemAndCheckout } from "components/cart/actions";
import LoadingDots from "components/loading-dots";
import {
  buildGAProductEventPayload,
  trackGAEvent,
} from "lib/google-analytics";
import { buildProductMetaPayload, trackMetaEvent } from "lib/meta-pixel";
import { buildPinterestProductPayload, trackPinterestEvent } from "lib/pinterest";
import { buildTikTokProductPayload, trackTikTokEvent } from "lib/tiktok";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

/**
 * Bouton « Acheter maintenant » — paiement direct via Shopify Storefront.
 * Crée/réutilise un panier Shopify, ajoute la variante sélectionnée et
 * redirige vers le checkout Shopify (checkoutUrl) via addItemAndCheckout.
 */
export function BuyNowButton({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const variant = variants.find((v: ProductVariant) =>
    v.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find((v) => v.id === selectedVariantId);

  const disabled = !availableForSale || !selectedVariantId || pending;

  function handleBuyNow() {
    if (!selectedVariantId || !finalVariant) return;

    trackMetaEvent(
      "InitiateCheckout",
      buildProductMetaPayload(product, finalVariant),
    );
    trackGAEvent(
      "begin_checkout",
      buildGAProductEventPayload(product, finalVariant),
    );
    trackPinterestEvent(
      "checkout",
      buildPinterestProductPayload(product, finalVariant),
    );
    trackTikTokEvent(
      "InitiateCheckout",
      buildTikTokProductPayload(product, finalVariant),
    );

    startTransition(async () => {
      await addItemAndCheckout(selectedVariantId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      disabled={disabled}
      aria-label="Acheter maintenant"
      className={`relative flex w-full items-center justify-center gap-2 rounded-xl bg-or p-4 font-rubik font-black tracking-wide text-dark shadow-lg shadow-or/30 transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:scale-[1.02] active:scale-100"
      }`}
    >
      {pending ? (
        <LoadingDots className="bg-dark" />
      ) : (
        <>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {availableForSale ? "Acheter maintenant" : "Rupture de stock"}
        </>
      )}
    </button>
  );
}
