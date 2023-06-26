"use client";

import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import { FilterType, filters } from "@/data/filterlist";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import UIButton from "../common/button";
import Link from "next/link";
import { cn } from "@/utils/lib";

export const NavbarDrawer: FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  const pathname = usePathname();
  const [displayFilter, setDisplayFilter] = useState<FilterType>();

  const isBlocked = pathname.includes("/category");

  return (
    <div
      className={cn(
        "fixed left-0 top-0 -z-30 max-h-screen min-h-screen w-full overflow-auto bg-white px-[3vw] pt-32 scrollbar-none",
        !sidebarOpen && "hidden",
        isBlocked && "max-sm:hidden"
      )}
    >
      {!displayFilter ? (
        <div className="grid grid-cols-2 gap-2">
          {filters.map((filter) => (
            <button
              key={filter.main + " nav"}
              onClick={() => setDisplayFilter(filter)}
              className="relative h-32"
            >
              <Image
                src={filter.image}
                alt={filter.main + " nav image"}
                className="h-full w-full object-cover object-top"
                height={100}
                width={100}
              />
              <div className="absolute bottom-0 flex h-8 w-full items-center justify-center gap-1 bg-white bg-opacity-75">
                {filter.main} <FaAngleDown />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <UIButton
              onClick={() => setDisplayFilter(undefined)}
              className="px-4"
            >
              Back
            </UIButton>
            <span className="text-lg font-bold">{displayFilter.main}</span>
          </div>
          <Image
            src={displayFilter.image}
            alt={displayFilter.main + " image"}
            width={100}
            height={100}
            className="h-40 w-full object-cover object-top"
          />
          <div className="flex flex-col gap-1 pb-20">
            {displayFilter.sub.map((item, index) => (
              <Link
                key={item.title + index + displayFilter.main + " sidebar"}
                href={`/category/${displayFilter.main}/?${
                  displayFilter.main
                }=${encodeURIComponent(item.title)}`}
                className="text-lg"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
