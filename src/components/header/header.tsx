"use client";

import { useState, FC, useCallback } from "react";
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
import Image from "next/image";
import { selectisAuthenticated } from "@/redux/slice/user.slice";
import Navbar from "./navbar";
import axios from "axios";
import SearchResults from "./searchResults";
import { cn } from "@/utils/lib";
import { NavbarDrawer } from "./navbarDrawer";
import { usePathname } from "next/navigation";
import { selectWishlistIds } from "@/redux/slice/wishlist.slice";

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  images: string[];
  varients: {
    attributes: {
      name: string;
      state: boolean;
      childern: {
        value: string;
        state: boolean;
      }[];
    }[];
    variations: {
      quantity: number;
      discount: number;
      price: number;
      combinationString: string[];
    }[];
  };
  gst_percent: number;
  MainCategory: string;
  SubCategory: string;
  brand_name: string;
  slug: string;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  meta_tittle: string;
  meta_description: string;
  meta_keyword: string;
}

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const handleSearch = useCallback(
    debounce((inputVal: string) => fetchResults(inputVal), 750),
    []
  );
  const handleSearchInput = (value: string) => {
    setSearch(value);
    handleSearch(value);
  };

  const [searchResults, setSearchResults] = useState<ProductType[]>([]);

  const fetchResults = async (inputVal: string) => {
    try {
      if (inputVal !== "") {
        const { data } = await axios.get<{ products: ProductType[] }>(
          `${process.env.ENDPOINT}/api/v1/user/getallProducts?keyword=${inputVal}`
        );
        setSearchResults(data.products);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sideBarOpen = useAppSelector(selectSidebarOpen);
  const sideBarBlocked =
    pathname.includes("/auth") || pathname.includes("/user");

  const isAuthenticated = useAppSelector(selectisAuthenticated);

  const userRedirect = !isAuthenticated ? "/auth/login" : "/user/details";
  const userRedirectCart = !isAuthenticated ? "/auth/login" : "/user/cart";
  const userRedirectWishList = !isAuthenticated
    ? "/auth/login"
    : "/user/wishlist";

  const userWishlistIds = useAppSelector(selectWishlistIds);

  return (
    <header className="fixed top-0 isolate z-40 flex w-full flex-col border-b-2 border-gray-300 text-black">
      <TopBanner />

      <div className="flex h-12 w-full items-center justify-between bg-white px-[3vw]">
        <div className="flex items-center gap-2">
          <div className={cn("md:hidden", sideBarBlocked && "hidden")}>
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

          <Link href="/" className="h-full w-[5rem] flex-shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Sanskruti Logo"
              width={100}
              height={100}
              className="aspect-auto h-full w-full"
            />
          </Link>
        </div>

        <Navbar />

        <div className="flex w-fit items-center gap-2">
          <SearchBar
            classname="max-md:hidden min-w-[20rem] ml-auto md:w-full"
            searchFocused={searchFocused}
            setSearchFocused={setSearchFocused}
            search={search}
            setSearch={handleSearchInput}
          />
          <Link href={userRedirect}>
            <HiOutlineUserCircle className="h-6 w-6" />
          </Link>
          <Link href={userRedirectWishList} className="relative">
            <AiOutlineHeart className="h-6 w-6" />
            <div
              className={cn(
                "absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sky-200 text-xs font-bold",
                !userWishlistIds?.length && "hidden"
              )}
            >
              {userWishlistIds?.length}
            </div>
          </Link>
          <Link href={userRedirectCart}>
            <MdOutlineShoppingBag className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <div className="bg-white px-[3vw] pb-2 md:hidden">
        <SearchBar
          search={search}
          setSearch={handleSearchInput}
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
        />
      </div>
      <SearchResults
        searchResults={searchResults}
        className={cn((!search || !searchFocused) && "hidden")}
      />

      <NavbarDrawer sidebarOpen={sideBarOpen} />
    </header>
  );
};

export default Header;
