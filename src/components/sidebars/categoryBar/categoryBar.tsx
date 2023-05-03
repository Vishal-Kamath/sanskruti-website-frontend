import React from 'react';
import CategoryCard from './categoryCard';
import { useAppSelector } from '@/store/hooks';
import { selectSidebarOpen } from '@/slice/sidebar.slice';
import {motion} from 'framer-motion'

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

const CategoryBar: React.FC = () => {
  const open = useAppSelector(selectSidebarOpen);
  return (
    <div
      className={`${
        !open && 'max-sm:hidden'
      } isolate w-full bg-white px-[5vw] max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:z-30`}
    >
      <div className="flex flex-col gap-2 max-sm:max-h-screen max-sm:min-h-screen max-sm:overflow-y-auto max-sm:pt-36 max-sm:scrollbar-none">
        <h3 className="border-b-2 border-gray-300 pb-2 text-xl font-semibold">
          Categories
        </h3>
        <div className="sm:custom_scrollbar flex w-full gap-2 py-2 max-sm:flex-col max-sm:pb-20 sm:overflow-x-auto">
          {categoryList.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
