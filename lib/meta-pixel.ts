import type { Cart, Product, ProductVariant } from "lib/shopify/types";

declare global {
  interface Window {
    fbq?: (
      command: "track" | "init" | "consent",
      eventNameOrPixelId: string,
      parameters?: Record<string, unknown>,
    ) => void;
  }
}

type MetaContent = {
  id: string;
  quantity: number;
  item_price: number;
};

type MetaCommercePayload = {
  content_ids: string[];
  content_name: string;
  content_type: "product";
  contents: MetaContent[];
  currency: string;
  num_items: number;
  value: number;
};

type MetaProductPayloadInput = {
  contentId: string;
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

export function trackMetaEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  window.fbq("track", eventName, parameters);
}

export function buildMetaProductPayload({
  contentId,
  title,
  price,
  currency,
  quantity = 1,
  variantTitle,
}: MetaProductPayloadInput): MetaCommercePayload {
  const normalizedPrice = toNumber(price);
  const name =
    variantTitle && variantTitle !== "Default Title"
      ? `${title} - ${variantTitle}`
      : title;

  return {
    content_ids: [contentId],
    content_name: name,
    content_type: "product",
    contents: [
      {
        id: contentId,
        quantity,
        item_price: normalizedPrice,
      },
    ],
    currency,
    num_items: quantity,
    value: normalizedPrice * quantity,
  };
}

export function buildProductMetaPayload(
  product: Product,
  variant: ProductVariant,
  quantity = 1,
): MetaCommercePayload {
  return buildMetaProductPayload({
    contentId: variant.id,
    title: product.title,
    price: variant.price.amount,
    currency: variant.price.currencyCode,
    quantity,
    variantTitle: variant.title,
  });
}

export function buildCartMetaPayload(cart: Cart): MetaCommercePayload {
  const contents = cart.lines.map((item) => {
    const itemPrice = toNumber(item.cost.totalAmount.amount) / item.quantity;

    return {
      id: item.merchandise.id,
      quantity: item.quantity,
      item_price: itemPrice,
    };
  });

  return {
    content_ids: contents.map((item) => item.id),
    content_name:
      contents.length === 1
        ? cart.lines[0]?.merchandise.product.title || "Cart"
        : "CubeCraft Cart",
    content_type: "product",
    contents,
    currency: cart.cost.totalAmount.currencyCode,
    num_items: cart.totalQuantity,
    value: toNumber(cart.cost.totalAmount.amount),
  };
}
