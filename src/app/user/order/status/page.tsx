"use client";

import { useSearchParams } from "next/navigation";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/lib";
// Success", "Failure", "Aborted",
const StatusPage: NextPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const orderId = searchParams.get("orderId");

  return (
    <div className="h-full w-full pt-40">
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-md flex-col items-center justify-center gap-5 rounded-md border-[1px] border-gray-300 p-4 pt-[4rem] text-xl shadow-lg",
          type === "Success" && "border-green-500 pt-[7rem]",
          type === "Failure" && "border-red-500",
          type === "Aborted" && "border-yellow-500"
        )}
      >
        {type === "Success" ? (
          <Image
            alt="order successfull"
            src="/assets/successfullOrder.png"
            className="absolute top-0 h-[12.5rem] w-[12.5rem] -translate-y-1/2 drop-shadow-md"
            width={500}
            height={500}
          />
        ) : type === "Failure" ? (
          <Image
            alt="order failed"
            src="/assets/remove.png"
            className="absolute top-0 h-[5rem] w-[5rem] -translate-y-1/2 drop-shadow-md"
            width={500}
            height={500}
          />
        ) : type === "Aborted" ? (
          <Image
            alt="order cancelled"
            src="/assets/cancelled.png"
            className="absolute top-0 h-[5rem] w-[5rem] -translate-y-1/2 drop-shadow-md"
            width={500}
            height={500}
          />
        ) : (
          <Image
            alt="order successfull"
            src="/assets/warning.png"
            className="absolute top-0 h-[5rem] w-[5rem] -translate-y-1/2 drop-shadow-md"
            width={500}
            height={500}
          />
        )}
        <div>id: {orderId}</div>

        {type === "Success" ? (
          <div>
            Order Placed <span className="text-green-400">Successfully!!!</span>
          </div>
        ) : type === "Failure" ? (
          <div>
            Order <span className="text-red-400">Failed!!!</span>
          </div>
        ) : type === "Aborted" ? (
          <div>
            Order <span className="text-yellow-400">Cancelled!!!</span>
          </div>
        ) : (
          <div>Something went wrong</div>
        )}

        <div className="flex gap-2 text-[16px]">
          <Link
            href="/user/order"
            className="text-gray-400 underline underline-offset-2 hover:text-sanskrutiRed"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
