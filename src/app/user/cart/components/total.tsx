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
    <div className="w-full max-w-md">
      <table>
        <tbody>
          <tr>
            <td>Total MRP</td>
            <td>{total}</td>
          </tr>
          {!!discount && (
            <tr>
              <td>Discount</td>
              <td>-{discount}</td>
            </tr>
          )}
          {!!gst && (
            <tr>
              <td>GST</td>
              <td>{gst}</td>
            </tr>
          )}
          <tr>
            <td>Total Amount</td>
            <td>{finalValue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Total;
