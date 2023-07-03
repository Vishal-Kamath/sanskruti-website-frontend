"use client";

import { selectCart } from "@/redux/slice/cart.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC } from "react";

const Total: FC = () => {
  const cart = useAppSelector(selectCart);
  if (!cart.cart || cart.cart?.length === 0) return null;

  const totalArray: number[] = [];
  const discountArray: number[] = [];
  const gstArray: number[] = [];

  cart.cart.map((cartItem) => {
    const combination =
      cartItem.product.varients.variations.find(
        (variation) =>
          JSON.stringify(variation.combinationString) ===
          JSON.stringify(cartItem.variant)
      ) || cartItem.product.varients.variations[0];
    totalArray.push(combination.price * cartItem.quantity);
    discountArray.push(
      ((combination.discount * combination.price) / 100) * cartItem.quantity
    );
    gstArray.push(
      ((cartItem.product.gst_percent *
        (combination.price -
          (combination.discount * combination.price) / 100)) /
        100) *
        cartItem.quantity
    );
  });

  const total = totalArray.reduce((total, currentVal) => total + currentVal, 0);
  const discount = discountArray.reduce(
    (total, currentVal) => total + currentVal,
    0
  );
  const gst = gstArray.reduce((total, currentVal) => total + currentVal, 0);

  const finalValue = total - discount + gst;
  return (
    <div className="flex w-full flex-col gap-3 border-gray-300 max-lg:border-t-[1px] max-lg:pt-5 lg:h-full lg:max-w-sm lg:border-l-[1px] lg:pl-5">
      <div className="text-xs font-semibold text-gray-500">
        PAYMENT DETAILS (
        {cart.cart.length !== 1 ? `${cart.cart.length} items` : `${cart} item`})
      </div>
      <div className="flex w-full flex-col gap-3 [&>*]:flex [&>*]:w-full [&>*]:justify-between">
        <div>
          <span>Total MRP</span>
          <span>&#8377;{total}</span>
        </div>
        {!!discount && (
          <div>
            <span>Discount</span>
            <span className="text-green-400">-&#8377;{discount}</span>
          </div>
        )}
        {!!gst && (
          <div>
            <span>GST</span>
            <span></span>&#8377;{gst}
          </div>
        )}
        <div className="border-t-[1px] border-gray-300 pt-5 font-bold">
          <span>Total Amount</span>
          <span>&#8377;{finalValue}</span>
        </div>
      </div>
    </div>
  );
};

export default Total;
