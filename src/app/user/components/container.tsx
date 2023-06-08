import { cn } from "@/utils/lib";
import { FC, HTMLAttributes } from "react";
import { FaAngleDown } from "react-icons/fa";

interface Props extends HTMLAttributes<HTMLDivElement> {
  containerTitle: string;
  toggler?: VoidFunction;
  openState?: boolean;
}
const Container: FC<Props> = ({
  className,
  containerTitle,
  children,
  toggler,
  openState,
  ...props
}) => {
  return (
    <div
      className={cn("flex h-fit w-full flex-col gap-3", className)}
      {...props}
    >
      <h3 className="flex items-center justify-between rounded-md border-b-2 border-slate-400 bg-slate-100 px-5 py-2 text-lg font-medium">
        {containerTitle}
        {toggler && (
          <button onClick={toggler} className="outline-none md:hidden">
            <FaAngleDown
              className={cn(
                "h-6 w-6 text-gray-500 transition-all delay-100",
                !openState && "rotate-180"
              )}
            />
          </button>
        )}
      </h3>
      {children}
    </div>
  );
};

export default Container;
