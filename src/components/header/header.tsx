"use client";

import { useState, FC, useCallback } from "react";
import TopBanner from "./topBanner";
import SearchBar from "./searchBar";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  closeSidebar,
  openSidebar,
  selectSidebarOpen,
} from "@/redux/slice/sidebar.slice";
import Image from "next/image";
import Navbar from "./navbar";
import axios from "axios";
import SearchResults from "./searchResults";
import { cn } from "@/utils/lib";
import { NavbarDrawer } from "./navbarDrawer";
import { usePathname } from "next/navigation";
import Account from "./account";

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

  return (
    <header className="fixed top-0 isolate z-40 flex w-full flex-col border-b-[1px] border-gray-200 bg-white text-black">
      <TopBanner />

      <div className="flex h-16 items-center justify-between gap-24 px-[3vw]">
        <div className="flex items-center gap-2">
          <div className={cn("md:hidden", sideBarBlocked && "hidden")}>
            {sideBarOpen ? (
              <RxCross2
                className="text-2xl"
                onClick={() => dispatch(closeSidebar())}
              />
            ) : (
              <AiOutlineMenu
                className="text-2xl"
                onClick={() => dispatch(openSidebar())}
              />
            )}
          </div>

          <Link href="/" className="h-full w-fit flex-shrink-0 py-1">
            <Image
              src="/assets/sanskruti-logo.svg"
              alt="Sanskruti Logo"
              width={100}
              height={100}
              className="aspect-auto md:h-full md:w-full md:max-w-[10rem]"
            />
          </Link>
        </div>

        <div className="flex h-full items-center gap-3 md:w-full">
          <SearchBar
            classname="ml-auto max-md:hidden min-w-[20rem]"
            searchFocused={searchFocused}
            setSearchFocused={setSearchFocused}
            search={search}
            setSearch={handleSearchInput}
          />
          <Account />
        </div>
      </div>

      <div className="flex h-12 items-center bg-white px-[3vw] md:hidden">
        <SearchBar
          search={search}
          setSearch={handleSearchInput}
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
        />
      </div>
      <Navbar />
      <SearchResults
        searchResults={searchResults}
        className={cn((!search || !searchFocused) && "hidden")}
      />

      <NavbarDrawer sidebarOpen={sideBarOpen} />
    </header>
  );
};

export default Header;
