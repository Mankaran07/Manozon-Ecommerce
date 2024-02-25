"use client";

import { redirect } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface CheckoutButtonProps {
  cartId: string;
  clearCart: (cartId: string) => Promise<{ message: string } | undefined>;
}

export default function CheckoutButton({
  cartId,
  clearCart,
}: CheckoutButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [countdown, setCountdown] = useState(6);
  if (countdown === 0) redirect("/");

  const updateCountdown = () => {
    setCountdown((prevCountdown) => prevCountdown - 1);
    setTimeout(updateCountdown, 1000);
  };
  useEffect(() => {
    setTimeout(updateCountdown, 1000);

    return () => {
      clearTimeout(updateCountdown as any);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn-primary btn sticky sm:w-[200px]"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            const result = await clearCart(cartId);
            if (result && result.message) {
              if (result.message === "Login") {
                setCheckLogin(true);
              } else {
                setCartEmpty(true);
              }
              return;
            }
            setSuccess(true);
          });
        }}
      >
        Checkout
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && redirect("/success")}
      {!isPending && cartEmpty && (
        <div className="flex flex-col">
          <span className="text-error">
            Cart is empty.Please Add Some Products
          </span>
          <p className="text-sm text-zinc-700">
            Redirecting to the home page in {countdown} seconds...
          </p>
        </div>
      )}
      {!isPending && checkLogin && (
        <div className="flex flex-col">
        <span className="text-error">
          Login First!!!
        </span>
        <p className="text-sm text-zinc-700">
          Redirecting to the home page in {countdown} seconds...
        </p>
      </div>
      )}
    </div>
  );
}
