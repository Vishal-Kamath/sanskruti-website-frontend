import { cn } from "@/utils/lib";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  containerTitle: string;
}
const Container: FC<Props> = ({
  className,
  containerTitle,
  children,
  ...props
}) => {
  return (
    <div
      className={cn("w-full h-fit flex flex-col gap-3", className)}
      {...props}
    >
      <h3 className="border-b-2 border-slate-400 rounded-md bg-slate-100 py-2 px-5 text-lg font-medium">
        {containerTitle}
      </h3>
      {children}
    </div>
  );
};

export default Container;
