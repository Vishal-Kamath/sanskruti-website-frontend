"use client";

import { FC } from "react";
import { useAppSelector } from "@/redux/store/hooks";
import { selectCart } from "@/redux/slice/cart.slice";
import CartProduct from "./components/cartProduct";
import { selectUser } from "@/redux/slice/user.slice";
import UIButton from "@/components/common/button";
import Link from "next/link";

const ShoppingCartPage: FC = () => {
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);

  return (
    <div className="flex w-full flex-col gap-3">
      {!user.email_verified && (
        <div className="rounded-md border-[1px] border-amber-300 p-3 text-amber-600">
          Please verify your email before proceding
        </div>
      )}
      {!user.Mobile_No_verified && (
        <div className="rounded-md border-[1px] border-amber-300 p-3 text-amber-600">
          Please verify your mobile number before proceding
        </div>
      )}
      {cart?.map((cartItem, index) => (
        <CartProduct
          key={cartItem.product.name + index + "cart item"}
          {...cartItem}
        />
      ))}
      {/* {user.email_verified && user.Mobile_No_verified && ( */}
      <Link href="/user/cart/address" className="w-full">
        <UIButton className="w-full rounded-sm border-none bg-sanskrutiRed font-bold text-white hover:outline-sanskrutiRedLight">
          PROCEED
        </UIButton>
      </Link>
      {/* )} */}
    </div>
  );
};

export default ShoppingCartPage;
