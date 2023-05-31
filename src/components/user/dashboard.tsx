import { cn } from "@/utils/lib";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
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
        "flex h-fit w-full flex-col overflow-hidden rounded-md border-2 border-gray-300 md:max-w-[20rem]",
        className
      )}
      {...props}
    >
      <h3 className="border-b-2 border-gray-300 bg-gray-200 p-3 text-lg font-medium">
        {dashboardTitle}
      </h3>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default DashboardContainer;

interface ElementProps extends HTMLAttributes<HTMLAnchorElement> {
  path?: string;
}
export const DashboardElement: FC<ElementProps> = ({
  children,
  className,
  path,
  ...props
}) => {
  const router = useRouter();
  const isActive = router.pathname === path;
  console.log(path, router.pathname, isActive);
  return (
    <Link
      href={path || "#"}
      className={clsx(
        "px-3 py-2 text-left outline-none",
        isActive
          ? "bg-stone-100 font-medium hover:bg-stone-200"
          : "bg-white hover:bg-stone-100",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
