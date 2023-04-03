import { Tags } from '@/model/item.model';
import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import CategoryTag from './categorytag';

const Category: React.FC<{
  title:
    | 'Gender'
    | 'Master Category'
    | 'Sub Category'
    | 'Article Type'
    | 'Base Color'
    | 'Season'
    | 'Usage';
  list: string[];
  allTags: Tags;
}> = ({ title, list, allTags }) => {
  const [openList, setOpenList] = useState(false);
  const categoryTags = allTags[title];
  return (
    <div className="border-b-2 border-gray-800 py-1">
      <button
        onClick={() => setOpenList(!openList)}
        className="flex w-full items-center justify-between text-lg font-medium"
      >
        {title}
        <FaAngleDown className={openList ? 'rotate-180' : ''} />
      </button>
      {openList && (
        <div className="custom-scrollbar max-h-48 overflow-y-auto pl-5">
          {list.map((value) => (
            <CategoryTag
              key={value}
              category={title}
              value={value}
              tagChecked={!!categoryTags?.includes(value)}
              allTags={allTags}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
