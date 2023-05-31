import { FC, HTMLAttributes } from "react";
import DashboardContainer, { DashboardElement } from "../user/dashboard";
import { useRouter } from "next/router";
import Layout from "./layout";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}
const UserLayout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  return (
    <Layout>
      <div className="flex h-full min-h-screen gap-5 px-[5vw] pb-10 pt-24 max-md:flex-col max-md:pt-36">
        <DashboardContainer dashboardTitle="My Account">
          <DashboardElement path={`/user`}>Account Details</DashboardElement>
          <DashboardElement path={`/user/address`}>Address</DashboardElement>
          <DashboardElement path={`/user/`}>Liked Products</DashboardElement>
          <DashboardElement
            onClick={() => confirm("Are you sure you want to sign out?")}
            className="text-red-500 hover:bg-red-50"
          >
            Sign Out
          </DashboardElement>
        </DashboardContainer>

        {children}
      </div>
    </Layout>
  );
};

export default UserLayout;
