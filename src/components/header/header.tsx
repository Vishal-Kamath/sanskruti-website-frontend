import React, { useState } from 'react';
import TopBanner from './topBanner';
import SearchBar from './searchBar';
import Link from 'next/link';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { BiMenuAltRight } from 'react-icons/bi';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sideBarOpen, setSideBarOpen] = useState(false); // temp sidebar logic
  return (
    <header className="flex flex-col shadow-md">
      <TopBanner />

      <div className="px-[4vw] bg-white h-12 flex items-center justify-between">
        <div className="md:hidden">
          {sideBarOpen ? (
            <RxCross2
              className="text-2xl"
              onClick={() => setSideBarOpen(false)}
            />
          ) : (
            <BiMenuAltRight
              className="text-2xl"
              onClick={() => setSideBarOpen(true)}
            />
          )}
        </div>

        <img
          src="assets/logo.svg"
          alt="Sanskruti Logo"
          className="h-12 aspect-square max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2"
        />

        <div className="flex items-center gap-3">
          <SearchBar
            classname="max-md:hidden min-w-[25rem] rounded-md"
            search={search}
            setSearch={setSearch}
          />
          <Link href="/user">
            <HiOutlineUserCircle className="h-6 w-6" />
          </Link>
          <Link href="/wishtlist">
            <div className="relative">
              <AiOutlineHeart className="h-6 w-6" />
              <div className="absolute right-0 top-0 grid h-5 w-5 -translate-y-2 translate-x-1/2 place-content-center rounded-full bg-gray-300">
                0
              </div>
            </div>
          </Link>
          <Link href="/cart">
            <MdOutlineShoppingBag className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <div className="md:hidden px-[4vw] pb-2 bg-white">
        <SearchBar
          classname="rounded-full"
          search={search}
          setSearch={setSearch}
        />
      </div>
    </header>
  );
};

export default Header;
