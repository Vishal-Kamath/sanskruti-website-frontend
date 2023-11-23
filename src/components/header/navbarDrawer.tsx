"use client";

import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import UIButton from "../common/button";
import Link from "next/link";
import { cn } from "@/utils/lib";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { CategoryType, selectCategory } from "@/redux/slice/category.slice";
import { closeSidebar } from "@/redux/slice/sidebar.slice";
import { BsArrowLeft } from "react-icons/bs";

export const NavbarDrawer: FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector(selectCategory);
  const [displayCategory, setDisplayCategory] = useState<CategoryType>();

  const isBlocked = pathname.includes("/category");

  return (
    <div
      className={cn(
        "fixed left-0 top-0 -z-30 max-h-screen min-h-screen w-full overflow-auto bg-white px-[3vw] pt-40 scrollbar-none md:hidden",
        !sidebarOpen && "hidden",
        isBlocked && "max-sm:hidden"
      )}
    >
      {!displayCategory ? (
        <div className="grid grid-cols-2 gap-2 gap-y-6">
          {categories?.map((category) => (
            <button
              key={category.Title + " nav"}
              onClick={() => setDisplayCategory(category)}
              className="relative h-32 overflow-hidden rounded-b-lg rounded-t-3xl"
            >
              <Image
                src={category.Image}
                alt={category.Title + " nav image"}
                className="h-full w-full object-cover object-top"
                width={1080}
                height={720}
              />
              <div className="absolute bottom-0 flex h-8 w-full items-center justify-center gap-1 bg-white bg-opacity-75 capitalize">
                {category.Title} <FaAngleDown />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <UIButton
              onClick={() => setDisplayCategory(undefined)}
              className="w-fit rounded-full border-[1px] border-gray-300 px-6 py-1 hover:bg-gray-100"
            >
              <BsArrowLeft className="h-6 w-auto" />
            </UIButton>
            <span className="text-lg font-bold capitalize">
              {displayCategory?.Title}
            </span>
          </div>
          <Image
            src={displayCategory?.Image}
            alt={displayCategory?.Title + " image"}
            width={1080}
            height={720}
            className="h-40 w-full rounded-lg object-cover object-top"
          />
          <div className="flex w-full flex-col gap-1 pb-20">
            {displayCategory?.subCategory.map((item, index) => (
              <Link
                key={item + index + displayCategory?.Title + " sidebar"}
                href={`/category/${encodeURIComponent(
                  displayCategory?.Title
                )}?${encodeURIComponent(item)}`}
                onClick={() => dispatch(closeSidebar())}
                className="w-full border-b-[1px] border-gray-200 py-1 text-center  text-lg capitalize hover:text-sanskrutiRed"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
