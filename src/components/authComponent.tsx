"use client";

import {
  UserType,
  loggedIn,
  loggedOut,
  selectUser,
  setUser,
} from "@/redux/slice/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { FC, HTMLAttributes, useEffect, useRef } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const AuthComponent: FC<Props> = ({ children }) => {
  const firstFetch = useRef(true);

  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const router = useRouter();

  const getUser = async () => {
    await axios
      .get<UserType>(`${process.env.ENDPOINT}/api/v1/user/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(
          setUser({
            username: response.data.username,
            email: response.data.email,
            Mobile_No: response.data.Mobile_No,
            address: response.data.address,
          })
        );
        dispatch(loggedIn());
        firstFetch.current = false;
      })
      .catch(() => {
        dispatch(setUser({ address: [] }));
        dispatch(loggedOut());
      });

    if (!user.isAuthenticated && pathname.includes("/user")) {
      router.replace("/");
    }
  };

  useEffect(() => {
    if (firstFetch.current || pathname.includes("/user")) {
      getUser();
      console.log("fetch");
    }
  }, [pathname]);

  return <>{children}</>;
};

export default AuthComponent;
