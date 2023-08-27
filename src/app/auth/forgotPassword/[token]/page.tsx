"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import {
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import { NextPage } from "next";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";
import { validateType } from "../../register/components/utils";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";

const ResetPasswordPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const token = params["token"];

  const _reset = () => {
    if (!token) {
      dispatch(
        setNotification({
          message: "Invalid link",
          type: "warning",
          content: "We request the user to request another password reset link",
        })
      );
      dispatch(showNotification());
      return;
    }

    // check if input fields are empty
    if (!newPassword?.trim() || !confirmNewPassword?.trim()) {
      dispatch(
        setNotification({
          message: "fill all details",
          type: "warning",
          content:
            "The current link is invalid. We request the user to please fill all the required fields.",
        })
      );
      dispatch(showNotification());
      return;
    }

    if (newPassword !== confirmNewPassword) {
      dispatch(
        setNotification({ message: "passwords don't match", type: "warning" })
      );
      dispatch(showNotification());
      return;
    }

    const passwordSchema = z.string().min(6);
    const isPasswordValid = validateType(
      newPassword,
      passwordSchema,
      {
        message: "not a valid password",
        type: "warning",
        content: "a password must contain minimum 6 characters",
      },
      dispatch
    );
    if (!isPasswordValid) return;

    axios
      .post(
        `${process.env.ENDPOINT}/api/v1/user/forgotPassword`,
        {
          token,
          updatePassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const response = res.data;
        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());
        router.replace("/auth/login");
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
      <div className="relative flex w-full items-center justify-center">
        <Link
          href="/auth/login"
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full px-4 py-1 hover:bg-gray-100"
        >
          <BsArrowLeft className="h-6 w-auto" />
        </Link>
        <div className="text-xl font-bold">RESET PASSWORD</div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-sm text-gray-500">
          Please enter your new password to reset your account. This password
          reset link is only valid for 15 minutes.
        </div>

        {/* Password */}
        <Input
          input_type="password"
          placeholder="New Password"
          value={newPassword}
          setValue={setNewPassword}
        />

        {/* Confirm Password */}
        <Input
          input_type="password"
          placeholder="Confirm New password"
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
        />

        <UIButton
          className="mt-5 h-10 border-gray-700 bg-gray-50 font-bold text-gray-700 hover:border-sky-700 hover:bg-sky-50 hover:text-sky-700 hover:outline-sky-100"
          onClick={_reset}
        >
          RESET
        </UIButton>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
