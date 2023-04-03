import React from 'react';
import { useAppSelector } from '@/store/hooks';
import CategoryList from './categoryList';
import { selectSidebarOpen } from '@/slice/sidebar.slice';

const SideBar: React.FC = () => {
  const sideBarOpen = useAppSelector(selectSidebarOpen);

  return (
    <div
      className={`padding-l sidebar-w h-full min-h-screen border-gray-600 bg-sky-50 pt-20 max-lg:w-full max-md:fixed max-md:left-0 max-md:top-0 max-md:z-20 max-md:bg-white max-md:pr-[4vw] max-md:pt-32 md:border-r-2 md:pr-5 ${
        !sideBarOpen && 'max-md:hidden'
      }`}
    >
      <CategoryList />
    </div>
  );
};

export default SideBar;
