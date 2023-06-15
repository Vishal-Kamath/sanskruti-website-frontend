import React, { SetStateAction, Dispatch } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar: React.FC<{
  search: string;
  setSearch: (inputVal: string) => void;
  searchFocused: boolean;
  setSearchFocused: Dispatch<SetStateAction<boolean>>;
  classname?: string;
}> = ({ search, setSearch, searchFocused, setSearchFocused, classname }) => {
  return (
    <div
      className={`${classname} text-md flex h-9 w-full max-w-2xl items-center gap-1 rounded-full border-2 px-2 ${
        searchFocused ? "border-gray-600" : "border-gray-300"
      } bg-gray-100`}
    >
      <AiOutlineSearch
        className={`aspect-sqaure text-xl ${
          searchFocused ? "text-gray-600" : "text-gray-400"
        }`}
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="w-full border-none bg-transparent outline-none"
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setTimeout(() => setSearchFocused(false), 500)}
        placeholder="Search for Products, Styles..."
      />
    </div>
  );
};

export default SearchBar;
