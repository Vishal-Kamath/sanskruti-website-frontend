import { Metadata } from "next";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sanskruti Nx - Email Verification",
};

interface Props {
  children?: ReactNode;
}
const UserEmailVerificationLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserEmailVerificationLayout;
