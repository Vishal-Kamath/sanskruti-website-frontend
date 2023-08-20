"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const SearchBox: FC<{ searchText?: string }> = ({ searchText }) => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathnameArray = usePathname().split("/");

  const searchRedirect = async (value: string) => {
    pathnameArray[4] = value ? value : "_";
    const newPath = pathnameArray.join("/");
    router.push(newPath);
  };

  const handleSearch = useCallback(
    debounce((value: string) => searchRedirect(value), 750),
    []
  );

  useEffect(() => {
    setSearch(decodeURIComponent(searchText || search));
  }, [searchText]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
      <span>Searched for:</span>
      <input
        ref={inputRef}
        type="text"
        name="searchFilter"
        id="searchFilter"
        value={search}
        onChange={(e) => {
          handleSearch(e.target.value);
          setSearch(e.target.value);
        }}
        className="border-0 border-b-[1px] border-gray-800 py-1 outline-none"
      />
    </div>
  );
};

export default SearchBox;
