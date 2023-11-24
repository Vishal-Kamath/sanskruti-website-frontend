"use client";
import UIButton from "@/components/common/button";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { selectisAuthenticated } from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { cn } from "@/utils/lib";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const AddToCartAndBuyNow: FC<{
  pathname: string;
  _id: string;
  combinationString: string[];
  inStock: number;
}> = ({ pathname, _id, combinationString, inStock }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectisAuthenticated);

  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    const body = {
      productId: _id,
      quantity: 1,
      variant: combinationString,
    };

    await axios
      .post<NotificationType>(
        `${process.env.ENDPOINT}/api/v1/user/cart`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(
          setNotification({
            message: res.data.message,
            content: res.data.content,
            type: res.data.type,
          })
        );
        dispatch(showNotification());
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response.data;
        dispatch(
          setNotification({
            message: response.message,
            content: response.content,
            type: response.type,
          })
        );
        dispatch(showNotification());
        setLoading(false);
      });
  };

  const handleBuyNow = async () => {
    await addToCart();
    router.push("/user/cart");
  };

  return (
    <div className="isolate z-20 flex flex-col gap-2 bg-white max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:border-t-2 max-md:border-gray-300 max-md:px-[3vw] max-md:py-2 max-md:shadow-top">
      {loading && <span className="text-gray-800">Sending Request...</span>}
      {!loading &&
        (inStock ? (
          <span className="text-gray-500">
            {inStock < 10 ? `${inStock} products in Stock` : "In Stock"}
          </span>
        ) : (
          <span className="text-red-800">Out of Stock</span>
        ))}
      <div className="flex gap-2">
        {isAuthenticated ? (
          <>
            <UIButton
              className={cn(
                "w-full border-amber-300 bg-white text-lg font-semibold text-red-700 hover:outline-amber-50",
                (loading || !inStock) && "opacity-50"
              )}
              onClick={addToCart}
              disabled={loading || !inStock}
            >
              ADD TO CART
            </UIButton>
            <UIButton
              className={cn(
                "w-full border-amber-300 bg-amber-100 text-lg font-semibold text-red-700 hover:bg-amber-200 hover:outline-amber-100",
                (loading || !inStock) && "opacity-50"
              )}
              onClick={handleBuyNow}
              disabled={loading || !inStock}
            >
              BUY NOW
            </UIButton>
          </>
        ) : (
          <Link
            href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}
            className="w-full"
          >
            <UIButton className="mx-auto w-full max-w-sm bg-white text-lg font-semibold text-black">
              SIGN IN
            </UIButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AddToCartAndBuyNow;
