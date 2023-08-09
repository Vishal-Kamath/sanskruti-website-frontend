"use client";

import UIButton from "@/components/common/button";
import { CartItem, CartType, setCart } from "@/redux/slice/cart.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import { cn } from "@/utils/lib";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FC, useCallback, useState } from "react";
import { BsBoxArrowUpLeft } from "react-icons/bs";
import { MdRemoveShoppingCart } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { setWishlistIds } from "@/redux/slice/wishlist.slice";

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

  const combination = product.varients.variations.find(
    (variation) =>
      JSON.stringify(variation.combinationString) === JSON.stringify(variant)
  )!;

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
  const [open, setOpen] = useState(false);
  const openDropdown = () => setOpen(true);
  const closeDropdown = () => setTimeout(() => setOpen(false), 200);

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

  const moveToWishlist = () => {
    axios
      .post<{ ids: string[] }>(
        `${process.env.ENDPOINT}/api/v1/user/wishlist`,
        {
          productId: product._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(setWishlistIds({ ids: res.data.ids }));
      })
      .catch(() => {});

    removeFromCart();
  };

  return (
    <div className="flex w-full gap-3 rounded-md border-[1px] border-gray-300 p-2">
      <Link href={link}>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={100}
          height={100}
          className="h-full w-[8rem] rounded-[4px] bg-slate-200 object-contain object-center"
        />
      </Link>
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Link href={link} className="w-fit text-lg font-medium">
            {product.name.length > 35
              ? `${product.name.slice(0, 35)}...`
              : product.name}
          </Link>
          <div className="text-xs font-bold text-gray-500">
            {product.brand_name}
          </div>
        </div>

        {/* Price */}
        <div className="font-normal">
          {combination.discount ? (
            <div className="flex gap-2">
              <span>&#8377;{price}</span>
              <s className="text-gray-500">&#8377;{combination.price}</s>
              <span className="font-medium text-red-800">
                ({combination.discount}% OFF)
              </span>
            </div>
          ) : (
            <span>&#8377;{price}</span>
          )}
        </div>

        {/* Variations */}
        <div className="flex w-full flex-wrap gap-2 text-xs">
          {/* variants */}
          {filteredAttributes.map((attr, index) => (
            <div
              key={attr.name + index + product.name}
              className="rounded-full border-[1px] border-slate-300 bg-slate-50 p-1"
            >
              <select
                key={attr.name + index + product.name}
                onChange={(e) => updateVariant(index, e.target.value)}
                defaultValue={combination.combinationString[index]}
                className="bg-transparent outline-none"
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
            </div>
          ))}

          {/* quantity */}
          <div className="flex w-fit items-center gap-1 rounded-full border-[1px] border-slate-300 bg-slate-50 p-1 [&>*]:h-4 [&>*]:w-4">
            <UIButton
              onClick={() => incrementQuantity(quantityState + 1)}
              className="grid place-content-center rounded-full border-[1px] border-slate-400 p-0 leading-none hover:outline-slate-200"
            >
              +
            </UIButton>
            <span className="grid w-fit place-content-center leading-none">
              {quantity}
            </span>
            <UIButton
              onClick={() => decrementQuantity(quantityState - 1)}
              className="grid place-content-center rounded-full border-[1px] border-slate-400 p-0 leading-none hover:outline-slate-200"
            >
              -
            </UIButton>
          </div>
        </div>
      </div>

      <button
        className="relative h-6 w-6 flex-shrink-0"
        onFocus={openDropdown}
        onBlur={closeDropdown}
      >
        <RxCross1 className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-[1px] border-gray-300 p-1 hover:border-gray-600" />
        <div
          className={cn(
            "absolute right-0 top-7 w-[12rem] rounded-md border-[1px] border-gray-300 bg-white shadow-lg",
            !open && "hidden"
          )}
        >
          <div
            onClick={removeFromCart}
            className="flex w-full gap-3 border-b-[1px] border-gray-300 p-3 hover:bg-red-100"
          >
            <MdRemoveShoppingCart /> Remove from cart
          </div>
          <div
            onClick={moveToWishlist}
            className="flex w-full gap-3 p-3 hover:bg-sky-100"
          >
            <BsBoxArrowUpLeft /> Move to wishlist
          </div>
        </div>
      </button>
    </div>
  );
};

export default CartProduct;
