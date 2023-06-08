"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/common/input";
import { useAppDispatch } from "@/redux/store/hooks";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";
import { useRouter } from "next/navigation";
import UIButton from "@/components/common/button";
import { Metadata, NextPage } from "next";
import z from "zod";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

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

  const validateTypes = (): { valid: boolean } & NotificationType => {
    const emailSchema = z.string().email();
    try {
      emailSchema.parse(email);
    } catch {
      return {
        valid: false,
        message: "not a valid email",
        type: "warning",
        content:
          "the email you have provide is not a valid email format an example of a valid email is: ashokkumar@email.com",
      };
    }

    const mobileNumberSchema = z
      .number()
      .refine((number) => number.toString().length === 10);
    try {
      mobileNumberSchema.parse(Number(mobileNumber));
    } catch {
      return {
        valid: false,
        message: "not a valid mobile number",
        type: "warning",
        content:
          "By Indian standards a valid mobile number must be a 10 digit number",
      };
    }

    const passwordSchema = z.string().min(6);
    try {
      passwordSchema.parse(password);
    } catch {
      return {
        valid: false,
        message: "not a valid password",
        type: "warning",
        content: "a password must contain minimum 6 characters",
      };
    }

    return { valid: true, message: "", type: "info", content: "" };
  };

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
      return dispatch(showNotification());
    }

    if (password !== confirmPassword) {
      dispatch(
        setNotification({ message: "passwords don't match", type: "warning" })
      );
      return dispatch(showNotification());
    }

    const { valid, message, type, content } = validateTypes();
    if (!valid) {
      dispatch(setNotification({ message, type, content }));
      return dispatch(showNotification());
    }

    const link = `${process.env.ENDPOINT}/api/v1/user/register`;
    const body = { username, email, Mobile_No: Number(mobileNumber), password };

    const registerResponse = await axios
      .post<NotificationType>(link, body)
      .then((res) => {
        const response = res.data;
        dispatch(
          setNotification({ message: response.message, type: response.type })
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
          })
        );
        dispatch(showNotification());
      });
  };

  const handleGoogleAuth = () => {
    window.open(`${process.env.ENDPOINT}/api/v1/googlelogin`, "_self");
  };

  return (
    <div className="flex w-full flex-col justify-center gap-5 rounded-md">
      <div className="text-center text-xl font-bold">REGISTER</div>

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

        <Input
          input_type="number"
          placeholder="Mobile number"
          value={mobileNumber}
          setValue={setMobileNumber}
        />

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

        <UIButton className="h-10 bg-black text-white" onClick={_submit}>
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
          <BsFacebook className="h-6 w-6 text-facebook" />
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
