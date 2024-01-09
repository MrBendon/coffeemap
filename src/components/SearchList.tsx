import { useMemo } from "react";
import { useAppSelector } from "../hooks/hooks";
import ShopInfoCard from "./UI/ShopInfoCard";
import { useGetAllCoffeeQuery } from "../store/apis/apiSlice";
import { CoffeeDataType } from "../store/coffeeSlice";
import Filters from "./Filters";

function InitBlock() {
  return (
    <div className="flex h-full w-full items-center justify-center text-center font-medium text-gray-400">
      <em>
        可點選畫面上方中間的搜尋欄，搜尋您感興趣的咖啡廳，或者點擊地圖進行探索。
      </em>
    </div>
  );
}

function SearchEmpty() {
  return (
    <div className="flex h-full w-full items-center justify-center text-center font-medium text-gray-400">
      <em>
        查無結果
        <br />
        可以再試試看其他關鍵字
      </em>
    </div>
  );
}

function SearchList() {
  const { data: allCoffeeData } = useGetAllCoffeeQuery();
  const searchKey = useAppSelector((state) => state.coffee.searchKey);
  const isSearchMode = useAppSelector((state) => state.coffee.isSearchMode);
  console.log("isSearchMode:", isSearchMode);
  const filters = useAppSelector((state) => state.coffee.activeFilters);
  console.log(filters);

  let searchResults: CoffeeDataType[] | undefined;
  if (searchKey) {
    searchResults = allCoffeeData?.filter(
      (coffee) =>
        coffee.name?.includes(searchKey) || coffee.address?.includes(searchKey),
    );
  }

  if (filters.length > 0) {
    console.log("here need filter function");
  }

  const memoResults = useMemo(() => searchResults, [searchResults]);
  console.log(memoResults);
  const hasData =
    isSearchMode === true &&
    memoResults !== undefined &&
    memoResults.length > 0;
  const searchEmpty = isSearchMode === true && memoResults?.length === 0;
  const isInit = isSearchMode === "init";

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-2">
      <Filters />
      {isInit && <InitBlock />}
      {hasData &&
        memoResults?.map((coffeeShop) => (
          <ShopInfoCard coffeeShop={coffeeShop} key={coffeeShop.id} />
        ))}
      {searchEmpty && <SearchEmpty />}
      {!isSearchMode && "顯示地圖附近的咖啡廳"}
    </div>
  );
}

export default SearchList;
