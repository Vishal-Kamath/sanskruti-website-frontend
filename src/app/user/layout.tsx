import DashboardContainer from "@/components/user/dashboard";
import { DashboardElement } from "@/components/user/dashboardElement";
import { HTMLAttributes, FC } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const UserLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen gap-5 px-[5vw] pb-10 pt-24 max-md:flex-col max-md:pt-36">
      <DashboardContainer dashboardTitle="My Account">
        <DashboardElement path="/user/details">
          Account Details
        </DashboardElement>
        <DashboardElement path="/user/address">Address</DashboardElement>
        <DashboardElement path="/user/">Liked Products</DashboardElement>
        <DashboardElement
        // onClick={() => confirm("Are you sure you want to sign out?")}
        // className="text-red-500 hover:bg-red-50"
        >
          Sign Out
        </DashboardElement>
      </DashboardContainer>

      {children}
    </div>
  );
};

export default UserLayout;
