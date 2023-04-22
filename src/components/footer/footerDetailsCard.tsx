import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

type DetailsListProps = {
  title: string;
  link?: string;
  inWebsiteLink?: boolean;
}[];

const FooterDetailsCard: React.FC<{
  title: string;
  list: DetailsListProps;
}> = ({ title, list }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <h5 className="flex items-center justify-between py-2 font-bold max-md:px-[5vw]">
        <span>{title}</span>
        <span className="text-xl md:hidden">
          {open ? (
            <AiOutlineMinus onClick={() => setOpen(false)} />
          ) : (
            <AiOutlinePlus onClick={() => setOpen(true)} />
          )}
        </span>
      </h5>
      <div
        className={`flex flex-col gap-1 py-1 max-md:bg-gray-300 max-md:px-[5vw] ${
          !open && 'max-md:hidden'
        }`}
      >
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
