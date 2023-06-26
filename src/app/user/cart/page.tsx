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
    cart: [
      {
        _id: "123456",
        brand_name: "Sanskruti nx",
        description: "Product",
        gst_price: 2000,
        sale_price: 1500,
        images: ["/temp/productImage1.png"],
        is_best_seller: false,
        is_featured: true,
        is_new_arrival: false,
        MainCategory: "Lengha's",
        SubCategory: "Bridal Lengha",
        meta_tittle: "Lengha",
        meta_description: "des",
        meta_keyword: "",
        name: "Product Name",
        quantity: 3,
        slug: "slug",
        varients: {
          attributes: [],
          variations: [],
        },
        variants: [],
      },
      {
        _id: "1234567",
        brand_name: "Sanskruti nx",
        description: "Product",
        gst_price: 2000,
        sale_price: 1500,
        images: ["/temp/productImage2.png"],
        is_best_seller: false,
        is_featured: true,
        is_new_arrival: false,
        MainCategory: "Lengha's",
        SubCategory: "Bridal Lengha",
        meta_tittle: "Lengha",
        meta_description: "des",
        meta_keyword: "",
        name: "Product Name",
        quantity: 3,
        slug: "slug",
        varients: {
          attributes: [],
          variations: [],
        },
        variants: [],
      },
      {
        _id: "12345678",
        brand_name: "Sanskruti nx",
        description: "Product",
        gst_price: 2000,
        sale_price: 1500,
        images: ["/temp/productImage3.png"],
        is_best_seller: false,
        is_featured: true,
        is_new_arrival: false,
        MainCategory: "Lengha's",
        SubCategory: "Bridal Lengha",
        meta_tittle: "Lengha",
        meta_description: "des",
        meta_keyword: "",
        name: "Product Name",
        quantity: 3,
        slug: "slug",
        varients: {
          attributes: [],
          variations: [],
        },
        variants: [],
      },
    ],
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
