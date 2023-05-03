import Link from 'next/link';
import React, { useState } from 'react';
import { filters } from '../filterBar/filtersList';
import { FaAngleDown } from 'react-icons/fa';

const CategoryCard: React.FC<{
  image: string;
  title: string;
  link: string;
}> = ({ title, image, link }) => {
  const [open, setOpen] = useState(false);
  const category = filters.find((filter) => filter.main === title);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group flex flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-300 bg-white max-sm:flex-col"
    >
      <div
        style={{
          backgroundImage: `url("${image}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className={`relative ${
          open ? 'h-[25rem]' : 'h-[10rem]'
        } aspect-square w-full overflow-hidden transition-all duration-300 ease-in-out sm:h-[20rem]`}
      >
        <div
          className={`absolute ${
            open ? 'top-0 h-full' : 'bottom-0 h-16'
          } flex w-full flex-col bg-white bg-opacity-40 py-2 font-semibold backdrop-blur-2xl`}
        >
          <span className="w-full text-center text-xl text-black">{title}</span>
          {open && (
            <div className="flex max-h-full w-full flex-col gap-1 overflow-y-auto px-3 py-5 text-lg text-black scrollbar-none">
              {category?.sub.map((subItem) => (
                <Link
                  href={`${link}?${title}=${subItem.title}`}
                  className="w-fit border-b-2 border-transparent hover:border-black hover:border-opacity-25"
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* <div className="absolute bottom-4 right-4 grid h-8 w-8 place-content-center rounded-full bg-white text-black">
          <FaAngleDown
            onClick={() => setOpen(!open)}
            className={`${
              !open ? 'sm:rotate-180' : 'max-sm:rotate-180'
            } transition-all ease-in-out`}
          />
        </div> */}
      </div>
    </div>
  );
};

export default CategoryCard;
