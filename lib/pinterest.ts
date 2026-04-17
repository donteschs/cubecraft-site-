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

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function trackPinterestEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || typeof window.pintrk !== "function") {
    return;
  }
  window.pintrk("track", eventName, { event_id: uid(), ...parameters });
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
