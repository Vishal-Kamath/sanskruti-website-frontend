"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import { useAppDispatch } from "@/redux/store/hooks";
import { FC, Fragment, useState } from "react";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";
import z from "zod";
import "@/app/high-res.css";
import { cn } from "@/utils/lib";
import { RxCross2 } from "react-icons/rx";

const ChangePasswordComponent: FC<{
  className?: string;
}> = ({ className }) => {
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [open, setOpen] = useState(false);

  const validateTypes = (): { valid: boolean } & NotificationType => {
    const passwordSchema = z.string().min(6);
    try {
      passwordSchema.parse(newPassword);
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

  const submit = async () => {
    if (
      !password?.trim() ||
      !newPassword?.trim() ||
      !confirmNewPassword.trim()
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

    if (newPassword !== confirmNewPassword) {
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

    await axios
      .post<NotificationType>(
        `${process.env.ENDPOINT}/api/v1/user/password/update`,
        {
          password,
          updatePassword: newPassword,
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
        setOpen(false);
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
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
    <Fragment>
      <UIButton
        className={cn(
          "rounded-full border-[1px] px-3 hover:border-sanskrutiRed hover:text-sanskrutiRed hover:outline-sanskrutiRedLight",
          className
        )}
        onClick={() => setOpen(true)}
      >
        Change Password
      </UIButton>
      <div
        className={cn(
          "fixed left-0 top-0 z-40 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-30 p-[3vw]",
          !open && "hidden"
        )}
      >
        <div className="relative flex w-full max-w-lg flex-col items-start gap-6 rounded-lg bg-white p-8">
          <div className="flex w-full justify-between">
            <h3 className="text-lg font-semibold">Change Paasword</h3>
            <button
              className="border-none px-2 outline-none"
              onClick={() => setOpen(false)}
            >
              <RxCross2 className="h-6 w-6 text-gray-600 hover:text-black" />
            </button>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-6 md:max-w-lg">
            <Input
              input_type="password"
              placeholder="Current Password"
              value={password}
              setValue={setPassword}
            />
            <Input
              input_type="password"
              placeholder="New Password"
              value={newPassword}
              setValue={setNewPassword}
            />
            <Input
              input_type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              setValue={setConfirmNewPassword}
            />

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

export default ChangePasswordComponent;
