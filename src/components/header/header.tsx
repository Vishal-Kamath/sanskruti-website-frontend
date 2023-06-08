"use client";

import { useState, FC } from "react";
import TopBanner from "./topBanner";
import SearchBar from "./searchBar";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BiMenuAltLeft } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  closeSidebar,
  openSidebar,
  selectSidebarOpen,
} from "@/redux/slice/sidebar.slice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { selectisAuthenticated } from "@/redux/slice/user.slice";
import Navbar from "./navbar";

const Header: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const sideBarOpen = useAppSelector(selectSidebarOpen);
  const isAuthenticated = useAppSelector(selectisAuthenticated);

  const userRedirect = () => {
    if (!isAuthenticated) return router.push("/auth/login");
    router.push("/user/details");
  };
  const userRedirectCart = () => {
    if (!isAuthenticated) return router.push("/auth/login");
    router.push("/user/cart");
  };
  const userRedirectWishList = () => {
    if (!isAuthenticated) return router.push("/auth/login");
    router.push("/user/wishlist");
  };

  return (
    <header className="fixed top-0 isolate z-40 flex w-full flex-col border-b-2 border-gray-200 text-black">
      <TopBanner />

      <div className="flex h-12 items-center justify-between bg-white px-[5vw]">
        <div className="flex items-center gap-2">
          <div className="sm:hidden">
            {sideBarOpen ? (
              <RxCross2
                className="text-2xl"
                onClick={() => dispatch(closeSidebar())}
              />
            ) : (
              <BiMenuAltLeft
                className="text-2xl"
                onClick={() => dispatch(openSidebar())}
              />
            )}
          </div>

          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="Sanskruti Logo"
              width={100}
              height={100}
              className="aspect-square h-12 w-fit"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            classname="max-md:hidden min-w-[25rem] rounded-md"
            search={search}
            setSearch={setSearch}
          />
          <div onClick={userRedirect}>
            <HiOutlineUserCircle className="h-6 w-6" />
          </div>
          <div onClick={userRedirectWishList}>
            <AiOutlineHeart className="h-6 w-6" />
          </div>
          <MdOutlineShoppingBag
            onClick={userRedirectCart}
            className="h-6 w-6"
          />
        </div>
      </div>

      <div className="bg-white px-[5vw] pb-2 md:hidden">
        <SearchBar
          classname="rounded-full"
          search={search}
          setSearch={setSearch}
        />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
