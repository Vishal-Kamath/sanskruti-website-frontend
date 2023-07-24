"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

type DetailsListProps = {
  title: string;
  link?: string;
  inWebsiteLink?: boolean;
}[];

const FooterDetailsCard: FC<{
  title: string;
  list: DetailsListProps;
}> = ({ title, list }) => {
  return (
    <div className="flex flex-col">
      <h5 className="flex items-center justify-between py-2 font-semibold">
        <span>{title}</span>
      </h5>
      <div className="flex flex-col gap-1 py-1">
        {list.map((listItem) => {
          return !listItem.link ? (
            <span key={listItem.title} className="leading-none">
              {listItem.title}
            </span>
          ) : listItem.inWebsiteLink ? (
            <Link
              href={listItem.link}
              key={listItem.title}
              className="leading-none"
            >
              {listItem.title}
            </Link>
          ) : (
            <a
              href={listItem.link}
              target="_blank"
              key={listItem.title}
              className="leading-none"
            >
              {listItem.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FooterDetailsCard;
