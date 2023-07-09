"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { FC, useState } from "react";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";
import z from "zod";
import PhoneInput from "react-phone-input-2";
import "@/app/high-res.css";
import Link from "next/link";

const EditProfile: FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState(user.username);
  const [mobileNumber, setMobileNumber] = useState(user.Mobile_No?.toString());
  const [email, setEmail] = useState(user.email);

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
      .refine((number) => number.toString().length > 10);
    try {
      mobileNumberSchema.parse(Number(mobileNumber));
    } catch {
      return {
        valid: false,
        message: "not a valid mobile number",
        type: "warning",
        content: `For mobile number, include the country code, like "911234567890".`,
      };
    }

    return { valid: true, message: "", type: "info", content: "" };
  };

  const submit = async () => {
    if (!username?.trim() || !mobileNumber?.trim() || !email?.trim()) {
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

    const { valid, message, type, content } = validateTypes();
    if (!valid) {
      dispatch(setNotification({ message, type, content }));
      return dispatch(showNotification());
    }

    await axios
      .post<NotificationType>(
        `${process.env.ENDPOINT}/api/v1/user/update`,
        {
          username,
          Mobile_No: Number(mobileNumber),
          email,
        },
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

  return (
    <div className="mx-auto mt-4 flex w-full flex-col justify-center gap-6 md:max-w-lg">
      <div className="flex w-full justify-between">
        <h3 className="text-lg font-semibold">Edit profile</h3>
        <Link href="/user/account">
          <UIButton className="w-fit border-slate-400 px-5">Back</UIButton>
        </Link>
      </div>
      <div className="text-justify text-gray-500">
        Ensure your profile information is accurate and up-to-date. Periodically
        review and update your details to ensure relevancy. Keeping your profile
        information current helps us provide you with a better user experience.
        Stay connected with the latest updates!
      </div>
      <div className="flex w-full shrink-0 flex-col gap-6">
        <Input
          input_type="text"
          placeholder="Update Username"
          value={username}
          setValue={setUsername}
        />
        <Input
          input_type="text"
          placeholder="Update Email"
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
            Update Mobile Number
          </label>
        </div>

        <UIButton
          onClick={submit}
          className="ml-auto w-fit border-none bg-sanskrutiRed px-[3.25rem] font-bold text-white hover:outline-sanskrutiRedLight"
        >
          SUBMIT
        </UIButton>
      </div>
    </div>
  );
};

export default EditProfile;
