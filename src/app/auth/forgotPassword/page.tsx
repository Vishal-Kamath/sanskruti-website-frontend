"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { useAppDispatch } from "@/redux/store/hooks";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { validateType } from "../register/components/utils";
import z from "zod";
import axios from "axios";

const ForgotPasswordPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const _request = () => {
    if (!email.trim()) {
      dispatch(
        setNotification({
          message: "fill all details",
          type: "warning",
          content:
            "We request the user to please fill all the required fields.",
        })
      );
      dispatch(showNotification());
      return;
    }

    const emailSchema = z.string().email();
    const isEmailValid = validateType(
      email,
      emailSchema,
      {
        message: "not a valid email",
        type: "warning",
        content:
          "the email you have provide is not a valid email format an example of a valid email is: ashokkumar@email.com",
      },
      dispatch
    );
    if (!isEmailValid) return;

    axios
      .get<NotificationType>(
        `${process.env.ENDPOINT}/api/v1/user/forgotPassword?email=${email}`,
        {
          headers: {
            "Content-Type": "appplication/json",
          },
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

  return (
    <div className="mt-9 flex w-full flex-col justify-center gap-4 rounded-md">
      <div className="relative flex items-baseline justify-between">
        <Link href="/auth/login">
          <UIButton className="h-8 gap-2 border-gray-400 px-3 py-2 text-black">
            <BiArrowBack />
            <span>Back</span>
          </UIButton>
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 text-xl font-bold">
          FORGOT PASSWORD
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm text-gray-500">
          Please provide your email. We'll send a password reset link that
          expires in 15 minutes to help you regain access.
        </div>
        <Input
          input_type="email"
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />

        <UIButton
          className="h-10 bg-black font-bold text-white"
          onClick={_request}
        >
          REQUEST LINK
        </UIButton>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
