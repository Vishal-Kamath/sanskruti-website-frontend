import FilterBar from "@/components/sidebars/filterBar/filterBar";
import Description from "./components/description";

const CategoryLayout = async ({
  params,
  children,
}: {
  params: { categories: string[] };
  children: React.ReactNode;
}) => {
  const categoriesParams = params.categories.map((item) =>
    decodeURIComponent(item)
  );
  const route = ["Home", ...categoriesParams];

  return (
    <div className="flex flex-col pb-5">
      <div className="mb-10 flex pt-36">
        <FilterBar params={categoriesParams} />
        <div className="flex w-full flex-col gap-3 px-[3vw] pb-10 pt-5 text-justify sm:pl-4">
          {/* Descriptiom */}
          <Description route={route} />

          {children}
        </div>
      </div>
    </div>
  );
};

export default CategoryLayout;
