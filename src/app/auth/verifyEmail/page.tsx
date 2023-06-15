"use client";

import { useAppDispatch } from "@/redux/store/hooks";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { NextPage } from "next";
import { useEffect } from "react";
import Image from "next/image";

const LoginPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const _submit = async () => {
    const link = `${process.env.ENDPOINT}/api/v1/user/verifyEmail`;

    await axios
      .post<NotificationType>(
        link,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const response = res.data;
        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());
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
  };

  useEffect(() => {
    _submit();
  }, []);

  return (
    <div className="relative mt-4 flex h-[15rem] w-full flex-col items-center justify-center gap-5 rounded-md border-2 border-gray-500 bg-sky-200 p-4 text-xl">
      <Image
        alt="mail"
        src="/assets/mail.png"
        className="absolute top-0 -translate-y-1/2 drop-shadow-lg"
        width={200}
        height={200}
      />
      We are verifying your email
    </div>
  );
};

export default LoginPage;
