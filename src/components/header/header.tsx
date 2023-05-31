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

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const sideBarOpen = useAppSelector(selectSidebarOpen);

  return (
    <header className="fixed top-0 isolate z-40 flex w-full flex-col text-black shadow-md">
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
            <img
              src="/assets/logo.svg"
              alt="Sanskruti Logo"
              className="aspect-square h-12"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            classname="max-md:hidden min-w-[25rem] rounded-md"
            search={search}
            setSearch={setSearch}
          />
          <div>
            <HiOutlineUserCircle className="h-6 w-6" />
          </div>
          <Link href="/wishlist">
            <div className="relative">
              <AiOutlineHeart className="h-6 w-6" />
              <div className="absolute right-0 top-0 grid h-5 w-5 -translate-y-2 translate-x-1/2 place-content-center rounded-full bg-gray-300">
                7
              </div>
            </div>
          </Link>
          <Link href="/cart">
            <MdOutlineShoppingBag className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <div className="bg-white px-[5vw] pb-2 md:hidden">
        <SearchBar
          classname="rounded-full"
          search={search}
          setSearch={setSearch}
        />
      </div>
    </header>
  );
};

export default Header;
