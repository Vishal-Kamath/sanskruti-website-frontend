"use client";

import { CategoryStateType, setCategory } from "@/redux/slice/category.slice";
import {
  completeLoading,
  startLoading,
  stopLoading,
} from "@/redux/slice/loading.slice";
import { closeSidebar } from "@/redux/slice/sidebar.slice";
import {
  UserType,
  loggedIn,
  loggedOut,
  setUser,
} from "@/redux/slice/user.slice";
import { WishlistType, setWishlist } from "@/redux/slice/wishlist.slice";
import { useAppDispatch } from "@/redux/store/hooks";
import axios from "axios";
import { usePathname } from "next/navigation";
import { FC, HTMLAttributes, useEffect, useRef } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}
const AuthComponent: FC<Props> = ({ children }) => {
  const firstFetch = useRef(true);

  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // close sidebar
  dispatch(closeSidebar());

  const getUser = async () => {
    dispatch(startLoading());
    dispatch(startLoading());
    await axios
      .get<{ userTrimmend: UserType }>(`${process.env.ENDPOINT}/api/v1/user/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(
          setUser({
            username: response.data.userTrimmend.username,
            email: response.data.userTrimmend.email,
            email_verified: response.data.userTrimmend.email_verified,
            Mobile_No: response.data.userTrimmend.Mobile_No,
            Mobile_No_verified: response.data.userTrimmend.Mobile_No_verified,
            address: response.data.userTrimmend.address,
            provider: response.data.userTrimmend.provider,
          })
        );
        dispatch(loggedIn());
        dispatch(completeLoading());
      })
      .catch(() => {
        dispatch(setUser({ address: [] }));
        dispatch(loggedOut());
        dispatch(completeLoading());
      });

    await axios
      .get<WishlistType>(`${process.env.ENDPOINT}/api/v1/user/wishlist`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(
          setWishlist({
            ids: response.data.ids,
            list: response.data.list,
          })
        );

        dispatch(completeLoading());
      })
      .catch(() => {
        dispatch(setWishlist({ ids: [], list: [] }));
        dispatch(completeLoading());
      });

    firstFetch.current = false;
  };

  useEffect(() => {
    if (firstFetch.current || pathname.includes("/user")) {
      getUser();
    }
    dispatch(stopLoading());
  }, [pathname]);

  const getCategories = async () => {
    dispatch(startLoading());
    const { categories } = (
      await axios.get<CategoryStateType>(
        `${process.env.ENDPOINT}/api/v1/user/categories`
      )
    ).data;

    await Promise.all(
      categories.map(async (category, index) => {
        dispatch(startLoading());
        const subCategories = (
          await axios.get<{ subCategories: { Title: string }[] }>(
            `${process.env.ENDPOINT}/api/v1/user/subCategories?keyword=${category.Title}`
          )
        ).data;
        dispatch(completeLoading());
        categories[index].subCategory = subCategories.subCategories.map(
          (subCat) => subCat.Title
        );
      })
    );
    dispatch(completeLoading());
    dispatch(setCategory({ categories: categories }));
  };

  useEffect(() => {
    getCategories();
    dispatch(stopLoading());
  }, []);

  return <>{children}</>;
};

export default AuthComponent;
