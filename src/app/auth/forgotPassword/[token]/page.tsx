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
import { BiArrowBack } from "react-icons/bi";
import z from "zod";
import { validateType } from "../../register/components/utils";
import axios from "axios";

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
          RESET PASSWORD
        </div>
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
          className="h-10 bg-black font-bold text-white"
          onClick={_reset}
        >
          RESET
        </UIButton>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
