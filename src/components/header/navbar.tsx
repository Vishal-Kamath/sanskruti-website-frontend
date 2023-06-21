import { FC, useState } from "react";
import { FilterType, filters } from "@/data/filterlist";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/lib";
import { FaAngleDown } from "react-icons/fa";
import UIButton from "../common/button";

const Navbar: FC = () => {
  const [displayFilter, setDisplayFilter] = useState(filters[0]);
  const pathname = usePathname();
  const block = pathname.includes("/auth") || pathname.includes("/user");
  return (
    <div
      className={cn(
        "relative flex justify-center bg-white px-[3vw] max-md:hidden",
        block && "hidden"
      )}
    >
      <div className="group w-fit max-md:hidden">
        <nav className="flex h-6 w-fit items-center justify-evenly gap-4 lg:gap-6">
          {filters.map((filter) => (
            <div
              key={filter.main}
              className={cn(
                "flex items-center gap-[2px] text-xs text-gray-600 lg:text-sm",
                "border-b-[1px] border-transparent hover:border-black hover:font-medium hover:text-black"
              )}
              onMouseEnter={() => setDisplayFilter(filter)}
            >
              {filter.main} <FaAngleDown />
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
                    href={`/category/${displayFilter.main}/?${
                      displayFilter.main
                    }=${encodeURIComponent(item.title)}`}
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

export const NavbarDrawer: FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  const [displayFilter, setDisplayFilter] = useState<FilterType>();
  return (
    <div
      className={cn(
        "fixed left-0 top-0 -z-30 max-h-screen min-h-screen w-full overflow-auto bg-white px-[3vw] pt-32 scrollbar-none",
        !sidebarOpen && "hidden"
      )}
    >
      {!displayFilter ? (
        <div className="grid grid-cols-2 gap-2">
          {filters.map((filter) => (
            <button
              key={filter.main + " nav"}
              onClick={() => setDisplayFilter(filter)}
              className="relative h-32"
            >
              <Image
                src={filter.image}
                alt={filter.main + " nav image"}
                className="h-full w-full object-cover object-top"
                height={100}
                width={100}
              />
              <div className="absolute bottom-0 flex h-8 w-full items-center justify-center gap-1 bg-white bg-opacity-75">
                {filter.main} <FaAngleDown />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <UIButton
              onClick={() => setDisplayFilter(undefined)}
              className="px-4"
            >
              Back
            </UIButton>
            <span className="text-lg font-bold">{displayFilter.main}</span>
          </div>
          <Image
            src={displayFilter.image}
            alt={displayFilter.main + " image"}
            width={100}
            height={100}
            className="h-40 w-full object-cover object-top"
          />
          <div className="flex flex-col gap-1 pb-20">
            {displayFilter.sub.map((item, index) => (
              <Link
                key={item.title + index + displayFilter.main + " sidebar"}
                href={`/category/${displayFilter.main}/?${
                  displayFilter.main
                }=${encodeURIComponent(item.title)}`}
                className="text-lg"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
