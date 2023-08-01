"use client";

import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { selectCart } from "@/redux/slice/cart.slice";
import CartProduct from "./components/cartProduct";
import { selectUser } from "@/redux/slice/user.slice";
import UIButton from "@/components/common/button";
import Link from "next/link";
import {
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";

const ShoppingCartPage: FC = () => {
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const completeVerificationAndCart = () => {
    if (!user.email_verified || !user.Mobile_No_verified) {
      dispatch(
        setNotification({
          message: "Please verify your email and mobile number",
          type: "warning",
        })
      );
      return dispatch(showNotification());
    }

    if (!cart?.length) {
      dispatch(
        setNotification({
          message: "Empty cart",
          type: "warning",
          content: "Please add items to your cart before proceeding",
        })
      );
      return dispatch(showNotification());
    }
  };

  return !!cart?.length ? (
    <div className="flex h-full w-full flex-col gap-3">
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
      {/* {user.email_verified && user.Mobile_No_verified && !!cart?.length ? ( */}
      <Link href="/user/cart/address" className="ml-auto w-fit">
        <UIButton className="w-fit rounded-sm border-none bg-sanskrutiRed px-[3.25rem] font-bold text-white hover:outline-sanskrutiRedLight">
          PROCEED
        </UIButton>
      </Link>
      {/* ) : (
        <UIButton
          onClick={completeVerificationAndCart}
          className="ml-auto w-fit rounded-sm border-none bg-red-900 px-[3.25rem] font-bold text-white hover:outline-sanskrutiRedLight"
        >
          PROCEED
        </UIButton>
      )} */}
    </div>
  ) : (
    <div className="w-full pt-5 text-center text-lg font-normal">
      <span>Cart is currently empty. Explore and find your fashion at</span>{" "}
      <Link href="/" className="text-sanskrutiRed underline">
        Sanskruti
      </Link>
    </div>
  );
};

export default ShoppingCartPage;
