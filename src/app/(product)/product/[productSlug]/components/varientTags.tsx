import { FC, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UIButton from "@/components/common/button";
import { cn } from "@/utils/lib";

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
