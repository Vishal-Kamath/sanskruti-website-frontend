"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import Container from "@/app/user/components/container";
import { FC, useState } from "react";
import axios from "axios";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import z from "zod";

const SecurityPage: FC = () => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
    <Container containerTitle="Security">
      <div className="mt-4 flex w-full flex-col gap-6">
        <div className="text-justify text-gray-500">
          Please note that it&apos;s essential to regularly update your password
          for increased security. Remember to choose a strong, unique
          combination of characters, numbers, and symbols. Stay proactive and
          safeguard your account by changing your password periodically.
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
            className="mx-auto w-full rounded-full bg-gray-700 px-4 text-white hover:outline-sky-200"
          >
            SUBMIT
          </UIButton>
        </div>
      </div>
    </Container>
  );
};

export default SecurityPage;
