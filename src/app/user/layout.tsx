"use client";

import DashboardContainer from "@/app/user/components/dashboard";
import { DashboardElement } from "@/app/user/components/dashboardElement";
import { selectUser } from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/store/hooks";
import { HTMLAttributes, FC } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const UserLayout: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex h-full min-h-screen gap-5 px-[5vw] pb-10 pt-24 max-md:flex-col max-md:pt-36">
      <div className="flex flex-col gap-5">
        <DashboardContainer dashboardTitle="Profile">
          <DashboardElement path="/user/details">Details</DashboardElement>
          <DashboardElement path="/user/details/edit">
            Edit profile
          </DashboardElement>
          {user.provider === "Email/Number" && (
            <DashboardElement path="/user/details/security">
              Security
            </DashboardElement>
          )}
          <DashboardElement path="/user/wishlist">WishList</DashboardElement>
          <DashboardElement path="/user/cart">Shopping Cart</DashboardElement>
          <DashboardElement className="hover:bg-red-100" path="/user/signout">
            Sign Out
          </DashboardElement>
        </DashboardContainer>

        <DashboardContainer dashboardTitle="Address">
          <DashboardElement path="/user/address">Address</DashboardElement>
          <DashboardElement path="/user/address/add">
            Add Address
          </DashboardElement>
          <DashboardElement path="/user/address/edit">
            Edit Address
          </DashboardElement>
        </DashboardContainer>
      </div>

      {children}
    </div>
  );
};

export default UserLayout;
