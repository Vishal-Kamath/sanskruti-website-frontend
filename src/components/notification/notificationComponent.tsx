"use client";

import { selectNotification } from "@/redux/slice/notification.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { FC } from "react";
import Notification from "./notification";

const NotificationComponent: FC = () => {
  const notification = useAppSelector(selectNotification);
  return (
    <>
      {notification.notify && (
        <div className="fixed left-0 top-0 isolate z-50 flex w-full justify-center px-[3vw] pt-24 max-md:pt-36">
          <Notification {...notification} />
        </div>
      )}
    </>
  );
};

export default NotificationComponent;
