import { MdAlternateEmail, MdLocalPhone, MdLocationPin } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { BsCalendar3 } from 'react-icons/bs';
import Link from 'next/link';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import SignLayout from '@/components/signLayout';
import { Input, TextArea } from '@/components/input';
import Head from 'next/head';

const RegisterPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Shoppers Den - Register</title>
      </Head>
      <div className="flex w-full flex-col justify-center gap-5 rounded-md p-5">
        <div className="text-xl font-bold">Register</div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3 max-md:flex-col">
            {/* Username */}
            <Input
              input_type="text"
              placeholder="Name"
              symbol={<MdAlternateEmail />}
            />

            {/* Email */}
            <Input
              input_type="email"
              placeholder="Email"
              symbol={<HiOutlineMail />}
            />
          </div>

          <div className="flex gap-3 max-md:flex-col">
            {/* Mobile Number */}
            <Input
              input_type="number"
              placeholder="Mobile number"
              symbol={<MdLocalPhone />}
            />

            {/* DOB */}
            <Input
              input_type="date"
              placeholder="Date of birth"
              symbol={<BsCalendar3 />}
            />
          </div>

          <TextArea placeholder="Address" symbol={<MdLocationPin />} />

          <div className="flex gap-3 max-md:flex-col">
            {/* Password */}
            <Input
              input_type="password"
              placeholder="Password"
              symbol={<span>***</span>}
            />

            {/* Confirm Password */}
            <Input
              input_type="password"
              placeholder="Confirm password"
              symbol={<span>***</span>}
            />
          </div>

          <button
            type="button"
            className="h-10 rounded-md bg-sky-700 text-white hover:bg-sky-500"
          >
            SUBMIT
          </button>
        </div>

        <span className="text-center">OR</span>

        <div className="flex justify-center gap-1">
          Already have an account,
          <Link href="/user/login" className="text-sky-700 hover:text-sky-500">
            login
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
