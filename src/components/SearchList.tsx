import { useMemo } from "react";
import { useAppSelector } from "../hooks/hooks";
import ShopInfoCard from "./UI/ShopInfoCard";
import { useGetAllCoffeeQuery } from "../store/apis/apiSlice";
import { CoffeeDataType } from "../store/coffeeSlice";
import Filters from "./Filters";
import filterData from "../helper/filterData";
import InitSearchListBlock from "./UI/InitSearchListBlock";
import SearchNoResult from "./UI/SearchNoResult";
import SearchResultLength from "./UI/SearchResultLength";

function SearchList() {
  const { data: allCoffeeData } = useGetAllCoffeeQuery();
  const searchKey = useAppSelector((state) => state.coffee.searchKey);
  const isOpenFilters = useAppSelector(
    (state) => state.pagecontrol.isOpenFiltersBlock,
  );
  const isSearchMode = useAppSelector((state) => state.coffee.isSearchMode);
  console.log("isSearchMode:", isSearchMode);
  const filters = useAppSelector((state) => state.coffee.activeFilters);

  let searchResults: CoffeeDataType[] | undefined;
  if (searchKey) {
    searchResults = allCoffeeData?.filter(
      (coffee) =>
        coffee.name?.includes(searchKey) || coffee.address?.includes(searchKey),
    );
  }

  if (filters.length > 0 && searchResults) {
    searchResults = filterData(searchResults, filters);
  }

  const memoResults = useMemo(() => searchResults, [searchResults]);
  const hasData =
    isSearchMode === true &&
    memoResults !== undefined &&
    memoResults.length > 0;
  const searchEmpty = isSearchMode === true && memoResults?.length === 0;
  const isInit = isSearchMode === "init";

  return (
    <div className="flex h-full w-full flex-col justify-start gap-4 overflow-y-auto p-2 ">
      <div
        className={`flex flex-col gap-4 transition-all ${
          isOpenFilters ? "translate-y-0" : "-translate-y-[9rem]"
        }`}
      >
        <Filters />
        {isInit && <InitSearchListBlock />}
        {hasData && <SearchResultLength searchResults={memoResults} />}
        {hasData &&
          memoResults?.map((coffeeShop) => (
            <ShopInfoCard coffeeShop={coffeeShop} key={coffeeShop.id} />
          ))}

        {searchEmpty && <SearchNoResult />}
        {!isSearchMode && "顯示地圖附近的咖啡廳"}
      </div>
    </div>
  );
}

export default SearchList;
