"use server";

import { TAGS } from "lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "lib/shopify";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    updateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      updateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout() {
  let cart = await getCart();
  redirect(cart!.checkoutUrl);
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set("cartId", cart.id!);
}

export async function addItemAndCheckout(variantId: string, quantity = 1, extraVariantId?: string) {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;
  if (!cartId) {
    const newCart = await createCart();
    cartId = newCart.id!;
    cookieStore.set("cartId", cartId);
  }

  const items: { merchandiseId: string; quantity: number }[] = [{ merchandiseId: variantId, quantity }];
  if (extraVariantId) items.push({ merchandiseId: extraVariantId, quantity: 1 });

  let cart;
  try {
    cart = await addToCart(items, cartId);
    if (!cart?.checkoutUrl) throw new Error("invalid cart");
  } catch {
    // Panier expiré ou invalide — on en crée un nouveau et on réessaie
    const freshCart = await createCart();
    const freshCartId = freshCart.id!;
    cookieStore.set("cartId", freshCartId);
    cart = await addToCart(items, freshCartId);
  }

  updateTag(TAGS.cart);
  redirect(cart.checkoutUrl);
}
