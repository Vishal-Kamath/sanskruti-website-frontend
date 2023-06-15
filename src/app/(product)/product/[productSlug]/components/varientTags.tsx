import { FC, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import UIButton from "@/components/common/button";

const VariantTags: FC<{
  main: string;
  sub: { title: string }[];
}> = ({ main, sub }) => {
  const [selected, setSelected] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onClick = (value: string) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set(main, value);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
    setSelected(value);
  };

  const deSelect = () => {
    const radio = document.getElementById(selected) as HTMLInputElement;
    radio.checked = false;
    setSelected("");

    const current = new URLSearchParams(searchParams.toString());
    current.delete(main);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
  };

  useEffect(() => {
    const selectedTagFromQuery = decodeURIComponent(
      searchParams.get(main) || ""
    );
    if (!selectedTagFromQuery) return;
    setSelected(selectedTagFromQuery);
  }, [searchParams, main]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1 py-2 font-bold">
        <h5 className="flex items-center border-b-2 border-gray-300">
          <span>{main}</span>
        </h5>
        <h5
          className={`${
            !selected && "hidden"
          } flex w-fit items-center justify-between gap-3 rounded-md bg-green-200 px-2 py-1 font-semibold`}
        >
          {selected}
          <RxCross2 className="text-lg" onClick={deSelect} />
        </h5>
      </div>
      <div className="custom_scrollbar flex max-h-[10rem] flex-wrap gap-3 overflow-y-auto overflow-x-hidden px-1 py-1">
        {sub.map((subItem) => (
          <UIButton
            key={subItem.title}
            className="relative isolate min-w-[3rem] rounded-full border-black px-3 py-1"
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
          </UIButton>
        ))}
      </div>
    </div>
  );
};

export default VariantTags;
