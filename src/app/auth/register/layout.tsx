import { Metadata } from "next";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sanskruti Nx - Register",
};

interface Props {
  children?: ReactNode;
}
const UserRegisterLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserRegisterLayout;
