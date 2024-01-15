import { WheelEvent, memo, useMemo, useRef } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useGetCoffeeData,
} from "../hooks/hooks";
import { CoffeeDataType } from "../store/coffeeSlice";
import Filters from "./Filters";
import filterData from "../helper/filterData";
import InitSearchListBlock from "./UI/InitSearchListBlock";
import SearchNoResult from "./UI/SearchNoResult";
import SearchResultLength from "./UI/SearchResultLength";
import InViewportCoffeeShopList from "./UI/InViewportCoffeeShopList";
import ShopInfoCard from "./UI/ShopInfoCard";
import { changedDisplayQuantityPages } from "../store/pagecontrolSlice";

const SearchList = memo(() => {
  // const { data: allCoffeeData } = useGetAllCoffeeQuery();
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement>(null);
  const {
    searchKey,
    inViewportCoffeeShopData,
    isSearchMode,
    activeFilters: filters,
  } = useAppSelector((state) => state.coffee);
  const {
    isOpenFiltersBlock: isOpenFilters,
    listMaxDisplayQuantity,
    displayQuantityPages,
  } = useAppSelector((state) => state.pagecontrol);
  // 字串搜索模式
  const { coffeeData: allCoffeeData } = useGetCoffeeData();
  let showResults: CoffeeDataType[] | undefined;

  const memoResults = useMemo(() => {
    let searchResults: CoffeeDataType[] | undefined;
    if (searchKey) {
      searchResults = allCoffeeData?.filter(
        (coffee) =>
          coffee.name?.includes(searchKey) ||
          coffee.address?.includes(searchKey),
      );
    }

    if (filters.length > 0 && searchResults) {
      searchResults = filterData(searchResults, filters);
    }
    return searchResults;
  }, [allCoffeeData, searchKey, filters]);

  if (memoResults && memoResults.length > listMaxDisplayQuantity) {
    showResults = memoResults?.slice(
      0,
      listMaxDisplayQuantity * displayQuantityPages,
    );
  } else {
    showResults = memoResults;
  }

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
      ? inViewPortDataAfterFilter?.slice(
          0,
          listMaxDisplayQuantity * displayQuantityPages,
        )
      : inViewPortDataAfterFilter;

  function handleScroll(e: WheelEvent<HTMLDivElement>) {
    const divRect = e.currentTarget.getBoundingClientRect();
    const divHeight = e.currentTarget.getBoundingClientRect().height;
    const scrollPositionInDiv = Math.abs(divRect.top);
    if (divHeight - scrollPositionInDiv <= 800) {
      dispatch(changedDisplayQuantityPages(displayQuantityPages + 1));
    }
  }

  if (displayQuantityPages === 1 && listRef.current) {
    const target = listRef.current;
    target.scrollTo(0, 0);
  }

  return (
    <div className="my-scrollbar dark:my-scrollbar--dark flex h-full w-full flex-col justify-start gap-4 overflow-y-auto p-2">
      <div
        className={`flex flex-col gap-4 transition-all ${
          isOpenFilters
            ? "translate-y-0"
            : "-translate-y-[7.5rem] md:-translate-y-[9rem]"
        }`}
        onWheel={handleScroll}
        ref={listRef}
      >
        <Filters />
        {isInit && <InitSearchListBlock />}
        {/* 字串搜索模式 */}
        {hasData && <SearchResultLength searchResults={memoResults} />}
        {hasData &&
          showResults?.map((coffeeShop) => (
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
