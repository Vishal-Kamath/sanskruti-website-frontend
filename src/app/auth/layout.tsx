import UIButton from "@/components/common/button";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { BiArrowBack } from "react-icons/bi";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-20 font-ysabeau text-black">
      <div className="relative flex min-h-[70vh] w-full md:max-w-[60vw] xl:max-w-[40vw]">
        {children}
        <Link href="/">
          <UIButton className="absolute left-5 top-5 flex h-9 gap-2 px-5 text-black">
            <BiArrowBack />
            <span>Back</span>
          </UIButton>
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;
