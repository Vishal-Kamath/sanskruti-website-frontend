import { useAppSelector } from "@/store/hooks";
import { NextPageWithLayout } from "../_app";
import { selectUser } from "@/slice/user.slice";
import { useRouter } from "next/router";
import DashboardContainer, {
  DashboardElement,
} from "@/components/user/dashboard";
import { useState } from "react";
import AccountDetails from "@/components/user/accountDetails";

const UserPage: NextPageWithLayout = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const [pageIndex, setPageIndex] = useState(0);

  const pages = [<AccountDetails user={user} />];

  return (
    <div className="px-[5vw] pb-10 pt-24 max-md:pt-36">
      <h2 className="mb-4 text-xl font-semibold">My Account</h2>

      <div className="flex gap-5 max-md:flex-col">
        <DashboardContainer dashboardTitle={user.name}>
          <DashboardElement onClick={() => setPageIndex(0)}>
            Account Details
          </DashboardElement>
          <DashboardElement onClick={() => setPageIndex(1)}>
            Address
          </DashboardElement>
          <DashboardElement onClick={() => setPageIndex(2)}>
            Liked Products
          </DashboardElement>
          <DashboardElement
            onClick={() => confirm("Are you sure you want to sign out?")}
            className="text-red-500 hover:bg-red-50"
          >
            Sign Out
          </DashboardElement>
        </DashboardContainer>

        {pages[pageIndex]}
      </div>
    </div>
  );
};

export default UserPage;
