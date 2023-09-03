"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/store/hooks";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { NextPage } from "next";
import z from "zod";
import { validateType } from "./components/utils";
import Link from "next/link";
import { BsArrowLeft, BsFacebook } from "react-icons/bs";
import UIButton from "@/components/common/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/common/input";
import PhoneInput from "react-phone-input-2";
import "@/app/high-res.css";

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const searchParams = useSearchParams();
  const query = searchParams.get("redirect");
  const redirect = query
    ? `/auth/login?redirect=${encodeURIComponent(query)}`
    : "/auth/login";

  const _submit = async () => {
    // check if input fields are empty
    if (
      !username?.trim() ||
      !email?.trim() ||
      !mobileNumber ||
      !password?.trim() ||
      !confirmPassword?.trim()
    ) {
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

    if (password !== confirmPassword) {
      dispatch(
        setNotification({ message: "passwords don't match", type: "warning" })
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
    const passwordSchema = z.string().min(6);
    const isPasswordValid = validateType(
      password,
      passwordSchema,
      {
        message: "not a valid password",
        type: "warning",
        content: "a password must contain minimum 6 characters",
      },
      dispatch
    );
    if (!isEmailValid || !isPasswordValid) return;

    const link = `${process.env.ENDPOINT}/api/v1/user/register`;
    const body = { username, email, Mobile_No: Number(mobileNumber), password };

    const registerResponse = await axios
      .post<NotificationType>(link, body)
      .then((res) => {
        const response = res.data;
        dispatch(
          setNotification({
            message: response.message,
            type: response.type,
            content: response.content,
          })
        );
        dispatch(showNotification());
        if (res.status === 201) return router.replace(redirect);
      })
      .catch((err) => {
        const response = err.response.data;
        dispatch(
          setNotification({
            message: response.message,
            type: response.type,
            content: response.content,
          })
        );
        dispatch(showNotification());
      });
  };

  const handleGoogleAuth = () => {
    window.open(`${process.env.ENDPOINT}/api/v1/googlelogin`, "_self");
  };

  return (
    <div className="mt-9 flex w-full flex-col justify-center gap-4 rounded-md">
      <div className="relative flex items-center justify-center">
        <Link
          href={query || "/"}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full px-4 py-1 hover:bg-gray-100"
        >
          <BsArrowLeft className="h-6 w-auto" />
        </Link>
        <div className="max-w-sm break-words text-center text-xl font-bold">
          Hello{username.trim() ? `, ${username}` : "!"}
        </div>
        <span></span>
      </div>

      <div className="flex flex-col gap-3">
        {/* Username */}
        <Input
          input_type="text"
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />

        <Input
          input_type="email"
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />

        <div className="relative h-fit w-full rounded-md hover:outline hover:outline-4 hover:outline-gray-200">
          <PhoneInput
            country={"in"}
            value={mobileNumber}
            onChange={setMobileNumber}
          />
          <label
            id="mobileLabel"
            htmlFor="mobile"
            className="absolute left-3 top-0 z-10 -translate-y-1/2 bg-white px-2 text-xs"
          >
            Mobile Number
          </label>
        </div>

        {/* Password */}
        <Input
          input_type="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />

        {/* Confirm Password */}
        <Input
          input_type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />

        <UIButton
          className="mt-5 h-10 border-gray-700 bg-gray-50 font-bold text-gray-700 hover:border-sky-700 hover:bg-sky-50 hover:text-sky-700 hover:outline-sky-100"
          onClick={_submit}
        >
          SUBMIT
        </UIButton>
      </div>

      <span className="text-center">OR</span>

      <div className="flex w-full gap-3 font-semibold max-lg:flex-col">
        <UIButton
          onClick={handleGoogleAuth}
          className="w-full gap-2 font-normal"
        >
          <FcGoogle className="h-6 w-6" />
          <span>Sign up with Gooogle</span>
        </UIButton>
      </div>

      <div className="flex justify-center gap-1">
        Already have an account?
        <Link
          href={redirect}
          className="font-semibold text-blue-700 hover:text-blue-500 hover:underline"
        >
          login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
