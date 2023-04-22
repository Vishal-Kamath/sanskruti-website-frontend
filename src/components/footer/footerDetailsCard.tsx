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
      <h5 className="max-md:px-[4vw] py-2 text-ms font-bold flex items-center justify-between">
        <span>{title}</span>
        <span className="md:hidden text-xl">
          {open ? (
            <AiOutlineMinus onClick={() => setOpen(false)} />
          ) : (
            <AiOutlinePlus onClick={() => setOpen(true)} />
          )}
        </span>
      </h5>
      <div
        className={`max-md:px-[4vw] max-md:bg-gray-300 py-1 flex flex-col gap-1 ${
          !open && 'max-md:hidden'
        }`}
      >
        {list.map((listItem) => {
          return !listItem.link ? (
            <span className="leading-none">{listItem.title}</span>
          ) : listItem.inWebsiteLink ? (
            <Link href={listItem.link} className="leading-none">
              {listItem.title}
            </Link>
          ) : (
            <a href={listItem.link} target="_blank" className="leading-none">
              {listItem.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FooterDetailsCard;
