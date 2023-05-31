import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NextPageWithLayout } from "../_app";
import { UserType, selectUser, setUser } from "@/slice/user.slice";
import { BsPerson } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { ReactElement, useEffect } from "react";
import UserLayout from "@/components/layouts/userLayout";
import axios from "axios";
import { setNotification, showNotification } from "@/slice/notification.slice";
import { useRouter } from "next/router";

const UserPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const checkAuth = async () => {
    const registerResponse = await axios
      .get<UserType>(`${process.env.ENDPOINT}/api/v1/user/`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (res.status === 200) {
          return dispatch(setUser(response));
        }
        dispatch(
          setNotification({
            message: "Something went wrong",
            type: "error",
          })
        );
        router.push("/user/login");
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        dispatch(
          setNotification({
            message: "Something went wrong",
            type: "error",
          })
        );
        dispatch(showNotification());
        router.push("/user/login");
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="h-full w-full overflow-hidden rounded-md border-2 border-gray-300 [&>*]:p-3">
      <div className="border-b-2 border-gray-300 bg-gray-200 text-lg font-medium">
        Profile Details
      </div>
      <div className="flex gap-3">
        <BsPerson className="h-16 w-16 rounded-full bg-amber-50 p-3 text-amber-400" />
        <div className="flex flex-col gap-1">
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.Mobile_No}</div>
          <button className="mt-4 flex w-fit items-center gap-1 border-b-2 border-white text-amber-400 hover:border-amber-400">
            <span>Edit</span>
            <AiFillEdit />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
