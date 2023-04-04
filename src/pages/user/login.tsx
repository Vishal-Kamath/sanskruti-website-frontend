import { HiOutlineMail } from 'react-icons/hi';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import SignLayout from '@/components/signLayout';
import { Input } from '@/components/input';
import Head from 'next/head';
import { useAppDispatch } from '@/store/hooks';
import {
  NotificationType,
  setNotification,
  showNotification,
} from '@/slice/notification.slice';
import axios from 'axios';
import { useRouter } from 'next/router';
import { loggedIn, setAccessToken } from '@/slice/user.slice';

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const _submit = async () => {
    if (!email?.trim() || !password?.trim()) {
      dispatch(
        setNotification({ message: 'fill all details', type: 'warning' })
      );
      return dispatch(showNotification());
    }

    const registerResponse = await axios
      .post<NotificationType & { accessToken: string }>(
        'http://localhost:3500/api/v1/user/login',
        {
          email,
          password,
        }
      )
      .then((res) => {
        const response = res.data;
        dispatch(
          setNotification({ message: response.message, type: response.type })
        );
        dispatch(showNotification());

        if (res.status === 200) {
          dispatch(setAccessToken({ accessToken: response.accessToken }));
          dispatch(loggedIn());
          return router.replace('/');
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
        <div className="text-xl font-bold">Login</div>

        <div className="flex flex-col gap-3">
          {/* Email */}
          <Input
            input_type="text"
            placeholder="Email"
            symbol={<HiOutlineMail />}
            value={email}
            setValue={setEmail}
          />

          {/* Password */}
          <Input
            input_type="password"
            placeholder="Password"
            symbol={<span>***</span>}
            value={password}
            setValue={setPassword}
          />

          <button
            type="button"
            className="h-10 rounded-md bg-sky-700 text-white hover:bg-sky-500"
            onClick={_submit}
          >
            SUBMIT
          </button>
        </div>

        <span className="text-center">OR</span>

        <div className="flex justify-center gap-1">
          Don't have an account.
          <Link
            href="/user/register"
            className="text-sky-700 hover:text-sky-500"
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
