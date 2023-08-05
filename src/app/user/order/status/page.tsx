"use client";

import { useSearchParams } from "next/navigation";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const StatusPage: NextPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("type");

  return (
    <div className="h-full w-full pt-40">
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center justify-center gap-5 rounded-md border-[1px] border-gray-300 p-4 pt-[7rem] text-xl shadow-lg">
        <Image
          alt="order successfull"
          src="/assets/successfullOrder.png"
          className="absolute top-0 h-[12.5rem] w-[12.5rem] -translate-y-1/2 drop-shadow-md"
          width={500}
          height={500}
        />
        <div>id: {}</div>
        <div>
          Order Placed <span className="text-green-400">Successfully!!!</span>
        </div>
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
