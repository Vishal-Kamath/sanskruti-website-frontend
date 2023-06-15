import { Metadata } from "next";
import { FC, ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { categoryName: string };
}): Promise<Metadata> {
  return {
    title: `Sanskruti Nx - ${decodeURIComponent(params.categoryName)}`,
  };
}

interface Props {
  children?: ReactNode;
}
const CategoryLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default CategoryLayout;
