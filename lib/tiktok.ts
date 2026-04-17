import type { Cart, Product, ProductVariant } from "lib/shopify/types";

declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      identify: (params: Record<string, unknown>) => void;
      page: () => void;
    };
  }
}

type TikTokContent = {
  content_id: string;
  content_type: "product";
  content_name: string;
};

type TikTokPayload = {
  contents: TikTokContent[];
  value: number;
  currency: string;
};

export function trackTikTokEvent(event: string, payload?: TikTokPayload) {
  if (typeof window === "undefined" || !window.ttq) return;
  window.ttq.track(event, payload as Record<string, unknown>);
}

export function buildTikTokProductPayload(
  product: Product,
  variant: ProductVariant,
  quantity = 1,
): TikTokPayload {
  return {
    contents: [
      {
        content_id: variant.id,
        content_type: "product",
        content_name: product.title,
      },
    ],
    value: Number(variant.price.amount) * quantity,
    currency: variant.price.currencyCode,
  };
}

export function buildTikTokCartPayload(cart: Cart): TikTokPayload {
  return {
    contents: cart.lines.map((line) => ({
      content_id: line.merchandise.id,
      content_type: "product" as const,
      content_name: line.merchandise.product.title,
    })),
    value: Number(cart.cost.totalAmount.amount),
    currency: cart.cost.totalAmount.currencyCode,
  };
}
