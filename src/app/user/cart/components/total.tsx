"use client";

import UIButton from "@/components/common/button";
import { selectCart } from "@/redux/slice/cart.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC } from "react";
import { AiOutlineTag } from "react-icons/ai";
import { getAmounts } from "../utils/calculation";

const Total: FC = () => {
  const cart = useAppSelector(selectCart);
  if (!cart || cart?.length === 0) return null;

  const { total, discount, gst, finalValue } = getAmounts(cart);

  return (
    <div className="flex w-full flex-col gap-3 border-gray-300 max-lg:border-t-[1px] max-lg:pt-5 lg:h-full lg:max-w-sm lg:border-l-[1px] lg:pl-5">
      {/* coupons */}
      <div className="text-xs font-medium text-gray-500">COUPONS</div>
      <div className="flex justify-between border-b-[1px] border-gray-300 pb-3 text-xs">
        <div className="flex items-center gap-2 font-bold">
          <AiOutlineTag className="h-4 w-4" />
          Apply Coupons
        </div>

        <UIButton className="w-fit rounded-sm border-[1px] border-sanskrutiRed px-3 py-1 text-sanskrutiRed hover:outline-sanskrutiRedLight">
          Apply
        </UIButton>
      </div>
      <div className="text-xs font-semibold text-gray-500">
        PAYMENT DETAILS (
        {cart.length !== 1 ? `${cart.length} items` : `${cart} item`})
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
