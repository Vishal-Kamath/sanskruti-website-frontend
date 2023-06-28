"use client";

import { FC, useEffect } from "react";
import Container from "../components/container";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import axios from "axios";
import { CartType, selectCart, setCart } from "@/redux/slice/cart.slice";
import CartProduct from "./components/cartProduct";
import { selectUser } from "@/redux/slice/user.slice";
import Link from "next/link";
import UIButton from "@/components/common/button";

const ShoppingCartPage: FC = () => {
  const dispatch = useAppDispatch();
  // const cart = useAppSelector(selectCart);
  const cart: CartType = {
    cart: [],
  };

  const user = useAppSelector(selectUser);

  const getCartDetails = async () => {
    const cartDetails = await axios.get<CartType>(
      `${process.env.ENDPOINT}/api/v1/user/cart`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(setCart({ cart: cartDetails.data.cart }));
  };

  useEffect(() => {
    // getCartDetails()
  }, []);

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
      {cart.cart.map((cartItem) => (
        <CartProduct key={cartItem._id} {...cartItem} />
      ))}
      <UIButton className="w-fit px-3 py-2">
        <Link href="/user/cart/address">Next</Link>
      </UIButton>
    </div>
  );
};

export default ShoppingCartPage;
