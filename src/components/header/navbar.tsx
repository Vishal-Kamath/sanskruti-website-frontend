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

  const [hover, setHover] = useState(false);

  return (
    <div
      className={cn(
        "relative flex w-full justify-center px-[3vw] max-md:hidden",
        block && "hidden"
      )}
    >
      <div
        className="flex w-full max-w-4xl justify-center max-md:hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <nav className="flex h-12 w-full items-center justify-between">
          {categories?.map((category) => (
            <div
              key={category.Title}
              className={cn(
                "flex items-center justify-center gap-[2px] rounded-md p-2 text-[14px] font-semibold capitalize",
                "hover:bg-red-100 hover:text-sanskrutiRed",
                category.Title === displayCategory?.Title &&
                  "group-hover:bg-red-100 group-hover:text-sanskrutiRed"
              )}
              onMouseEnter={() => {
                setDisplayCategory(category);
              }}
            >
              {category.Title} <FaAngleDown />
            </div>
          ))}
        </nav>
        <div
          className={cn(
            "absolute left-1/2 top-12 hidden w-full max-w-4xl -translate-x-1/2 pt-2",
            hover && "block"
          )}
        >
          <div className="h-[25rem] rounded-md border-[1px] border-gray-200 bg-white shadow-lg">
            <div className="flex h-full w-full gap-3 overflow-hidden p-5">
              <div className="flex w-full flex-col gap-4">
                <h3 className="text-lg font-semibold capitalize">
                  {displayCategory?.Title}
                </h3>
                <div className="flex h-[15rem] w-full flex-col flex-wrap gap-3 text-sm leading-none text-gray-700">
                  {displayCategory?.subCategory.map((item, index) => (
                    <Link
                      key={item + index + displayCategory?.Title}
                      href={`/category/${encodeURIComponent(
                        displayCategory?.Title
                      )}/${encodeURIComponent(item)}`}
                      className="w-fit capitalize hover:font-medium hover:text-sanskrutiRed hover:underline hover:underline-offset-4"
                      onClick={() => setHover(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="aspect-[2/3] h-full shrink-0 overflow-hidden rounded-sm">
                {!!displayCategory?.Image && (
                  <Image
                    src={displayCategory?.Image}
                    alt={displayCategory?.Title}
                    width={1080}
                    height={720}
                    className="h-full w-full object-cover object-top"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
