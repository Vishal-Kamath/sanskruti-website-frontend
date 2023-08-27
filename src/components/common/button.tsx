import { cn } from "@/utils/lib";
import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}
const UIButton: FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-md border-[1px] border-gray-500 py-2 hover:outline hover:outline-4 hover:outline-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default UIButton;
