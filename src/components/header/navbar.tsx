"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/lib";
import { FaAngleDown } from "react-icons/fa";
import { useAppSelector } from "@/redux/store/hooks";
import { selectCategory } from "@/redux/slice/category.slice";
import { AiOutlineArrowDown } from "react-icons/ai";

const Navbar: FC = () => {
  const { categories } = useAppSelector(selectCategory);

  const [displayCategory, setDisplayCategory] = useState(categories[0]);
  const pathname = usePathname();
  const block = pathname.includes("/auth") || pathname.includes("/user");

  const [cap, setCap] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1536) {
        setCap(5);
      } else if (window.innerWidth > 1024) {
        setCap(4);
      } else if (window.innerWidth > 1024) {
        setCap(3);
      } else if (window.innerWidth > 768) {
        setCap(2);
      } else {
        setCap(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigateToCategory = () => {
    const categoryBar = document.getElementById("category") as
      | HTMLDivElement
      | undefined;
    if (!categoryBar) return;

    const top = categoryBar.offsetTop;
    window.scrollTo({ top: top - 85, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "flex h-full w-fit justify-center bg-white px-[3vw] max-md:hidden",
        block && "hidden"
      )}
    >
      <nav className="flex h-full w-fit items-center justify-evenly gap-2 max-md:hidden lg:gap-4">
        {categories.slice(0, cap)?.map((category) => (
          <div
            key={category.Title}
            className={cn(
              "peer flex h-full items-center gap-[2px] text-[10px] capitalize text-gray-600 lg:text-sm",
              "hover:font-medium hover:text-sanskrutiRed hover:underline hover:decoration-sanskrutiRed hover:underline-offset-4"
            )}
            onMouseEnter={() => {
              setDisplayCategory(category);
            }}
          >
            {category.Title} <FaAngleDown />
          </div>
        ))}
        <button
          onClick={navigateToCategory}
          key="navbar more"
          className={cn(
            "flex h-full items-center gap-[2px] text-[10px] capitalize text-gray-600 outline-none lg:text-sm",
            "hover:font-medium hover:text-sanskrutiRed hover:underline hover:decoration-sanskrutiRed hover:underline-offset-4"
          )}
        >
          More <AiOutlineArrowDown />
        </button>
        <div className="fixed left-1/2 top-[70px] hidden h-[25rem] w-full max-w-[60rem] -translate-x-1/2 bg-white shadow-md peer-hover:block hover:block">
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
                    className="w-fit capitalize hover:text-sanskrutiRed hover:underline hover:decoration-sanskrutiRed hover:underline-offset-4"
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
      </nav>
    </div>
  );
};

export default Navbar;
