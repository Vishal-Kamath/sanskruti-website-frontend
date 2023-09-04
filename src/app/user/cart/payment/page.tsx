"use client";

import UIButton from "@/components/common/button";
import {
  selectCart,
  selectCouponDiscount,
  setCouponDiscount,
} from "@/redux/slice/cart.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useAddressState } from "../utils/hook";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { getAmounts } from "../utils/calculation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsArrowLeft, BsDot } from "react-icons/bs";
import Total from "../components/total";
import { cn } from "@/utils/lib";

type PaymentStatus = {
  payZapp: boolean;
  cashondelivery: boolean;
};

const CartPaymemtPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cart = useAppSelector(selectCart);
  const couponDiscount = useAppSelector(selectCouponDiscount);

  const [shippingAddress] = useAddressState("shippingAddress");
  const [billingAddress] = useAddressState("billingAddress");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setpaymentStatus] = useState<PaymentStatus>();

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

    const body = {
      paymentMethod,
      shippingAddress,
      billingAddress,
      SubTotal: total,
      discount,
      couponCode: couponDiscount?.code,
      gst,
      Amount: finalValue,
    };

    axios
      .post<{ link?: string; orderId: string } & NotificationType>(
        `${process.env.ENDPOINT}/api/v1/user/order`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const response = res.data;
        if (response.link) return (window.location.href = response.link);
        dispatch(
          setCouponDiscount({
            code: "",
            discount: 0,
          })
        );

        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());
        router.replace(`/user/order/status?orderId=${response.orderId}`);
      })
      .catch((err) => {
        const response = err.response.data;
        dispatch(
          setNotification({
            message: response.message,
            type: response.type,
          })
        );
        dispatch(showNotification());
      });
  };

  useEffect(() => {
    axios
      .get<PaymentStatus>(
        `${process.env.ENDPOINT}/api/v1/user/config/paymentStatus`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setpaymentStatus(res.data);
      })
      .catch();
  }, []);

  return (
    <div className="flex w-full gap-5 max-lg:flex-col">
      <div className="flex h-full w-full flex-col gap-8">
        <Link
          href="/user/cart/address"
          className="w-fit rounded-full border-[1px] border-gray-300 px-6 py-1 hover:bg-gray-100"
        >
          <BsArrowLeft className="h-6 w-auto" />
        </Link>

        {/* Products */}
        <div className="flex flex-col gap-4">
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
                className="flex gap-4 rounded-lg border-[1px] border-gray-300 p-3"
              >
                <Image
                  src={cartItem.product.images[0]}
                  alt={cartItem.product.name + "cart item image"}
                  width={50}
                  height={50}
                  className="h-full w-[6rem] rounded-sm bg-slate-200 object-cover object-center"
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

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 rounded-lg border-[1px] border-gray-300 px-3 py-4">
            <h2>Shipping Address - {shippingAddress?.name}</h2>
            <h4 className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
              <span>{shippingAddress?.email}</span>
              <BsDot className="h-4 w-4" />
              <span>+{shippingAddress?.tel}</span>
            </h4>
            <p className="mt-3 text-justify text-gray-500">
              {shippingAddress?.address} {shippingAddress?.city}{" "}
              {shippingAddress?.state} {shippingAddress?.zip}{" "}
              {shippingAddress?.country}
            </p>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border-[1px] border-gray-300 px-3 py-4">
            <h2>Billing Address - {billingAddress?.name}</h2>
            <h4 className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
              <span>{billingAddress?.email}</span>
              <BsDot className="h-4 w-4" />
              <span>+{billingAddress?.tel}</span>
            </h4>
            <p className="mt-3 text-justify text-gray-500">
              {billingAddress?.address} {billingAddress?.city}{" "}
              {billingAddress?.state} {billingAddress?.zip}{" "}
              {billingAddress?.country}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span>Payment Method</span>

          {!paymentStatus?.cashondelivery && !paymentStatus?.payZapp && (
            <span>No Payment Method found</span>
          )}
          <div className="flex w-full gap-4">
            {paymentStatus?.cashondelivery && (
              <div className="relative w-full md:w-[12rem]">
                <input
                  type="radio"
                  name="payment"
                  id="COD"
                  value="COD"
                  checked={"COD" === paymentMethod}
                  className="hidden"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label
                  htmlFor="COD"
                  className={cn(
                    "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-[1px] py-3",
                    paymentMethod === "COD"
                      ? "border-sky-600 outline outline-4 outline-sky-50 hover:outline-sky-200"
                      : "border-gray-300 hover:border-gray-600 hover:outline hover:outline-4 hover:outline-gray-200"
                  )}
                >
                  <Image
                    alt="cash on delivery"
                    src="/assets/paymentIcons/cashondelivery.png"
                    width={100}
                    height={100}
                    className="h-16 w-16"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            )}
            {paymentStatus?.payZapp && (
              <div className="relative w-full md:w-[12rem]">
                <input
                  type="radio"
                  name="payment"
                  id="PayZapp"
                  value="PayZapp"
                  checked={"PayZapp" === paymentMethod}
                  className="hidden"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label
                  htmlFor="PayZapp"
                  className={cn(
                    "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-[1px] py-3",
                    paymentMethod === "PayZapp"
                      ? "border-sky-600 outline outline-4 outline-sky-50 hover:outline-sky-200"
                      : "border-gray-300 hover:border-gray-600 hover:outline hover:outline-4 hover:outline-gray-200"
                  )}
                >
                  <Image
                    alt="cash on delivery"
                    src="/assets/paymentIcons/payzapp.png"
                    width={100}
                    height={100}
                    className="h-16 w-16"
                  />
                  <span>PayZapp</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      <Total>
        {cart &&
        cart.length &&
        shippingAddress &&
        billingAddress &&
        paymentMethod ? (
          <UIButton
            onClick={payment}
            className="w-full rounded-full border-none bg-sanskrutiRed font-bold text-white opacity-75 hover:opacity-100 hover:outline-sanskrutiRedLight"
          >
            CHECKOUT
          </UIButton>
        ) : (
          <UIButton
            onClick={handleFillAllDetails}
            className="w-full rounded-full border-none bg-red-900 font-bold text-white opacity-75 hover:opacity-100 hover:outline-sanskrutiRedLight"
          >
            CHECKOUT
          </UIButton>
        )}
      </Total>
    </div>
  );
};

export default CartPaymemtPage;
