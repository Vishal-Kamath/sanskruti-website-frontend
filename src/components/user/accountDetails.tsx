import { UserType } from "@/slice/user.slice";
import { FC } from "react";
import { BsPerson } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

interface Props {
  user: UserType;
}
const AccountDetails: FC<Props> = ({ user }) => {
  return (
    <div className="w-full rounded-md border-2 border-gray-300 [&>*]:p-3">
      <div className="border-b-2 border-gray-300 bg-gray-100 text-lg font-medium">
        Profile Details
      </div>
      <div className="flex gap-3">
        <BsPerson className="h-16 w-16 rounded-full bg-amber-50 p-3 text-amber-400" />
        <div className="flex flex-col gap-1">
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.mobileNo}</div>
          <button className="mt-4 flex w-fit items-center gap-1 border-amber-400 text-amber-400 hover:border-b-2">
            <span>Edit</span>
            <AiFillEdit />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
