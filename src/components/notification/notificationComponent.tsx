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
        <div className="fixed flex justify-center pt-24 max-md:pt-36 px-[5vw] top-0 left-0 z-50 isolate w-full">
          <Notification {...notification} />
        </div>
      )}
    </>
  );
};

export default NotificationComponent;
