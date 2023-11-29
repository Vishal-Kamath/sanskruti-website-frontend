import { FC } from "react";
import { FaSpinner } from "react-icons/fa";

import "./css/map.css";
import { cn } from "@/utils/lib";
import { IconBaseProps } from "react-icons/lib";

const LoadingSpinner: FC<IconBaseProps> = ({ className, ...props }) => {
  return (
    <FaSpinner
      className={cn("spinner h-10 w-10 text-slate-500", className)}
      {...props}
    />
  );
};

export default LoadingSpinner;
