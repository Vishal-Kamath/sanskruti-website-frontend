"use client";

import UIButton from "@/components/common/button";
import { selectCart } from "@/redux/slice/cart.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { useAddressState } from "../utils/hook";
import {
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { getAmounts } from "../utils/calculation";
import axios from "axios";
import { useRouter } from "next/navigation";

const CartPaymemtPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cart = useAppSelector(selectCart);

  const [shippingAddress] = useAddressState("shippingAddress");
  const [billingAddress] = useAddressState("billingAddress");

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleFillAllDetails = () => {
    if (!cart || !cart.length) {
      dispatch(
        setNotification({
          message: "Empty cart",
          content: "Please add items to your cart",
          type: "warning",
        })
      );
      return dispatch(showNotification());
    }
    if (!shippingAddress || !billingAddress) {
      dispatch(
        setNotification({
          message: "Please fill the shipping and billing address",
          type: "warning",
        })
      );
      return dispatch(showNotification());
    }
    if (!paymentMethod) {
      dispatch(
        setNotification({
          message: "Please enter the payment method",
          type: "warning",
        })
      );
      return dispatch(showNotification());
    }
  };

  const payment = async () => {
    const { total, discount, gst, finalValue } = getAmounts(cart);
    window.open(
      "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
    );
    // const body = {
    //   paymentMethod,
    //   shippingAddress,
    //   billingAddress,
    //   SubTotal: total,
    //   discount,
    //   gst,
    //   Amount: finalValue,
    // };

    // axios
    //   .post(`${process.env.ENDPOINT}/api/v1/user/order`, body, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     const response = res.data;
    //     dispatch(
    //       setNotification({ message: response.message, type: response.type })
    //     );
    //     dispatch(showNotification());
    //     router.replace("/user/order");
    //   })
    //   .catch((err) => {
    //     const response = err.response.data;
    //     dispatch(
    //       setNotification({
    //         message: response.message,
    //         type: response.type,
    //       })
    //     );
    //     dispatch(showNotification());
    //   });
  };

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <Link href="/user/cart/address" className="w-fit">
        <UIButton className="w-fit rounded-sm border-[1px] border-slate-400 px-5">
          Back
        </UIButton>
      </Link>

      {/* Products */}
      <div className="flex flex-col gap-2">
        {cart.map((cartItem) => {
          const combination = cartItem.product.varients.variations.find(
            (variation) =>
              JSON.stringify(variation.combinationString) ===
              JSON.stringify(cartItem.variant)
          )!;

          const filteredChildrenAttributes =
            cartItem.product.varients.attributes.map((attr) => {
              const childern = attr.childern.filter((child) => child.state);
              const attribute = { ...attr, childern };
              return attribute;
            });

          const filteredAttributes = filteredChildrenAttributes.filter(
            (attr) => !!attr.childern.length
          );
          return (
            <div
              key={cartItem.product._id + cartItem.variant.toString()}
              className="flex gap-2 rounded-md border-[1px] border-gray-300 p-3"
            >
              <Image
                src={cartItem.product.images[0]}
                alt={cartItem.product.name + "cart item image"}
                width={50}
                height={50}
                className="h-full w-[4rem] rounded-sm bg-slate-200 object-contain object-center"
              />

              <div className="flex w-full flex-col gap-1">
                <h3>
                  {cartItem.product.name.length > 35
                    ? `${cartItem.product.name.slice(0, 35)}...`
                    : cartItem.product.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {cartItem.product.brand_name}
                </p>

                <div className="mt-auto flex flex-wrap gap-1 text-xs">
                  {filteredAttributes.map((attr, index) => (
                    <span
                      key={attr.name + cartItem.product.name + index}
                      className="rounded-full border-[1px] border-slate-300 bg-slate-50 px-2 py-1"
                    >
                      {attr.name}: {combination.combinationString[index]}
                    </span>
                  ))}
                  <span className="rounded-full border-[1px] border-slate-300 bg-slate-50 px-2 py-1">
                    quantity: {cartItem.quantity}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <span>Shipping Address</span>
        <div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-300 px-3 py-2">
          <h2>{shippingAddress?.fullName}</h2>
          <p className="text-gray-500">
            {shippingAddress?.landmark} {shippingAddress?.nearBy}{" "}
            {shippingAddress?.city} {shippingAddress?.state}{" "}
            {shippingAddress?.pincode}
          </p>
        </div>
        <span>Billing Address</span>
        <div className="flex flex-col gap-1 rounded-md border-[1px] border-gray-300 px-3 py-2">
          <h2>{billingAddress?.fullName}</h2>
          <p className="text-gray-500">
            {billingAddress?.landmark} {billingAddress?.nearBy}{" "}
            {billingAddress?.city} {billingAddress?.state}{" "}
            {billingAddress?.pincode}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span>Payment Method</span>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1">
            <input
              type="radio"
              name="payment"
              id="COD"
              value="COD"
              checked={"COD" === paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="COD">Cash on delivery</label>
          </div>
          <div className="flex gap-1">
            <input
              type="radio"
              name="payment"
              id="PayZapp"
              value="PayZapp"
              checked={"PayZapp" === paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="PayZapp">PayZapp</label>
          </div>
        </div>
      </div>

      {cart &&
      cart.length &&
      shippingAddress &&
      billingAddress &&
      paymentMethod ? (
        <UIButton
          onClick={payment}
          className="ml-auto w-fit rounded-sm border-none bg-sanskrutiRed px-[3.25rem] font-bold text-white hover:outline-sanskrutiRedLight"
        >
          PAYMENT
        </UIButton>
      ) : (
        <UIButton
          onClick={handleFillAllDetails}
          className="ml-auto w-fit rounded-sm border-none bg-red-900 px-[3.25rem] font-bold text-white hover:outline-sanskrutiRedLight"
        >
          PAYMENT
        </UIButton>
      )}
    </div>
  );
};

export default CartPaymemtPage;
