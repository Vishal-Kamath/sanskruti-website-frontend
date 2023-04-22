import React, { useState } from 'react';
import TopBanner from './topBanner';
import SearchBar from './searchBar';
import Link from 'next/link';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { BiMenuAltLeft } from 'react-icons/bi';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [sideBarOpen, setSideBarOpen] = useState(false); // temp sidebar logic
  const isLoggedIn = false;

  const userRedirect = () => {
    if (!isLoggedIn) return;
    router.push('/user');
  };

  return (
    <header className="fixed top-0 isolate z-40 flex w-full flex-col text-black shadow-md">
      <TopBanner />

      <div className="flex h-12 items-center justify-between bg-white px-[5vw]">
        <div className="md:hidden">
          {router.pathname !== '/' ? (
            sideBarOpen ? (
              <RxCross2
                className="text-2xl"
                onClick={() => setSideBarOpen(false)}
              />
            ) : (
              <BiMenuAltLeft
                className="text-2xl"
                onClick={() => setSideBarOpen(true)}
              />
            )
          ) : null}
        </div>

        <Link
          href="/"
          className="max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2"
        >
          <img
            src="/assets/logo.svg"
            alt="Sanskruti Logo"
            className="aspect-square h-12"
          />
        </Link>

        <div className="flex items-center gap-3">
          <SearchBar
            classname="max-md:hidden min-w-[25rem] rounded-md"
            search={search}
            setSearch={setSearch}
          />
          <div onClick={userRedirect}>
            <HiOutlineUserCircle className="h-6 w-6" />
          </div>
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

      <div className="bg-white px-[5vw] pb-2 md:hidden">
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
