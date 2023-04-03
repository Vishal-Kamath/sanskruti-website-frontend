import { selectSearchInput, setSearchInput } from '@/slice/search.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FaSearch } from 'react-icons/fa';
import React from 'react';

const SearchBar: React.FC<{ classname: string }> = ({ classname }) => {
  const searchInput = useAppSelector(selectSearchInput);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${classname} flex h-9 w-full items-center gap-2 rounded-lg border-2 border-black bg-white px-3`}
    >
      <FaSearch className="text-sky-700" />
      <input
        type="text"
        value={searchInput}
        className="h-full w-full outline-none"
        onChange={(e) => dispatch(setSearchInput(e.target.value))}
      />
    </div>
  );
};

export default SearchBar;
