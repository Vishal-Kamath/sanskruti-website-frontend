"use client";

import { cn } from "@/utils/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const FilterItem: FC<{
  main: string;
  sub: { title: string }[];
  classname?: string;
}> = ({ main, sub, classname }) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const onClick = (value: string) => {
    // router.push({
    //   pathname: pathname,
    //   query: {
    //     ...query,
    //     [main]: value,
    //   },
    // });
    // setSelected(value);
  };

  const deSelect = () => {
    const radio = document.getElementById(selected) as HTMLInputElement;
    radio.checked = false;

    // const tags = router.query;
    // delete tags[main];

    // router.push({
    //   pathname: router.pathname,
    //   query: tags,
    // });
    setSelected("");
  };

  useEffect(() => {
    const selectedTagFromQuery = decodeURIComponent(
      query.get(encodeURIComponent(main)) || ""
    );
    if (!selectedTagFromQuery) return;
    setSelected(selectedTagFromQuery);
  }, []);

  return (
    <div className="flex flex-col">
      <div className={cn("flex flex-col gap-1 py-2 font-bold", classname)}>
        <h5 className="flex items-center justify-between">
          <span>{main}</span>
          <span className="text-xl">
            {open ? (
              <AiOutlineMinus onClick={() => setOpen(false)} />
            ) : (
              <AiOutlinePlus onClick={() => setOpen(true)} />
            )}
          </span>
        </h5>
        <h5
          className={cn(
            "flex w-fit items-center justify-between gap-3 rounded-md bg-green-200 px-2 py-1 font-semibold",
            !selected && "hidden"
          )}
        >
          {selected}
          <RxCross2 className="text-lg" onClick={deSelect} />
        </h5>
      </div>
      <div
        className={cn(
          "scrollbar-thin scrollbar-track-gray-400 flex max-h-[15rem] flex-col gap-1 overflow-x-hidden overflow-y-auto bg-gray-50 py-1 pr-4",
          classname,
          !open && "hidden"
        )}
      >
        {sub.map((subItem) => (
          <span key={subItem.title} className="flex items-center gap-2">
            <input
              type="radio"
              name={main}
              checked={selected === subItem.title}
              id={subItem.title}
              className="h-4 w-4 accent-black"
              onChange={() => onClick(subItem.title)}
            />
            {subItem.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterItem;
