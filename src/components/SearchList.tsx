import { memo, useMemo } from "react";
import { useAppSelector, useGetCoffeeData } from "../hooks/hooks";
import ShopInfoCard from "./UI/ShopInfoCard";
import { CoffeeDataType } from "../store/coffeeSlice";
import Filters from "./Filters";
import filterData from "../helper/filterData";
import InitSearchListBlock from "./UI/InitSearchListBlock";
import SearchNoResult from "./UI/SearchNoResult";
import SearchResultLength from "./UI/SearchResultLength";
import InViewportCoffeeShopList from "./UI/InViewportCoffeeShopList";

const SearchList = memo(() => {
  // const { data: allCoffeeData } = useGetAllCoffeeQuery();
  const { coffeeData: allCoffeeData } = useGetCoffeeData();

  const {
    searchKey,
    inViewportCoffeeShopData,
    isSearchMode,
    activeFilters: filters,
  } = useAppSelector((state) => state.coffee);
  const { isOpenFiltersBlock: isOpenFilters, listMaxDisplayQuantity } =
    useAppSelector((state) => state.pagecontrol);
  // 字串搜索模式
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

  // 地圖搜索模式
  let inViewPortDataAfterFilter: CoffeeDataType[] | undefined =
    inViewportCoffeeShopData;

  if (filters.length > 0 && inViewPortDataAfterFilter) {
    inViewPortDataAfterFilter = filterData(inViewPortDataAfterFilter, filters);
  }

  const showCardList =
    inViewPortDataAfterFilter &&
    inViewPortDataAfterFilter.length > listMaxDisplayQuantity
      ? inViewPortDataAfterFilter?.slice(0, listMaxDisplayQuantity)
      : inViewPortDataAfterFilter;

  return (
    <div className="my-scrollbar dark:my-scrollbar--dark flex h-full w-full flex-col justify-start gap-4 overflow-y-auto p-2">
      <div
        className={`flex flex-col gap-4 transition-all ${
          isOpenFilters
            ? "translate-y-0"
            : "-translate-y-[7.5rem] md:-translate-y-[9rem]"
        }`}
      >
        <Filters />
        {isInit && <InitSearchListBlock />}
        {/* 字串搜索模式 */}
        {hasData && <SearchResultLength searchResults={memoResults} />}
        {hasData &&
          memoResults?.map((coffeeShop) => (
            <ShopInfoCard coffeeShop={coffeeShop} key={coffeeShop.id} />
          ))}

        {searchEmpty && <SearchNoResult />}
        {/* 地圖搜索模式 */}
        {!isSearchMode && (
          <InViewportCoffeeShopList
            showCardList={showCardList}
            inViewPortDataAfterFilter={inViewPortDataAfterFilter}
          />
        )}
      </div>
    </div>
  );
});

export default SearchList;
