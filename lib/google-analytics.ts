import type { Cart, Product, ProductVariant } from "lib/shopify/types";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      eventNameOrId: string | Date,
      parameters?: Record<string, unknown>,
    ) => void;
  }
}

type GAItem = {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
};

type GACommercePayload = {
  currency: string;
  value: number;
  items: GAItem[];
};

type GAProductPayloadInput = {
  itemId: string;
  title: string;
  price: number | string;
  currency: string;
  quantity?: number;
  variantTitle?: string;
};

function toNumber(amount: number | string): number {
  const parsed = typeof amount === "number" ? amount : Number(amount);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function trackGAEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, parameters);
}

export function buildGAProductPayload({
  itemId,
  title,
  price,
  currency,
  quantity = 1,
  variantTitle,
}: GAProductPayloadInput): GACommercePayload {
  const normalizedPrice = toNumber(price);

  return {
    currency,
    value: normalizedPrice * quantity,
    items: [
      {
        item_id: itemId,
        item_name: title,
        item_brand: "CubeCraft",
        item_variant:
          variantTitle && variantTitle !== "Default Title" ? variantTitle : undefined,
        price: normalizedPrice,
        quantity,
      },
    ],
  };
}

export function buildGAProductEventPayload(
  product: Product,
  variant: ProductVariant,
  quantity = 1,
): GACommercePayload {
  return buildGAProductPayload({
    itemId: variant.id,
    title: product.title,
    price: variant.price.amount,
    currency: variant.price.currencyCode,
    quantity,
    variantTitle: variant.title,
  });
}

export function buildGACartPayload(cart: Cart): GACommercePayload {
  return {
    currency: cart.cost.totalAmount.currencyCode,
    value: toNumber(cart.cost.totalAmount.amount),
    items: cart.lines.map((item) => ({
      item_id: item.merchandise.id,
      item_name: item.merchandise.product.title,
      item_brand: "CubeCraft",
      item_variant:
        item.merchandise.title && item.merchandise.title !== "Default Title"
          ? item.merchandise.title
          : undefined,
      price: toNumber(item.cost.totalAmount.amount) / item.quantity,
      quantity: item.quantity,
    })),
  };
}
