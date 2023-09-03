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
import Total from "./components/total";

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
    <div className="flex w-full gap-5 max-lg:flex-col">
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
      </div>
      <Total>
        {/* {user.email_verified && user.Mobile_No_verified && !!cart?.length ? ( */}
        <Link href="/user/cart/address">
          <UIButton className="w-full rounded-full border-none bg-sanskrutiRed font-bold text-white opacity-75 hover:opacity-100 hover:outline-sanskrutiRedLight">
            PROCEED
          </UIButton>
        </Link>
        {/* ) : (
        <UIButton
          onClick={completeVerificationAndCart}
          className="w-full rounded-full border-none bg-red-900 font-bold text-white opacity-75 hover:opacity-100 hover:outline-sanskrutiRedLight"
        >
          PROCEED
        </UIButton>
      )} */}
      </Total>
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
