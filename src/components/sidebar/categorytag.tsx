import { Tags } from '@/model/item.model';
import { setTags } from '@/slice/search.slice';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const CategoryTag: React.FC<{
  value: string;
  category:
    | 'Gender'
    | 'Master Category'
    | 'Sub Category'
    | 'Article Type'
    | 'Base Color'
    | 'Season'
    | 'Usage';
  tagChecked: boolean;
  allTags: Tags;
}> = ({ value, category, tagChecked, allTags }) => {
  const router = useRouter();
  const [checked, setChecked] = useState(tagChecked);
  const dispatch = useAppDispatch();

  const _checked = () => {
    setChecked(!checked);
    value = value.replace(' ', '-');

    let tags = allTags[category]?.split(' ');
    tags ||= [];
    console.log(JSON.stringify(allTags));
    console.log(
      JSON.stringify({
        ...allTags,
        [category]: [...tags, value].join(' '),
      })
    );
    if (!checked) {
      const finalQuery = [...tags, value].join(' ');
      dispatch(
        setTags({
          ...allTags,
          [category]: finalQuery,
        })
      );
      router.replace({
        pathname: router.pathname,
        query: {
          ...allTags,
          [category]: finalQuery,
        },
      });
    } else {
      const finalQuery = tags
        .filter((queryVal) => queryVal !== value)
        .join(' ');
      const finalQueryLength =
        tags.filter((queryVal) => queryVal !== value).join(' ').length === 0;
      dispatch(
        setTags({
          ...allTags,
          [category]: finalQuery,
        })
      );
      router.replace({
        pathname: router.pathname,
        query: {
          ...allTags,
          [category]: finalQuery,
        },
      });
    }
  };

  return (
    <button onClick={_checked} className="flex w-full items-center gap-3">
      <input
        type="checkbox"
        name={value}
        id={value}
        checked={checked}
        className="h-4 w-4 accent-blue-500"
      />
      {value}
    </button>
  );
};

export default CategoryTag;
