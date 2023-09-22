"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/lib";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import { LuPackageCheck, LuPackageX } from "react-icons/lu";
import { TbPackageOff } from "react-icons/tb";
import { PiWarningCircleDuotone } from "react-icons/pi";

type Status = { orderId: string; status: string; amount: number };
const StatusPage: FC = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const tracking_id = searchParams.get("tracking_id");

  const [data, setData] = useState<Status>();

  useEffect(() => {
    if (orderId) {
      axios
        .get<Status & NotificationType>(
          `${process.env.ENDPOINT}/api/v1/user/order/status?orderId=${orderId}&tracking_id=${tracking_id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((res) => {
          const response = res.data;
          setData(response);
        })
        .catch((err) => {
          const response = err.response.data;
          dispatch(
            setNotification({
              message: response.message,
              type: response.type,
            })
          );
          dispatch(showNotification());
        });
    }
  }, [orderId]);

  return (
    <div className="h-full w-full pt-40">
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-md p-4 pt-[4rem] text-xl shadow-lg"
        )}
      >
        {data?.status === "Success" ? (
          <LuPackageCheck className="absolute left-1/2 top-0 h-[6rem] w-[6rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-100 p-3 text-green-500" />
        ) : data?.status === "Failure" ? (
          <LuPackageX className="absolute left-1/2 top-0 h-[6rem] w-[6rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100 p-3 text-red-500" />
        ) : data?.status === "Aborted" ? (
          <TbPackageOff className="absolute left-1/2 top-0 h-[6rem] w-[6rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100 p-3 text-yellow-500" />
        ) : (
          <PiWarningCircleDuotone className="absolute left-1/2 top-0 h-[6rem] w-[6rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100 p-2 text-yellow-500" />
        )}

        {data?.status === "Success" ? (
          <div>
            Order Placed <span className="text-green-600">Successfully!!!</span>
          </div>
        ) : data?.status === "Failure" ? (
          <div>
            Order <span className="text-red-600">Failed!!!</span>
          </div>
        ) : data?.status === "Aborted" ? (
          <div>
            Order <span className="text-yellow-600">Cancelled!!!</span>
          </div>
        ) : (
          <div>Something went wrong</div>
        )}

        {data?.orderId && (
          <div className="text-sm text-gray-600">
            id: <u>{data?.orderId}</u>
          </div>
        )}
        {data?.amount && (
          <div className="text-sm text-gray-600">
            Amount:{" "}
            <span className="font-bold text-black">&#8377;{data?.amount}</span>
          </div>
        )}

        <div className="mt-6 flex gap-2 text-[16px]">
          <Link
            href="/user/order/order"
            className="text-sm text-gray-400 underline underline-offset-2 hover:text-sanskrutiRed"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
