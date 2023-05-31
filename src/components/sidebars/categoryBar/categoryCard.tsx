"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { filters } from "@/data/filterlist";
import { FaAngleDown } from "react-icons/fa";
import UIButton from "@/components/common/button";
import clsx from "clsx";

interface Props {
  image: string;
  title: string;
  link: string;
}
const CategoryCard: FC<Props> = ({ title, image, link }) => {
  const [open, setOpen] = useState(false);
  const category = filters.find((filter) => filter.main === title);
  return (
    <div className="group relative flex sm:aspect-square h-fit flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 border-amber-500 bg-white max-sm:flex-col">
      <div
        onClick={() => setOpen((open) => !open)}
        style={{
          backgroundImage: `url("${image}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={clsx(
          open ? "h-[25rem]" : "h-[15rem]",
          "sm:aspect-square sm:h-full w-full overflow-hidden transition-all duration-300 ease-in-out"
        )}
      ></div>
      <div
        className={clsx(
          "absolute flex w-full cursor-default flex-col bottom-0 bg-amber-100 py-2 font-semibold",
          open ? "h-full" : "h-16"
        )}
      >
        <span className="w-full text-center text-xl font-semibold text-black">
          {title}
        </span>
        {open && (
          <div className="flex max-h-full w-full flex-col gap-1 overflow-y-auto px-3 py-5 text-lg text-black scrollbar-none">
            {category?.sub.map((subItem) => (
              <Link
                href={`${link}?${title}=${subItem.title}`}
                className="w-fit border-b-2 border-transparent font-normal hover:underline"
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <UIButton
        onClick={() => setOpen((open) => !open)}
        className="absolute bottom-4 right-4 grid h-8 w-8 place-content-center rounded-full border-amber-500 bg-white text-black hover:outline-amber-200"
      >
        <FaAngleDown
          className={`${
            !open ? "sm:rotate-180" : "max-sm:rotate-180"
          } transition-all ease-in-out`}
        />
      </UIButton>
    </div>
  );
};

export default CategoryCard;
