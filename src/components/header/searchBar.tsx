import { cn } from "@/utils/lib";
import { useRouter } from "next/navigation";
import React, { SetStateAction, Dispatch } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar: React.FC<{
  search: string;
  setSearch: (inputVal: string) => void;
  searchFocused: boolean;
  setSearchFocused: Dispatch<SetStateAction<boolean>>;
  classname?: string;
}> = ({ search, setSearch, searchFocused, setSearchFocused, classname }) => {
  const router = useRouter();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" && search) {
      router.push(`/search/_/_/${search}`);
      setSearch("");
    }
  };

  return (
    <div
      className={cn(
        "text-md group flex h-9 w-full items-center gap-1 rounded-full border-[1px] bg-slate-50 pl-2 pr-1 md:max-w-lg",
        searchFocused ? "border-gray-600" : "border-gray-200",
        classname
      )}
    >
      <AiOutlineSearch
        className={cn(
          "aspect-sqaure text-xl",
          searchFocused ? "text-gray-600" : "text-gray-400"
        )}
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        aria-label="search"
        aria-autocomplete="none"
        className="h-full w-full border-none bg-transparent p-0 outline-none"
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setTimeout(() => setSearchFocused(false), 500)}
        onKeyDown={handleSearch}
        placeholder="Search for products, brands and more"
      />
      <button
        className="hidden h-7 rounded-full bg-slate-200 px-3 py-1 text-xs outline-none group-focus-within:block hover:bg-slate-300"
        onClick={() => {
          if (search) {
            router.push(`/search/_/_/${search}`);
            setSearch("");
          }
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
