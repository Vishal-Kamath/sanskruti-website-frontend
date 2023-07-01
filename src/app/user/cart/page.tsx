"use client";

import { FC } from "react";
import { useAppSelector } from "@/redux/store/hooks";
import { selectCart } from "@/redux/slice/cart.slice";
import CartProduct from "./components/cartProduct";
import { selectUser } from "@/redux/slice/user.slice";
import Link from "next/link";
import UIButton from "@/components/common/button";

const ShoppingCartPage: FC = () => {
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);

  return (
    <div className="flex flex-col gap-2">
      {!user.email_verified && (
        <div className="rounded-md border-2 border-amber-300 bg-amber-50 p-3 text-amber-400">
          Please verify your email before proceding
        </div>
      )}
      {!user.Mobile_No_verified && (
        <div className="rounded-md border-2 border-amber-300 bg-amber-50 p-3 text-amber-400">
          Please verify your mobile number before proceding
        </div>
      )}
      {cart.cart.map((cartItem, index) => (
        <CartProduct key={cartItem.product.name + index} {...cartItem} />
      ))}
      <UIButton className="w-fit px-3 py-2">
        <Link href="/user/cart/address">Next</Link>
      </UIButton>
    </div>
  );
};

export default ShoppingCartPage;
