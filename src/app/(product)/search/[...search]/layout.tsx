import SearchBox from "./components/search";
import FilterBar from "@/components/sidebars/filterBar/filterBar";

const SearchPage = async ({
  params,
  children,
}: {
  params: { search: string[] };
  children: React.ReactNode;
}) => {
  const searchArgs = params.search.map((item) => decodeURIComponent(item));

  return (
    <div className="flex pb-10 pt-36">
      <FilterBar params={searchArgs} />
      <div className="flex h-fit w-full flex-col gap-4 px-[3vw] pt-4 max-md:pl-3">
        <SearchBox searchText={searchArgs[2] !== "_" ? searchArgs[2] : ""} />
        {children}
      </div>
    </div>
  );
};

export default SearchPage;
