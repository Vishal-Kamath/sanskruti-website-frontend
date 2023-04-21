import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar: React.FC<{
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  classname?: string;
}> = ({ search, setSearch, classname }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <div
      className={`${classname} w-full px-2 gap-1 max-w-xl text-md flex items-center h-9 border-2 ${
        searchFocused ? 'border-gray-600' : 'border-gray-200'
      } bg-gray-100`}
    >
      <AiOutlineSearch
        className={`aspect-sqaure text-xl ${
          searchFocused ? 'text-gray-600' : 'text-gray-400'
        }`}
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="outline-none border-none w-full bg-transparent"
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        placeholder="Search for Products, Styles..."
      />
    </div>
  );
};

export default SearchBar;
