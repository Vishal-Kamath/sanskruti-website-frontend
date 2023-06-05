"use client";

import UIButton from "@/components/common/button";
import { Input } from "@/components/common/input";
import Container from "@/app/user/components/container";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { FC, useState } from "react";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import axios from "axios";

const EditProfile: FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState(user.username);
  const [mobileNumber, setMobileNumber] = useState(user.Mobile_No?.toString());
  const [email, setEmail] = useState(user.email);

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
            "Authorization": `Bearer ${user.accessToken}`,
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
    <div className="flex w-full flex-col gap-3">
      <Container containerTitle="Edit Profile Details">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
          <div className="flex w-full flex-col gap-2">
            <span className="shrink-0 text-lg">Update username:</span>
            <Input
              input_type="text"
              placeholder=""
              value={username}
              setValue={setUsername}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <span className="shrink-0 text-lg">Update email:</span>
            <Input
              input_type="text"
              placeholder=""
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <span className="shrink-0 text-lg">Update mobile number:</span>
            <Input
              input_type="text"
              placeholder=""
              value={mobileNumber}
              setValue={setMobileNumber}
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
    </div>
  );
};

export default EditProfile;
