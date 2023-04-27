import Link from 'next/link';
import React from 'react';

const CategoryCard: React.FC<{
  image: string;
  title: string;
  link: string;
}> = ({ title, image, link }) => {
  return (
    <Link
      href={link}
      className="group relative h-[25rem] flex-shrink-0 overflow-hidden rounded-lg bg-gray-200"
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-all ease-in-out group-hover:scale-110"
      />
      <div className="absolute bottom-0 grid h-16 w-full place-content-center bg-white bg-opacity-50 text-xl font-semibold text-black group-hover:bg-opacity-70">
        {title}
      </div>
    </Link>
  );
};

export default CategoryCard;
