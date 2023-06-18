"use client";

import { FC, useEffect } from "react";
import Container from "../components/container";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import axios from "axios";
import { CartType, selectCart, setCart } from "@/redux/slice/cart.slice";
import CartProduct from "./components/cartProduct";

const ShoppingCartPage: FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

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
    <Container containerTitle="Shopping Cart">
      <div className="flex flex-col gap-1">
        {cart.cart.map((cartItem) => (
          <CartProduct key={cartItem.name} {...cartItem} />
        ))}
      </div>
    </Container>
  );
};

export default ShoppingCartPage;
