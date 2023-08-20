import SkeletonComponent from "@/components/common/skeletonComponenet";
import { FC } from "react";

const CategoryLoadingPage: FC = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
      {Array(24)
        .fill(null)
        .map((_, index) => (
          <div
            key={"category skeleton " + index}
            className="flex flex-col gap-2"
          >
            <SkeletonComponent className="aspect-[2/2.5] h-full w-full rounded-md" />
            <SkeletonComponent className="h-10 w-full rounded-md" />
          </div>
        ))}
    </div>
  );
};

export default CategoryLoadingPage;
