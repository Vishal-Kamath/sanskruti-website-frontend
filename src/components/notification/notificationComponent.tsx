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
        <Notification message={notification.message} type={notification.type} />
      )}
    </>
  );
};

export default NotificationComponent;
