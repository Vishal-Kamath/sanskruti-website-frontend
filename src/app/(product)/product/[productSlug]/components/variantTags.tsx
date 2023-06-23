import { FC, useEffect, SetStateAction, Dispatch } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UIButton from "@/components/common/button";
import { cn } from "@/utils/lib";

const VariantTags: FC<{
  main: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  sub: { title: string }[];
}> = ({ main, sub, selected, setSelected }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onClick = (value: string) => {
    if (selected === value) deSelectVariant();
    else selectVariant(value);
  };

  const selectVariant = (value: string) => {
    const current = new URLSearchParams(searchParams.toString());
    current.set(main, value);
    const query = !!current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}/${query}`);
    setSelected(value);
  };
  const deSelectVariant = () => {
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
    <div className="flex flex-col gap-3 border-t-2 border-gray-300 py-3">
      <h5 className="flex items-center font-bold">
        <span>{main}</span>
      </h5>
      <div className="custom_scrollbar flex max-h-[10rem] flex-wrap gap-3 overflow-y-auto overflow-x-hidden px-1 py-1">
        {sub.map((subItem) => (
          <UIButton
            key={subItem.title}
            className={cn(
              "relative isolate min-w-[3rem] rounded-full border-gray-700 px-3 py-2 text-[14px]",
              selected === subItem.title && "bg-gray-700 text-white"
            )}
          >
            <input
              type="radio"
              name={main}
              checked={selected === subItem.title}
              id={subItem.title}
              className="absolute left-0 top-0 z-10 h-full w-full opacity-0"
              onClick={() => onClick(subItem.title)}
              onChange={() => {}}
            />
            {subItem.title}
          </UIButton>
        ))}
      </div>
    </div>
  );
};

export default VariantTags;
