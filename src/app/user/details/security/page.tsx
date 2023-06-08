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
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import z from "zod";
import { useRouter } from "next/navigation";
import { selectUser } from "@/redux/slice/user.slice";

const SecurityPage: FC = () => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const router = useRouter();
  const user = useAppSelector(selectUser);
  if (user.provider !== "Email/Number") router.replace("/user/details");

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
      <div className="mx-auto flex w-full flex-col gap-6 md:max-w-lg">
        <div className="flex w-full flex-col gap-2">
          <span className="shrink-0 text-lg">Your old password:</span>
          <Input
            input_type="password"
            placeholder=""
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <span className="shrink-0 text-lg">Your new password:</span>
          <Input
            input_type="password"
            placeholder=""
            value={newPassword}
            setValue={setNewPassword}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <span className="shrink-0 text-lg">Confirm new password:</span>
          <Input
            input_type="password"
            placeholder=""
            value={confirmNewPassword}
            setValue={setConfirmNewPassword}
          />
        </div>

        <UIButton
          onClick={submit}
          className="ml-auto w-full bg-sky-100 hover:outline-sky-200"
        >
          SUBMIT
        </UIButton>
      </div>
    </Container>
  );
};

export default SecurityPage;
