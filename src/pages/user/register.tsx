import { MdAlternateEmail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { BsCalendar3 } from "react-icons/bs";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import SignLayout from "@/components/layouts/signLayout";
import { Input, TextArea } from "@/components/common/input";
import Head from "next/head";
import { useAppDispatch } from "@/store/hooks";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/slice/notification.slice";
import axios from "axios";
import { useRouter } from "next/router";
import UIButton from "@/components/common/button";

const RegisterPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<number | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [withEmail, setWithEmail] = useState(true);
  const _submit = async () => {
    // check if input fields are empty
    if (
      !username?.trim() ||
      (withEmail && !email?.trim()) ||
      (!withEmail && !mobileNumber) ||
      !password?.trim() ||
      !confirmPassword?.trim()
    ) {
      dispatch(
        setNotification({ message: "fill all details", type: "warning" })
      );
      return dispatch(showNotification());
    }

    if (password !== confirmPassword) {
      dispatch(
        setNotification({ message: "passwords don't match", type: "warning" })
      );
      return dispatch(showNotification());
    }

    const link = withEmail
      ? `${process.env.ENDPOINT}/api/v1/user/emailregister`
      : `${process.env.ENDPOINT}/api/v1/user/numberregister`;
    const body = withEmail
      ? { username, email, password }
      : { username, Mobile_No: mobileNumber, password };

    console.log(link);
    const registerResponse = await axios
      .post<NotificationType>(link, body)
      .then((res) => {
        const response = res.data;
        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());
        if (res.status === 201) return router.replace("/user/login");
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
    <>
      <Head>
        <title>Shoppers Den - Register</title>
      </Head>
      <div className="flex w-full flex-col justify-center gap-5 rounded-md p-5">
        <div className="text-center text-xl font-bold">REGISTER</div>

        <div className="flex flex-col gap-3">
          {/* Username */}
          <Input
            input_type="text"
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />

          <div className="flex gap-3">
            {withEmail ? (
              <Input
                input_type="email"
                placeholder="Email"
                value={email}
                setValue={setEmail}
              />
            ) : (
              <Input
                input_type="number"
                placeholder="Mobile number"
                value={mobileNumber}
                setValue={setMobileNumber}
              />
            )}

            <UIButton
              className="w-[12rem] text-xs"
              onClick={() => setWithEmail((state) => !state)}
            >
              Register with {withEmail ? "Number" : "Email"}
            </UIButton>
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

          <UIButton className="h-10 bg-black text-white" onClick={_submit}>
            SUBMIT
          </UIButton>
        </div>

        <span className="text-center">OR</span>

        <div className="flex justify-center gap-1">
          Already have an account,
          <Link href="/user/login" className="text-gray-600 hover:text-black">
            login here
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <SignLayout>{page}</SignLayout>;
};
