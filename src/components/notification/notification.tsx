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

const Notification: React.FC<NotificationType> = ({
  message,
  type,
  content,
}) => {
  const dispatch = useAppDispatch();
  const close = () => dispatch(closeNotification());
  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-md gap-3 rounded-md border-[3px] p-3 bg-white",
        type === "success" && "border-green-500",
        (type === "info" || type === undefined) && "border-gray-500",
        type === "warning" && "border-amber-500",
        type === "error" && "border-red-500"
      )}
    >
      <div
        className={cn(
          "flex gap-2",
          type === "success" && "text-green-800",
          (type === "info" || type === undefined) && "text-gray-800",
          type === "warning" && "text-yellow-800",
          type === "error" && "text-red-800"
        )}
      >
        <div className="flex items-center [&>*]:w-5 [&>*]:h-5">
          {type === "success" && <BsCheckCircle />}
          {(type === "info" || type === undefined) && (
            <BsExclamationCircleFill />
          )}
          {type === "warning" && <AiOutlineWarning />}
          {type === "error" && <BiError />}
        </div>
        <div>{message || "Some thing went wrong"}</div>
        <button className="ml-auto" onClick={close}>
          <RxCross2 className="w-5 h-5" />
        </button>
      </div>
      <div className="text-gray-500">{content}</div>
    </div>
  );
};

export default Notification;
