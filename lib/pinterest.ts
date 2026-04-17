import type { Cart, Product, ProductVariant } from "lib/shopify/types";

declare global {
  interface Window {
    pintrk?: (
      command: string,
      eventNameOrTagId: string,
      parameters?: Record<string, unknown>,
    ) => void;
  }
}

export function trackPinterestEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || typeof window.pintrk !== "function") {
    return;
  }
  const eventId = `${eventName}-${Date.now()}`;
  // Client-side pixel
  window.pintrk("track", eventName, { event_id: eventId, ...parameters });
  // Server-side Conversions API (fire-and-forget)
  fetch("/api/pinterest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      user_data: { url: window.location.href },
      custom_data: parameters,
    }),
  }).catch(() => {});
}

export function buildPinterestProductPayload(
  product: Product,
  variant: ProductVariant,
  quantity = 1,
) {
  return {
    value: Number(variant.price.amount) * quantity,
    order_quantity: quantity,
    currency: variant.price.currencyCode,
    line_items: [
      {
        product_name: product.title,
        product_id: variant.id,
        product_price: Number(variant.price.amount),
        product_quantity: quantity,
      },
    ],
  };
}

export function buildPinterestCartPayload(cart: Cart) {
  return {
    value: Number(cart.cost.totalAmount.amount),
    order_quantity: cart.totalQuantity,
    currency: cart.cost.totalAmount.currencyCode,
    line_items: cart.lines.map((line) => ({
      product_name: line.merchandise.product.title,
      product_id: line.merchandise.id,
      product_price: Number(line.cost.totalAmount.amount) / line.quantity,
      product_quantity: line.quantity,
    })),
  };
}
