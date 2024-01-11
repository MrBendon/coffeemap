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
import InViewportCoffeeShopList from "./UI/InViewportCoffeeShopList";

function SearchList() {
  console.log("list-re-render");
  const { data: allCoffeeData } = useGetAllCoffeeQuery();
  const {
    searchKey,
    inViewportCoffeeShopData,
    isSearchMode,
    activeFilters: filters,
  } = useAppSelector((state) => state.coffee);
  const { isOpenFiltersBlock: isOpenFilters, listMaxDisplayQuantity } =
    useAppSelector((state) => state.pagecontrol);

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
  const inViewportDataList =
    inViewportCoffeeShopData &&
    inViewportCoffeeShopData.length > listMaxDisplayQuantity
      ? inViewportCoffeeShopData?.slice(0, listMaxDisplayQuantity)
      : inViewportCoffeeShopData;
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
        {!isSearchMode && (
          <InViewportCoffeeShopList
            inViewportDataList={inViewportDataList}
            inViewportCoffeeShopData={inViewportCoffeeShopData}
          />
        )}
      </div>
    </div>
  );
}

export default SearchList;
