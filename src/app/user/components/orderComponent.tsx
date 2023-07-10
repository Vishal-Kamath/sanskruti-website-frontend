import { FC } from "react";
import { Order } from "../order/page";
import Image from "next/image";
import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { dateFormater } from "@/utils/dateFormater";
import { MdCancel } from "react-icons/md";
import { cn } from "@/utils/lib";

const OrderComponet: FC<{ order: Order }> = ({ order }) => {
  const variations: string[] = [];
  for (let key in order.order.product.varient.variations) {
    variations.push(`${key}: ${order.order.product.varient.variations[key]}`);
  }

  const price =
    (!!order.order.product.varient.discount
      ? order.order.product.varient.price *
        ((100 - order.order.product.varient.discount) / 100)
      : order.order.product.varient.price) * order.order.product.quantity;

  return (
    <Link
      href={`/user/order/${order.order._id}`}
      className="flex items-start justify-between gap-2 rounded-md border-[1px] border-gray-300 p-4 max-md:flex-col"
    >
      <div className="flex w-full items-start gap-2">
        <Image
          src={order.order.product.images[0]}
          key={order.order.product.id + order.order.orderId}
          alt={order.order.product.name}
          width={50}
          height={50}
          className="h-[8rem] w-[10rem] overflow-hidden object-contain object-center"
        />
        <div className="flex- flex w-full items-start justify-between gap-2 max-lg:flex-col">
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-semibold lg:text-[14px]">
                {order.order.product.name.length > 30
                  ? `${order.order.product.name.slice(0, 30)}...`
                  : order.order.product.name}
              </h3>
              <span className="text-xs font-bold text-gray-500">
                {order.order.product.brand_name}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {variations.map((val) => (
                <span
                  key={val + order.order._id}
                  className="rounded-full border-[1px] border-gray-400 bg-slate-50 px-2 py-1"
                >
                  {val}
                </span>
              ))}
              <span className="rounded-full border-[1px] border-gray-400 bg-slate-50 px-2 py-1">
                quantity: {order.order.product.quantity}
              </span>
            </div>
          </div>
          <div className="flex w-full gap-1 text-xs font-semibold lg:justify-center">
            {!!order.order.product.varient.discount ? (
              <div className="flex items-baseline gap-2">
                <span>&#8377;{price}</span>
                <s className="text-gray-500">
                  &#8377;
                  {order.order.product.varient.price *
                    order.order.product.quantity}
                </s>
                <span className="text-red-800">
                  ({order.order.product.varient.discount}% OFF)
                </span>
              </div>
            ) : (
              <span>&#8377;{price}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-shrink-0 flex-wrap gap-2 text-right max-md:w-full max-md:items-baseline max-md:justify-center md:flex-col lg:min-w-[15rem]">
        <div className="flex items-baseline justify-end gap-2 text-xs font-semibold md:items-center lg:text-[14px]">
          {order.order.cancellationInfo.isCancelled ? (
            <MdCancel className="h-3 w-3 text-sanskrutiRed" />
          ) : (order.order.deliveryInfo.status === "Delivered" &&
              !order.order.returnInfo?.isReturned) ||
            order.order.returnInfo?.status === "Refund credited" ? (
            <BsFillCheckCircleFill className="h-3 w-3 text-green-400" />
          ) : (
            <div className="h-3 w-3 rounded-full border-[1px] border-gray-500"></div>
          )}
          {order.order.cancellationInfo.isCancelled ? (
            <span className="text-red-500">
              Your{" "}
              {order.order.returnInfo?.isReturned ? "return request" : "order"}{" "}
              is Cancelled
            </span>
          ) : order.order.returnInfo?.isReturned ? (
            <span
              className={cn(
                order.order.returnInfo.status === "Refund credited" &&
                  "text-green-500"
              )}
            >
              Your return request is {order.order.returnInfo.status}
            </span>
          ) : (
            <span
              className={cn(
                order.order.deliveryInfo.status === "Delivered" &&
                  "text-green-500"
              )}
            >
              Your order is {order.order.deliveryInfo.status}
            </span>
          )}
        </div>
        {order.order.cancellationInfo.isCancelled ? (
          <div className="text-xs text-gray-500">
            on {dateFormater(new Date(order.order.cancellationInfo.date))}
          </div>
        ) : order.order.returnInfo?.isReturned ? (
          <div className="text-xs text-gray-500">
            on {dateFormater(new Date(order.order.returnInfo.date))}
          </div>
        ) : (
          <div className="text-xs text-gray-500">
            on {dateFormater(new Date(order.order.deliveryInfo.date))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default OrderComponet;
