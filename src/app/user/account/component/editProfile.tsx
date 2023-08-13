"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import { useAppDispatch } from "@/redux/store/hooks";
import { FC, Fragment, useState, useEffect } from "react";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";
import z from "zod";
import PhoneInput from "react-phone-input-2";
import "@/app/high-res.css";
import { cn } from "@/utils/lib";
import { setUser } from "@/redux/slice/user.slice";

const EditProfileComponent: FC<{
  className?: string;
  usernameprop?: string;
  mobileprop?: number;
  emailprop?: string;
}> = ({ className, usernameprop, emailprop, mobileprop }) => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState(usernameprop);
  const [mobileNumber, setMobileNumber] = useState(mobileprop?.toString());
  const [email, setEmail] = useState(emailprop);

  const [open, setOpen] = useState(false);

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
      .post<
        NotificationType & {
          username: string;
          Mobile_No: number;
          Mobile_No_verified: boolean;
          email: string;
          email_verified: boolean;
        }
      >(
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
        dispatch(
          setUser({
            username: response.username,
            email: response.email,
            email_verified: response.email_verified,
            Mobile_No: response.Mobile_No,
            Mobile_No_verified: response.Mobile_No_verified,
          })
        );
        setOpen(false);
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
    setUsername(usernameprop);
    setEmail(emailprop);
    setMobileNumber(mobileprop?.toString());
  }, [usernameprop, emailprop, mobileprop]);

  return (
    <Fragment>
      <UIButton
        className={cn(
          "rounded-full border-[1px] px-3 hover:border-sanskrutiRed hover:text-sanskrutiRed hover:outline-sanskrutiRedLight",
          className
        )}
        onClick={() => setOpen(true)}
      >
        Edit Profile
      </UIButton>
      <div
        className={cn(
          "fixed left-0 top-0 z-40 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-30 p-[3vw]",
          !open && "hidden"
        )}
      >
        <div className="relative flex w-full max-w-lg flex-col items-start gap-6 rounded-lg bg-white p-8">
          <div className="flex w-full justify-between">
            <h3 className="text-lg font-semibold">Edit profile</h3>
            <UIButton
              className="w-fit border-slate-400 px-5"
              onClick={() => setOpen(false)}
            >
              Back
            </UIButton>
          </div>
          <div className="text-justify text-gray-500">
            Ensure your profile information is accurate and up-to-date.
            Periodically review and update your details to ensure relevancy.
            Keeping your profile information current helps us provide you with a
            better user experience. Stay connected with the latest updates!
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
      </div>
    </Fragment>
  );
};

export default EditProfileComponent;
