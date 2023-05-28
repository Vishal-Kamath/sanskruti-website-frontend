import { cn } from "@/utils/lib";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  dashboardTitle: string;
}
const DashboardContainer: FC<Props> = ({
  dashboardTitle,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-md border-2 border-gray-300 md:max-w-[20rem]",
        className
      )}
      {...props}
    >
      <h3 className="border-b-2 border-gray-300 bg-gray-100 p-3 text-lg font-medium">
        {dashboardTitle}
      </h3>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default DashboardContainer;

interface ElementProps extends HTMLAttributes<HTMLButtonElement> {}
export const DashboardElement: FC<ElementProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "bg-white px-3 py-2 text-left outline-none hover:bg-sky-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
