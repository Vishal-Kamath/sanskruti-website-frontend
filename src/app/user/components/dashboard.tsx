"use client";

import { cn } from "@/utils/lib";
import { FC, HTMLAttributes, useState } from "react";
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
  const [open, setOpen] = useState(false);
  return (
    <Container
      containerTitle={dashboardTitle}
      className={cn("md:w-[15rem]", className)}
      toggler={() => setOpen((open) => !open)}
      openState={open}
      {...props}
    >
      <div className={cn("flex flex-col", !open && "max-md:hidden")}>
        {children}
      </div>
    </Container>
  );
};

export default DashboardContainer;
