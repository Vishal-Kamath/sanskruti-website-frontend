import Link from 'next/link';
import React, { useState } from 'react';
import { filters } from '../filterBar/filtersList';

const CategoryCard: React.FC<{
  image: string;
  title: string;
  link: string;
}> = ({ title, image, link }) => {
  const [open, setOpen] = useState(false);
  const category = filters.find((filter) => filter.main === title);
  return (
    <div className="group flex flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-300 bg-white max-sm:flex-col">
      <div
        onClick={() => setOpen(!open)}
        className="relative h-[10rem] w-full overflow-hidden sm:h-[25rem]"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full transition-all ease-in-out group-hover:scale-110 max-sm:object-cover max-sm:object-top sm:aspect-auto"
        />
        <div className="absolute bottom-0 grid h-16 w-full place-content-center bg-white bg-opacity-50 text-xl font-semibold text-black group-hover:bg-opacity-70">
          {title}
        </div>
      </div>
      {open && (
        <div className="custom_scrollbar flex max-h-[25rem] w-full flex-col gap-1 overflow-y-auto px-3 py-5 text-xl">
          {category?.sub.map((subItem) => (
            <Link href={`${link}?${title}=${subItem.title}`}>
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
