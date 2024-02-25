"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: { quantity },
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
  }
  revalidatePath("/cart");
}

export async function clearCart(cartId: string) {
  if (cartId === "123") {
    return {
      message: "Cart is empty.Please Add Some Products",
    };
  }
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
  });
  if (!!cart?.userId === false) {
    return {
      message: "Login",
    };
  }
  await prisma.cartItem.deleteMany({
    where: { cartId: cartId },
  });
  await prisma.cart.delete({
    where: { id: cartId },
  });
}
