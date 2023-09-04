import { FC } from "react";
import { cn } from "@/utils/lib";
import { Coupon } from "../../account/page";
import Image from "next/image";

const CouponCartComponent: FC<
  Coupon & { className?: string; applyCoupon: VoidFunction }
> = ({ className, applyCoupon, ...coupon }) => {
  const value =
    coupon.discountType === "price"
      ? `Rs${coupon.value} OFF`
      : `${coupon.value}% OFF`;
  return (
    <button
      onClick={applyCoupon}
      className={cn("group relative isolate w-full overflow-hidden", className)}
    >
      <div className="flex w-full flex-col rounded-md border-[1px] border-gray-500">
        <div className="flex gap-4 p-4">
          <Image
            alt="sanskruti log0"
            src="/assets/sanskruti-circle-logo.png"
            width={100}
            height={100}
            className="h-16 w-20 border-r-2 border-dashed border-gray-300 pr-4"
          />

          <div className="flex flex-col items-start gap-1">
            <h3 className="text-xs font-normal">{coupon.name}</h3>
            <span className="font-semibold">{value}</span>
            <p className="mt-auto text-[10px] text-gray-400">
              minimum purchase: {coupon.minPurchase}
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 z-10 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full border-[1px] border-gray-500 bg-white"></div>
        <div className="absolute bottom-8 right-0 z-10 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full border-[1px] border-gray-500 bg-white"></div>
        <div className="flex h-8 justify-between border-t-[1px] border-dashed border-gray-500 px-4 py-2">
          <span className="text-sanskrutiRed">{coupon.code}</span>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -z-10 h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-50 transition-all duration-200 ease-in group-hover:h-full group-hover:w-full group-hover:rounded-none"></div>
    </button>
  );
};

export default CouponCartComponent;
