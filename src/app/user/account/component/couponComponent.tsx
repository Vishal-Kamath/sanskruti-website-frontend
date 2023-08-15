import { FC } from "react";
import { Coupon } from "../page";
import { cn } from "@/utils/lib";

const CouponComponent: FC<Coupon & { className?: string }> = ({
  className,
  ...coupon
}) => {
  return (
    <div className={cn("relative isolate w-full overflow-hidden", className)}>
      <div className="flex w-full flex-col rounded-md border-2 border-yellow-500 bg-yellow-50">
        <div className="flex flex-col gap-5 p-4">
          <div className="flex justify-between gap-2 font-bold text-yellow-800">
            <span className="rounded-sm bg-orange-400 px-2 py-1 text-white">
              {coupon.code}
            </span>
            <span>
              {coupon.discountType === "price"
                ? `Rs${coupon.value} OFF`
                : `${coupon.value}% OFF`}
            </span>
          </div>
          <div className="text-xs text-yellow-700">
            minimum purchase: Rs{coupon.minPurchase}
          </div>
        </div>

        <div className="absolute bottom-8 left-0 z-10 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-yellow-500 bg-white"></div>
        <div className="absolute bottom-8 right-0 z-10 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded-full border-2 border-yellow-500 bg-white"></div>
        <div className="h-8 border-t-2 border-dashed border-yellow-500"></div>
      </div>
    </div>
  );
};

export default CouponComponent;
