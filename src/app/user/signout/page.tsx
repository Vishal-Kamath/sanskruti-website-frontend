"use client";

import { FC } from "react";
import Container from "../components/container";
import UIButton from "@/components/common/button";
import { useAppDispatch } from "@/redux/store/hooks";
import { useRouter } from "next/navigation";
import { loggedOut, setUser } from "@/redux/slice/user.slice";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";

const SignOutPage: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signout = async () => {
    const doesTheUserWantToSignOut = confirm(
      "Are you sure you want to sign out?"
    );
    if (doesTheUserWantToSignOut) {
      const registerResponse = await axios
        .get<NotificationType>(`${process.env.ENDPOINT}/api/v1/user/logout`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          console.log(res);
          dispatch(
            setNotification({ message: response.message, type: response.type })
          );
          dispatch(showNotification());
          dispatch(loggedOut());
          dispatch(setUser({ address: [] }));
          return router.replace("/");
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
  };
  return (
    <Container containerTitle="Sign Out">
      <div className=" mx-auto flex w-full flex-col gap-4 md:max-w-lg">
        <span className="text-gray-500">
          Are you sure you want to sign out? This action will log you out of
          your account and terminate your current session.
        </span>
        <UIButton
          onClick={signout}
          className="border-red-600 bg-red-50 text-red-600 hover:outline-red-100"
        >
          SIGN OUT
        </UIButton>
      </div>
    </Container>
  );
};

export default SignOutPage;
