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
      <img src={image} alt={title} className="h-full w-full object-cover" />
      <div className="absolute bottom-0 grid h-16 w-full place-content-center from-white to-transparent text-xl font-semibold text-white group-hover:bg-gradient-to-t group-hover:text-black">
        {title}
      </div>
    </Link>
  );
};

export default CategoryCard;
