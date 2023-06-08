import { FC, useState } from "react";
import { filters } from "@/data/filterlist";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/lib";

const Navbar: FC = () => {
  const [displayFilter, setDisplayFilter] = useState(filters[0]);
  const pathname = usePathname();
  const block = pathname.includes("/auth") || pathname.includes("/user");
  return (
    <div
      className={cn(
        "relative flex justify-center bg-white px-[5vw] max-md:hidden",
        block && "hidden"
      )}
    >
      <div className="group w-fit max-md:hidden">
        <nav className="flex h-6 w-fit items-center justify-center gap-5 lg:gap-6">
          {filters.map((filter) => (
            <div
              key={filter.main}
              className={cn(
                "text-xs text-gray-600 lg:text-sm",
                filter.main === displayFilter.main &&
                  "font-medium text-black underline underline-offset-4"
              )}
              onMouseEnter={() => setDisplayFilter(filter)}
            >
              {filter.main.toLocaleUpperCase()}
            </div>
          ))}
        </nav>
        <div className="absolute left-1/2 top-6 hidden h-[25rem] w-[60rem] -translate-x-1/2 border-x-2 border-b-2 border-gray-300 bg-white group-hover:block">
          <div className="flex h-full w-full gap-3 overflow-hidden p-5">
            <div className="flex w-full flex-col gap-3">
              <h3 className="text-lg font-semibold">
                {displayFilter.main.toLocaleUpperCase()}
              </h3>
              <div className="flex h-[15rem] w-full flex-col flex-wrap gap-2 text-sm">
                {displayFilter.sub.map((item, index) => (
                  <Link
                    key={item.title + index + displayFilter.main}
                    href={`/category/${displayFilter.main}/?${displayFilter.main}=${item.title}`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="aspect-[2/3] h-full shrink-0 overflow-hidden">
              <Image
                src={displayFilter.image}
                alt={displayFilter.main}
                width={300}
                height={300}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
