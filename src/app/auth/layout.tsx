import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-20 font-ysabeau text-black">
      <div className="flex min-h-[70vh] w-full flex-col justify-center px-5 sm:max-w-[30rem]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
