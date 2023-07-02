"use client";

import { CartItem, CartType, setCart } from "@/redux/slice/cart.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FC, useCallback, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const CartProduct: FC<CartItem> = ({ product, variant, quantity }) => {
  const dispatch = useAppDispatch();

  const [quantityState, setQuantityState] = useState(quantity);

  const combination =
    product.varients.variations.find(
      (variation) =>
        JSON.stringify(variation.combinationString) === JSON.stringify(variant)
    ) || product.varients.variations[0];

  console.log(combination);

  const price = !!combination?.discount
    ? combination?.price * ((100 - combination?.discount) / 100)
    : combination?.price;

  const filteredChildrenAttributes = product.varients.attributes.map((attr) => {
    const childern = attr.childern.filter((child) => child.state);
    const attribute = { ...attr, childern };
    return attribute;
  });

  const filteredAttributes = filteredChildrenAttributes.filter(
    (attr) => !!attr.childern.length
  );

  // Link
  const combinationQuery = filteredAttributes
    .map((attr, index) => {
      return attr.name + "=" + combination.combinationString[index];
    })
    .join("&");
  const query =
    JSON.stringify(combination) ===
    JSON.stringify(product.varients.variations[0])
      ? ""
      : `?${combinationQuery}`;
  const link = `/product/${product.slug}` + query;

  // Update Cart Variation
  const updateVariant = async (index: number, value: string) => {
    const newVariantCombinationString = combination.combinationString.map(
      (val, i) => (i === index ? value : val)
    );
    const foundInVariation = product.varients.variations.find(
      (variation) =>
        JSON.stringify(variation.combinationString) ===
        JSON.stringify(newVariantCombinationString)
    );

    if (!foundInVariation) return;

    const cartDetails = await axios.put<CartType>(
      `${process.env.ENDPOINT}/api/v1/user/cart`,
      {
        productId: product._id,
        oldVariant: combination.combinationString,
        newVariant: foundInVariation.combinationString,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (cartDetails.status !== 200) return;
    dispatch(setCart({ cart: cartDetails.data.cart }));
  };

  // Quantity
  const incrementQuantity = (value: number) => {
    if (value > combination.quantity) return;
    setQuantityState(value);
    updateQuantityCallback(value);
  };
  const decrementQuantity = (value: number) => {
    if (value < 1) return;
    setQuantityState(value);
    updateQuantityCallback(value);
  };

  const updateQuantityCallback = useCallback(
    debounce((value: number) => updateQuantity(value), 200),
    [combination]
  );
  const updateQuantity = async (value: number) => {
    const cartDetails = await axios.post<CartType>(
      `${process.env.ENDPOINT}/api/v1/user/cart/quantity`,
      {
        productId: product._id,
        variant: combination.combinationString,
        quantity: value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (cartDetails.status !== 200) return;
    dispatch(setCart({ cart: cartDetails.data.cart }));
  };

  // Remove Form cart
  const removeFromCart = async () => {
    const cartDetails = await axios.delete<CartType>(
      `${process.env.ENDPOINT}/api/v1/user/cart?productId=${product._id}&variant=${combination.combinationString}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (cartDetails.status !== 200) return;
    dispatch(setCart({ cart: cartDetails.data.cart }));
  };

  return (
    <div className="flex w-full gap-3 rounded-md border-[1px] border-gray-300 p-3">
      <Link href={link} className="aspect-[2/2.5] h-32">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={100}
          height={100}
          className="h-32 rounded-[4px]"
        />
      </Link>
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Link href={link} className="text-lg font-medium">
            {product.name.length > 35
              ? `${product.name.slice(0, 35)}...`
              : product.name}
          </Link>
          <div className="text-xs font-bold text-gray-500">
            {product.brand_name}
          </div>
        </div>

        {/* Variations */}
        <div className="flex w-full flex-wrap gap-2">
          {/* variants */}
          {filteredAttributes.map((attr, index) => (
            <select
              key={attr.name + index + product.name}
              onChange={(e) => updateVariant(index, e.target.value)}
              defaultValue={combination.combinationString[index]}
            >
              {filteredAttributes[index].childern.map((child) => (
                <option
                  key={attr.name + child.value + product.name}
                  value={child.value}
                >
                  {attr.name}: {child.value}
                </option>
              ))}
            </select>
          ))}

          {/* quantity */}
          <div className="flex h-5 w-fit rounded-md border-[1px] border-gray-400 bg-slate-100 [&>*]:h-5 [&>*]:w-5">
            <button
              onClick={() => incrementQuantity(quantityState + 1)}
              className="grid place-content-center border-r-[1px] border-gray-400"
            >
              +
            </button>
            <span className="grid place-content-center border-r-[1px] border-gray-400">
              {quantityState}
            </span>
            <button
              onClick={() => decrementQuantity(quantityState - 1)}
              className="grid place-content-center"
            >
              -
            </button>
          </div>
        </div>

        <div>
          {combination.discount ? (
            <div className="flex items-baseline gap-2 text-[14px]">
              <span>&#8377;{price}</span>
              <s className="text-gray-500">&#8377;{combination.price}</s>
              <span className="font-bold text-red-800">
                ({combination.discount}% OFF)
              </span>
            </div>
          ) : (
            <span className="text-[14px]">&#8377;{price}</span>
          )}
        </div>
      </div>

      <RxCross1 onClick={removeFromCart} className="h-5 w-5" />
    </div>
  );
};

export default CartProduct;
