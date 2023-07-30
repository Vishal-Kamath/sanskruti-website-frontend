"use client";

import { selectCart, setCart } from "@/redux/slice/cart.slice";
import {
  NotificationType,
  setNotification,
  showNotification,
} from "@/redux/slice/notification.slice";
import {
  loggedOut,
  selectUsername,
  selectisAuthenticated,
  setUser,
} from "@/redux/slice/user.slice";
import { selectWishlistIds, setWishlist } from "@/redux/slice/wishlist.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { cn } from "@/utils/lib";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { AiOutlineFileDone, AiOutlineHeart } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";
import { FaAngleDown, FaRegAddressCard } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { MdShoppingCart } from "react-icons/md";

type AccoutElementType = {
  title: string;
  ref?: string;
  onClick?: VoidFunction;
  notification?: number | string;
  icon: IconType;
};

const AccoutElement: FC<{ element: AccoutElementType }> = ({ element }) =>
  element.ref ? (
    <Link
      href={element.ref}
      className="flex w-full items-center gap-3 border-b-[1px] border-gray-400 bg-slate-50 px-4 py-3 last:border-0 hover:bg-sky-100"
    >
      <element.icon className="h-5 w-5" />{" "}
      <span className="capitalize">{element.title}</span>{" "}
      <span
        className={cn(
          "ml-auto flex items-center justify-center rounded-full bg-sanskrutiRed px-2 py-[2px] text-xs leading-none text-white",
          !element.notification && "hidden"
        )}
      >
        {element.notification}
      </span>
    </Link>
  ) : (
    <button
      onClick={element.onClick}
      className={cn(
        "flex w-full items-center gap-3 border-b-[1px] border-gray-400 bg-slate-50 px-4 py-3 last:border-0",
        element.title === "Sign Out" ? "hover:bg-red-100" : "hover:bg-sky-100"
      )}
    >
      <element.icon className="h-5 w-5" />{" "}
      <span className="capitalize">{element.title}</span>{" "}
      <span
        className={cn(
          "ml-auto flex items-center justify-center rounded-full bg-sanskrutiRed px-2 py-[2px] text-xs leading-none text-white",
          !element.notification && "hidden"
        )}
      >
        {element.notification}
      </span>
    </button>
  );

const Account: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectisAuthenticated);
  const username = useAppSelector(selectUsername);
  const userWishlistIds = useAppSelector(selectWishlistIds);
  const cart = useAppSelector(selectCart);

  // dropdown open and close
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const openDropdown = () => setDropdownOpen(true);
  const closeDropdown = () => setDropdownOpen(false);

  // close dropdown
  useEffect(() => {
    const closeWithDelay = () => {
      if (dropdownOpen) setTimeout(closeDropdown, 50);
    };
    document.addEventListener("click", closeWithDelay);

    return () => {
      document.removeEventListener("click", closeWithDelay);
    };
  }, [dropdownOpen]);

  const signout = async () => {
    const doesTheUserWantToSignOut = confirm(
      "Are you sure you want to sign out?"
    );
    if (doesTheUserWantToSignOut) {
      const registerResponse = await axios
        .get<NotificationType>(`${process.env.ENDPOINT}/api/v1/user/logout`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          dispatch(
            setNotification({ message: response.message, type: response.type })
          );
          dispatch(showNotification());
          dispatch(loggedOut());
          dispatch(setUser({ address: [] }));
          dispatch(setCart({ cart: [] }));
          dispatch(setWishlist({ ids: [], list: [] }));
          return router.replace("/");
        })
        .catch((err) => {
          const response = err.response.data;
          dispatch(
            setNotification({
              message: response.message,
              type: response.type,
            })
          );
          dispatch(showNotification());
        });
    }
  };

  const userLoggedInDropdown: AccoutElementType[] = [
    {
      title: "Account",
      ref: "/user/account",
      icon: BsFillPersonFill,
    },
    {
      title: "Wishlist",
      ref: "/user/wishlist",
      notification:
        userWishlistIds.length > 99 ? "99+" : userWishlistIds.length,
      icon: AiOutlineHeart,
    },
    {
      title: "Cart",
      ref: "/user/cart",
      notification: cart.length > 99 ? "99+" : cart.length,
      icon: MdShoppingCart,
    },
    {
      title: "Orders",
      ref: "/user/order",
      icon: AiOutlineFileDone,
    },
    {
      title: "Address",
      ref: "/user/address",
      icon: FaRegAddressCard,
    },
    {
      title: "Sign Out",
      onClick: signout,
      icon: BiLogOut,
    },
  ];

  const pathname = usePathname();
  const redirect =
    pathname === "/" ? "" : `?redirect=${encodeURIComponent(pathname)}`;
  const userLoggedOutDropdown: AccoutElementType[] = [
    {
      title: "Login In",
      ref: `/auth/login${redirect}`,
      icon: BiLogIn,
    },
    {
      title: "Register",
      ref: `/auth/register${redirect}`,
      icon: BsFillPersonPlusFill,
    },
  ];

  return (
    <div className="flex h-full items-center gap-2">
      {isAuthenticated && (
        <>
          <Link
            href="/user/wishlist"
            title="Wishlist"
            className="relative flex aspect-square h-fit items-center gap-2 rounded-full border-[1px] border-gray-400 bg-slate-50 p-[6px] outline-none hover:border-sky-600 hover:bg-sky-100 max-md:hidden"
          >
            <AiOutlineHeart className="h-6 w-6" />
            <div
              className={cn(
                "absolute -right-[6px] -top-[6px] flex items-center justify-center rounded-full bg-sanskrutiRed text-xs text-white",
                userWishlistIds.length === 0 && "hidden",
                userWishlistIds.length > 99 ? "p-[2px]" : "h-4 w-4"
              )}
            >
              {userWishlistIds.length > 99 ? "99+" : userWishlistIds.length}
            </div>
          </Link>

          <Link
            href="/user/cart"
            title="Cart"
            className="relative flex aspect-square h-fit items-center gap-2 rounded-full border-[1px] border-gray-400 bg-slate-50 p-[6px] outline-none hover:border-sky-600 hover:bg-sky-100 max-md:hidden"
          >
            <MdShoppingCart className="h-6 w-6" />
            <div
              className={cn(
                "absolute -right-[6px] -top-[6px] flex items-center justify-center rounded-full bg-sanskrutiRed text-xs text-white",
                cart.length === 0 && "hidden",
                cart.length > 99 ? "p-[2px]" : "h-4 w-4"
              )}
            >
              {cart.length > 99 ? "99+" : cart.length}
            </div>
          </Link>
        </>
      )}
      <div
        className="relative flex h-full items-center"
        onMouseOver={openDropdown}
        onMouseLeave={closeDropdown}
      >
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border-[1px] border-gray-400 bg-slate-50 p-[6px] outline-none",
            dropdownOpen && "border-sky-600 bg-sky-100"
          )}
        >
          <HiOutlineUserCircle className="h-6 w-6" />
          <FaAngleDown
            className={cn(
              "h-4 w-4 transition-all duration-300",
              dropdownOpen && "rotate-180"
            )}
          />
        </div>

        <div
          className={cn(
            "absolute right-0 top-14 z-40 pt-2",
            !dropdownOpen && "hidden"
          )}
        >
          <div className=" w-[15rem] overflow-hidden rounded-md border-[1px] border-gray-400 bg-white shadow-lg">
            <h3 className="break-words border-b-[1px] border-gray-400 p-5 text-right text-[16px] capitalize">
              Hello, {isAuthenticated && username ? username : "Guest"}
            </h3>
            {isAuthenticated
              ? userLoggedInDropdown.map((element, index) => (
                  <AccoutElement
                    key={element.title + index}
                    element={element}
                  />
                ))
              : userLoggedOutDropdown.map((element, index) => (
                  <AccoutElement
                    key={element.title + index}
                    element={element}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
