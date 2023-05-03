import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RxCross2 } from 'react-icons/rx';

const VariantTags: React.FC<{
  main: string;
  sub: { title: string }[];
}> = ({ main, sub }) => {
  const [selected, setSelected] = useState('');
  const router = useRouter();

  const onClick = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        [main]: value,
      },
    });
    setSelected(value);
  };

  const deSelect = () => {
    const radio = document.getElementById(selected) as HTMLInputElement;
    radio.checked = false;

    const tags = router.query;
    delete tags[main];

    router.push({
      pathname: router.pathname,
      query: tags,
    });
    setSelected('');
  };

  useEffect(() => {
    const selectedTagFromQuery = router.query[main];
    console.log(router.query);
    console.log(main);
    console.log(router.query[main]);
    if (!selectedTagFromQuery) return;
    if (Array.isArray(selectedTagFromQuery)) return;
    setSelected(selectedTagFromQuery);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 py-2 pr-4 font-bold">
        <h5 className="flex items-center border-b-2 border-gray-300">
          <span>{main}</span>
        </h5>
        <h5
          className={`${
            !selected && 'hidden'
          } flex w-fit items-center justify-between gap-3 rounded-md bg-green-200 px-2 py-1 font-semibold`}
        >
          {selected}
          <RxCross2 className="text-lg" onClick={deSelect} />
        </h5>
      </div>
      <div className="custom_scrollbar flex max-h-[10rem] flex-wrap gap-3 overflow-y-auto overflow-x-hidden px-2 py-1">
        {sub.map((subItem) => (
          <div
            key={subItem.title}
            className="relative isolate grid min-w-[3rem] place-content-center rounded-full border-2 border-black px-3 py-1 hover:outline hover:outline-4 hover:outline-gray-300"
          >
            <input
              type="radio"
              name={main}
              checked={selected === subItem.title}
              id={subItem.title}
              className="absolute left-0 top-0 z-10 h-full w-full opacity-0"
              onChange={() => onClick(subItem.title)}
            />
            {subItem.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantTags;
