import Link from 'next/link';
import React, { useState } from 'react';

const categoryList: { image: string; title: string; link: string }[] = [
  {
    title: 'Salwar Kameez',
    image: '/temp/Salwar Kameez.png',
    link: '/category/Salwar Kameez',
  },
  {
    title: "Lehenga's",
    image: "/temp/Lehenga's.png",
    link: "/category/Lehenga's",
  },
  {
    title: 'Indo Western',
    image: '/temp/Indo Western.png',
    link: '/category/Indo Western',
  },
  {
    title: 'Bridal',
    image: '/temp/Bridal.png',
    link: '/category/Bridal',
  },
  {
    title: "Kurti's",
    image: "/temp/Kurti's.png",
    link: "/category/Kurti's",
  },
  {
    title: 'Western Wear',
    image: '/temp/Western Wear.png',
    link: '/category/Western Wear',
  },
  {
    title: "Dress Material's",
    image: "/temp/Dress Material's.png",
    link: "/category/Dress Material's",
  },
];

const CategorySidebarCard: React.FC<{
  main: string;
  sub: { title: string }[];
}> = ({ main, sub }) => {
  const [open, setOpen] = useState(false);
  const category = categoryList.find((category) => category.title === main);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="h-16 overflow-hidden rounded-md"
      >
        <img src={category?.image} alt="" className="object-cover" />
      </button>
      <div className="flex flex-col">
        {open &&
          sub.map((subItem) => (
            <Link
              href={`${category?.link}?${category?.title}=${subItem.title}`}
            >
              {subItem.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategorySidebarCard;
