"use client";

import {
  NotificationType,
  closeNotification,
} from "@/redux/slice/notification.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import { RxCross2 } from "react-icons/rx";
import { BiError } from "react-icons/bi";
import { BsCheckCircle, BsExclamationCircleFill } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
import React from "react";
import { cn } from "@/utils/lib";

const Notification: React.FC<NotificationType> = ({ message, type }) => {
  const dispatch = useAppDispatch();
  const close = () => dispatch(closeNotification());
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1 z-50 flex w-full max-w-md -translate-x-1/2 gap-2 rounded-sm border-2 px-2 py-3",
        type === "success" && "border-green-500 bg-green-200 text-green-500",
        (type === "info" || type === undefined) &&
          "border-gray-500 bg-gray-200 text-gray-800",
        type === "warning" && "border-yellow-500 bg-yellow-100 text-yellow-500",
        type === "error" && "border-red-500 bg-red-200 text-red-500"
      )}
    >
      <div className="flex items-center">
        {type === "success" && <BsCheckCircle className="h-5 w-5" />}
        {(type === "info" || type === undefined) && (
          <BsExclamationCircleFill className="h-5 w-5" />
        )}
        {type === "warning" && <AiOutlineWarning className="h-5 w-5" />}
        {type === "error" && <BiError className="h-5 w-5" />}
      </div>
      <div>{message || "Some thing went wrong"}</div>
      <button className="ml-auto w-5" onClick={close}>
        <RxCross2 />
      </button>
    </div>
  );
};

export default Notification;
