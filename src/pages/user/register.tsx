import { MdAlternateEmail, MdLocalPhone, MdLocationPin } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { BsCalendar3 } from 'react-icons/bs';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import SignLayout from '@/components/signLayout';
import { Input, TextArea } from '@/components/input';
import Head from 'next/head';

const RegisterPage: NextPageWithLayout = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [mobileNumber, setMobileNumber] = useState<number>();
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  return (
    <>
      <Head>
        <title>Shoppers Den - Register</title>
      </Head>
      <div className="flex w-full flex-col justify-center gap-5 rounded-md p-5">
        <div className="text-xl font-bold">Register</div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3 max-md:flex-col">
            {/* Name */}
            <Input
              input_type="text"
              placeholder="Name"
              symbol={<MdAlternateEmail />}
              value={name}
              setValue={setName}
            />

            {/* Email */}
            <Input
              input_type="email"
              placeholder="Email"
              symbol={<HiOutlineMail />}
              value={email}
              setValue={setEmail}
            />
          </div>

          <div className="flex gap-3 max-md:flex-col">
            {/* Mobile Number */}
            <Input
              input_type="number"
              placeholder="Mobile number"
              symbol={<MdLocalPhone />}
              value={mobileNumber}
              setValue={setMobileNumber}
            />

            {/* DOB */}
            <Input
              input_type="date"
              placeholder="Date of birth"
              symbol={<BsCalendar3 />}
              value={dateOfBirth}
              setValue={setDateOfBirth}
            />
          </div>

          {/* Address */}
          <TextArea
            placeholder="Address"
            symbol={<MdLocationPin />}
            value={address}
            setValue={setAddress}
          />

          <div className="flex gap-3 max-md:flex-col">
            {/* Password */}
            <Input
              input_type="password"
              placeholder="Password"
              symbol={<span>***</span>}
              value={password}
              setValue={setPassword}
            />

            {/* Confirm Password */}
            <Input
              input_type="password"
              placeholder="Confirm password"
              symbol={<span>***</span>}
              value={confirmPassword}
              setValue={setConfirmPassword}
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
