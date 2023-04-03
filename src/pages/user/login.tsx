import { HiOutlineMail } from 'react-icons/hi';
import Link from 'next/link';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import SignLayout from '@/components/signLayout';
import { Input } from '@/components/input';
import Head from 'next/head';

const LoginPage: NextPageWithLayout = () => {
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
          />

          {/* Password */}
          <Input
            input_type="password"
            placeholder="Password"
            symbol={<span>***</span>}
          />

          <button
            type="button"
            className="h-10 rounded-md bg-sky-700 text-white hover:bg-sky-500"
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
