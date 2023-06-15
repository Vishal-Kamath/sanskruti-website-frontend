import { Metadata } from "next";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sanskruti Nx - Forgot password",
};

interface Props {
  children?: ReactNode;
}
const UserForgotPasswordLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserForgotPasswordLayout;
