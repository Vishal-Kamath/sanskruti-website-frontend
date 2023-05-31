import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import SignLayout from "@/components/layouts/signLayout";
import { Input } from "@/components/common/input";
import Head from "next/head";
import { useAppDispatch } from "@/store/hooks";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/slice/notification.slice";
import axios from "axios";
import { useRouter } from "next/router";
import { loggedIn, setAccessToken } from "@/slice/user.slice";
import UIButton from "@/components/common/button";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [mobileNumber, setMobileNumber] = useState<number | null>(null);

  const [withEmail, setWithEmail] = useState(true);

  const _submit = async () => {
    if (!email?.trim() || !password?.trim()) {
      dispatch(
        setNotification({ message: "fill all details", type: "warning" })
      );
      return dispatch(showNotification());
    }

    const link = withEmail
      ? `${process.env.ENDPOINT}/api/v1/user/emaillogin`
      : `${process.env.ENDPOINT}/api/v1/user/numberlogin`;
    const body = withEmail
      ? { email, password }
      : { Mobile_No: mobileNumber, password };

    const registerResponse = await axios
      .post<NotificationType & { accessToken: string }>(link, body)
      .then((res) => {
        const response = res.data;
        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());

        if (res.status === 200) {
          dispatch(setAccessToken({ accessToken: response.accessToken }));
          dispatch(loggedIn());
          return router.replace("/");
        }
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
        <title>Shoppers Den - Login</title>
      </Head>
      <div className="flex w-full flex-col justify-center gap-5 rounded-md p-5">
        <div className="text-center text-xl font-bold ">LOGIN</div>

        <div className="flex flex-col gap-3">
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
              Login with {withEmail ? "Number" : "Email"}
            </UIButton>
          </div>

          {/* Password */}
          <Input
            input_type="password"
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />

          <UIButton
            className="h-10 border-black bg-black text-white"
            onClick={_submit}
            // onClick={() => {
            //   dispatch(loggedIn());
            //   router.push("/user");
            // }}
          >
            SUBMIT
          </UIButton>
        </div>

        <span className="text-center">OR</span>

        <div className="flex w-full gap-3 font-semibold max-lg:flex-col">
          <UIButton className="w-full gap-2">
            <FcGoogle className="h-6 w-6" />
            <span>GOOGLE</span>
          </UIButton>
          <UIButton className="w-full gap-2">
            <BsFacebook className="h-6 w-6 text-facebook" />
            <span>FACEBOOK</span>
          </UIButton>
        </div>

        <div className="flex justify-center gap-1">
          Don't have an account.
          <Link
            href="/user/register"
            className="text-gray-600 hover:text-black"
          >
            register here
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <SignLayout>{page}</SignLayout>;
};
