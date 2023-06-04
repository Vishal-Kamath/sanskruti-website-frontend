"use client";

import { cn } from "@/utils/lib";
import { FC, HTMLAttributes } from "react";
import Container from "./container";

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
    <Container
      containerTitle={dashboardTitle}
      className={cn("md:w-[20rem]", className)}
      {...props}
    >
      <div className="flex flex-col">{children}</div>
    </Container>
  );
};

export default DashboardContainer;
