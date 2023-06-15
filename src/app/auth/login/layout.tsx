import { Metadata } from "next";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sanskruti Nx - Login",
};

interface Props {
  children?: ReactNode;
}
const UserLoginLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserLoginLayout;
