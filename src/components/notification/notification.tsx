"use client";

import {
  NotificationType,
  closeNotification,
  selectNotification,
} from "@/redux/slice/notification.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { RxCross2 } from "react-icons/rx";
import { BiError } from "react-icons/bi";
import { BsCheckCircle, BsExclamationCircleFill } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
import {FC} from "react";
import { cn } from "@/utils/lib";

const Notification: FC = () => { 

  const dispatch = useAppDispatch();
  const close = () => dispatch(closeNotification());
  const notification = useAppSelector(selectNotification);

  const { message, type, content, notify } = notification

  return (
    <>
      {notify && (
        <div className="fixed left-1/2 top-40 z-50 w-full max-w-md -translate-x-1/2">
          <div
            className={cn(
              "flex w-full flex-col gap-3 rounded-md border-2 bg-white p-3 text-sm",
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
              <div className="flex items-center [&>*]:h-5 [&>*]:w-5">
                {type === "success" && <BsCheckCircle />}
                {(type === "info" || type === undefined) && (
                  <BsExclamationCircleFill />
                )}
                {type === "warning" && <AiOutlineWarning />}
                {type === "error" && <BiError />}
              </div>
              <div>{message || "Some thing went wrong"}</div>
              <button className="ml-auto" onClick={close}>
                <RxCross2 className="h-5 w-5" />
              </button>
            </div>
            <div className={cn("text-gray-500", !content && "hidden")}>
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
