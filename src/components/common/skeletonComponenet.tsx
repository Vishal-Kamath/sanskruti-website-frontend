"use client";

import React, { HtmlHTMLAttributes } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props extends HtmlHTMLAttributes<typeof Skeleton> {}

const SkeletonComponent: React.FC<Props> = (props) => {
  return <Skeleton {...props} baseColor="#efefef" highlightColor="#f6f6f6" />;
};

export default SkeletonComponent;
