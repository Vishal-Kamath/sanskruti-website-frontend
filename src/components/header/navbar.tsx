"use client";

import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/lib";
import { FaAngleDown } from "react-icons/fa";
import { useAppSelector } from "@/redux/store/hooks";
import { selectCategory } from "@/redux/slice/category.slice";

const Navbar: FC = () => {
  const { categories } = useAppSelector(selectCategory);

  const [displayCategory, setDisplayCategory] = useState(categories[0]);
  const pathname = usePathname();
  const block = pathname.includes("/auth") || pathname.includes("/user");

  return (
    <div
      className={cn(
        "relative flex justify-center bg-white px-[3vw] max-md:hidden",
        block && "hidden"
      )}
    >
      <div className="group w-fit max-md:hidden">
        <nav className="flex h-6 w-fit items-center justify-evenly gap-4 lg:gap-6">
          {categories?.map((category) => (
            <div
              key={category.Title}
              className={cn(
                "flex items-center gap-[2px] text-xs capitalize text-gray-600 lg:text-sm",
                "border-b-[1px] border-transparent hover:border-black hover:font-medium hover:text-black"
              )}
              onMouseEnter={() => {
                setDisplayCategory(category);
              }}
            >
              {category.Title} <FaAngleDown />
            </div>
          ))}
        </nav>
        <div className="absolute left-1/2 top-6 hidden h-[25rem] w-full max-w-[60rem] -translate-x-1/2 border-x-2 border-b-2 border-gray-300 bg-white group-hover:block">
          <div className="flex h-full w-full gap-3 overflow-hidden p-5">
            <div className="flex w-full flex-col gap-3">
              <h3 className="text-lg font-semibold">
                {displayCategory?.Title.toLocaleUpperCase()}
              </h3>
              <div className="flex h-[15rem] w-full flex-col flex-wrap gap-2 text-sm">
                {displayCategory?.subCategory.map((item, index) => (
                  <Link
                    key={item + index + displayCategory?.Title}
                    href={`/category/${displayCategory?.Title}?${
                      displayCategory?.Title
                    }=${encodeURIComponent(item)}`}
                    className="capitalize"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="aspect-[2/3] h-full shrink-0 overflow-hidden">
              {!!displayCategory?.Image && (
                <Image
                  src={displayCategory?.Image}
                  alt={displayCategory?.Title}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-top"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
