import React from 'react';
import DBlist from '@/db.json';
import Category from './category';
import { useAppSelector } from '@/store/hooks';
import { selectAllTags } from '@/slice/search.slice';

const CategoryList: React.FC = () => {
  const categories = DBlist.categories;
  const allTags = useAppSelector(selectAllTags);
  return (
    <div className="max-h-[85vh] w-full overflow-y-auto pb-10 pr-1 scrollbar-none">
      <Category title="Gender" list={categories['Gender']} allTags={allTags} />
      <Category
        title="Base Color"
        list={categories['Base Color']}
        allTags={allTags}
      />
      <Category title="Season" list={categories['Season']} allTags={allTags} />
      <Category
        title="Master Category"
        list={categories['Master Category']}
        allTags={allTags}
      />
      <Category
        title="Sub Category"
        list={categories['Sub Category']}
        allTags={allTags}
      />
      <Category
        title="Article Type"
        list={categories['Article Type']}
        allTags={allTags}
      />
      <Category title="Usage" list={categories['Usage']} allTags={allTags} />
    </div>
  );
};

export default CategoryList;
