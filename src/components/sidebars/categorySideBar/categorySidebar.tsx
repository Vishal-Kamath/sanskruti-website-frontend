import React from 'react';
import { selectSidebarOpen } from '@/slice/sidebar.slice';
import { useAppSelector } from '@/store/hooks';
import CategorySidebarCard from './categorySidebarCard';

// Temp Static Data
type FilterType = {
  main: string;
  sub: {
    title: string;
  }[];
};

export const filters: FilterType[] = [
  {
    main: 'Salwar Kameez',
    sub: [
      { title: 'Sharara Suits' },
      { title: 'Anarkali Suits' },
      { title: 'Palazzo Suits' },
      { title: 'Kurta Set with Dupatta' },
      { title: 'Jumpsuits' },
      { title: 'Dhoti Suits' },
      { title: 'Straight cut Salwar Kameez' },
      { title: 'Printed Salwar Kameez' },
    ],
  },
  {
    main: "Lehenga's",
    sub: [
      { title: 'Bridal lehengas' },
      { title: 'Brides maid lehengas' },
      { title: 'Croptop & Skirts lehengas' },
      { title: 'Printed lehengas' },
      { title: 'Jacket lehengas' },
      { title: 'Drape lehengas' },
      { title: 'Designer lehengas' },
    ],
  },
  {
    main: 'Indo Western',
    sub: [
      { title: 'Gown' },
      { title: 'Indowestern Anarhati' },
      { title: 'Jumpsuits' },
      { title: 'Cape Suits' },
      { title: 'Crop top Suits' },
      { title: 'Ready Pleated Sarees' },
      { title: 'Jacket lehengas' },
    ],
  },
  {
    main: "Kurti's",
    sub: [
      { title: 'Gown' },
      { title: 'Indowestern Anarhati' },
      { title: 'Jumpsuits' },
      { title: 'Cape Suits' },
      { title: 'Crop top Suits' },
      { title: 'Ready Pleated Sarees' },
      { title: 'Jacket lehengas' },
    ],
  },
];

const CategorySidebar: React.FC = () => {
  const sideBarOpen = useAppSelector(selectSidebarOpen);
  return (
    <div
      className={`${
        !sideBarOpen && 'max-sm:hidden'
      } fixed left-0 top-0 isolate z-30 flex min-h-screen w-full flex-col overflow-x-hidden overflow-y-scroll bg-white pt-24 scrollbar-none max-md:pt-36 sm:hidden`}
    >
      <h3 className="w-full border-b-2 border-gray-300 pl-[5vw] pr-4 text-lg font-bold">
        Categories
      </h3>

      <div className="px-[5vw]">
        {filters.map((filter) => (
          <CategorySidebarCard {...filter} />
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
