import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity , clearCart} from "./actions";
import { formatPrice } from "@/lib/format";
import CheckoutButton from "./CheckoutButton";

export const metadata = {
  title: "Your Cart - Manozon",
};

export default async function CartPage() {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <CheckoutButton cartId={cart?.id || "123"} clearCart= {clearCart}/>
      </div>
    </div>
  );
}
