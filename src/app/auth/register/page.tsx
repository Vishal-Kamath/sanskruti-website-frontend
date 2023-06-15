"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/store/hooks";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Metadata, NextPage } from "next";
import z from "zod";
import { validateType } from "./components/utils";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import UIButton from "@/components/common/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/common/input";
import PhoneInput from "react-phone-input-2";
import { BiArrowBack } from "react-icons/bi";
import "@/app/high-res.css";

export const metadata: Metadata = {
  title: "Sanskruti NX - Register",
};

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        if (res.status === 201) return router.replace("/auth/login");
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

  const handleFacebookAuth = () => {
    window.open(`${process.env.ENDPOINT}/api/v1/facebooklogin`, "_self");
  };

  return (
    <div className="mt-9 flex w-full flex-col justify-center gap-4 rounded-md">
      <div className="relative flex items-baseline justify-between">
        <Link href="/">
          <UIButton className="h-8 gap-2 border-gray-400 px-3 py-2 text-black">
            <BiArrowBack />
            <span>Back</span>
          </UIButton>
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 text-xl font-bold">
          REGISTER
        </div>
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

        <div className="relative h-fit w-full rounded-md hover:outline hover:outline-4 hover:outline-gray-300">
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
          className="h-10 bg-black font-bold text-white"
          onClick={_submit}
        >
          SUBMIT
        </UIButton>
      </div>

      <span className="text-center">OR</span>

      <div className="flex w-full gap-3 font-semibold max-lg:flex-col">
        <UIButton onClick={handleGoogleAuth} className="w-full gap-2">
          <FcGoogle className="h-6 w-6" />
          <span>GOOGLE</span>
        </UIButton>
        <UIButton className="w-full gap-2">
          <BsFacebook
            onClick={handleFacebookAuth}
            className="h-6 w-6 text-facebook"
          />
          <span>FACEBOOK</span>
        </UIButton>
      </div>

      <div className="flex justify-center gap-1">
        Already have an account?
        <Link
          href="/auth/login"
          className="font-semibold text-blue-700 hover:text-blue-500 hover:underline"
        >
          login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
