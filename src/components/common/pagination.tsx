"use client";

import Link from "next/link";
import { FC } from "react";
import UIButton from "./button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/utils/lib";

const Pagination: FC<{ currentPage: number; totalPages: number }> = ({
  currentPage,
  totalPages,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getLink = (nextPage: number) => {
    const current = new URLSearchParams(searchParams.toString());

    let link = pathname;
    nextPage <= 1
      ? current.delete("page")
      : current.set("page", encodeURIComponent(nextPage));

    link += current.toString() ? `?${current.toString()}` : "";
    return link;
  };

  const getFiveLinks = (): number[] => {
    const fiveLinksArray = [
      currentPage - 4,
      currentPage - 3,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      currentPage + 4,
    ].filter((num) => num > 0 && num <= totalPages);

    const indexOfCurrent = fiveLinksArray.indexOf(currentPage);
    const lastIndex =
      indexOfCurrent + 2 <= totalPages
        ? indexOfCurrent + 2
        : indexOfCurrent + 1 <= totalPages
        ? indexOfCurrent + 1
        : indexOfCurrent;
    return fiveLinksArray.slice(lastIndex - 5, lastIndex);
  };

  return (
    <div className="mx-auto mt-10 flex w-full max-w-md items-center justify-center gap-3">
      {currentPage > 1 && (
        <Link href={getLink(currentPage - 1)}>
          <UIButton className="w-fit rounded-full border-[1px] p-1">
            <FaAngleLeft />
          </UIButton>
        </Link>
      )}
      {getFiveLinks().map((number) => (
        <Link
          href={getLink(number)}
          key={"pagination link " + number}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full hover:bg-slate-100",
            number === currentPage ? "font-extrabold" : "font-normal"
          )}
        >
          {number}
        </Link>
      ))}
      {currentPage + 1 <= totalPages && (
        <Link href={getLink(currentPage + 1)}>
          <UIButton className="w-fit rounded-full border-[1px] p-1">
            <FaAngleRight />
          </UIButton>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
