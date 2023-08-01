"use client";

import { CartType, setCart } from "@/redux/slice/cart.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import { cn } from "@/utils/lib";
import axios from "axios";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import Total from "./components/total";
import { completeLoading, startLoading } from "@/redux/slice/loading.slice";

const CartLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const steps = ["BAG", "ADDRESS", "PAYMENT"];
  const currentStep =
    pathname === "/user/cart"
      ? 0
      : pathname === "/user/cart/address"
      ? 1
      : pathname === "/user/cart/payment"
      ? 2
      : 0;

  const getCartDetails = async () => {
    dispatch(startLoading());
    const cartDetails = await axios.get<CartType>(
      `${process.env.ENDPOINT}/api/v1/user/cart`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(completeLoading());
    if (cartDetails.status !== 200) return dispatch(setCart({ cart: [] }));
    dispatch(setCart({ cart: cartDetails.data.cart }));
  };

  useEffect(() => {
    getCartDetails();
  }, [pathname]);

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <div className="mx-auto flex w-full max-w-xl">
        {steps.map((step, index) => (
          <div
            className="step-item relative flex w-full flex-col items-center justify-center gap-1"
            key={index}
          >
            {/* dash */}
            <div
              className={cn(
                "absolute right-1/2 top-[11px] -z-10 h-[2px] w-full",
                index === 0 && "hidden",
                index <= currentStep ? "bg-sky-500" : "bg-slate-300"
              )}
            ></div>

            {/* content */}
            <div
              className={cn(
                "grid h-6 w-6 place-content-center rounded-full bg-sky-100 text-xs font-bold",
                index < currentStep && "bg-sky-500 text-white",
                index === currentStep && "bg-sky-300"
              )}
            >
              {index < currentStep ? <BsCheckLg /> : index + 1}
            </div>
            <div className="text-gray-500">{step}</div>
          </div>
        ))}
      </div>

      <div className="flex w-full gap-5 max-lg:flex-col">
        {children}

        <Total />
      </div>
    </div>
  );
};

export default CartLayout;
