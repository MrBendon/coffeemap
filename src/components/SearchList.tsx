import { useMemo } from "react";
import { useAppSelector } from "../hooks/hooks";
import StoreInfoCard from "./UI/StoreInfoCard";
import { useGetAllCoffeeQuery } from "../store/apis/apiSlice";
import { CoffeeDataType } from "../store/coffeeSlice";

function EmptyResult() {
  return (
    <div className="flex h-full w-full items-center justify-center text-center font-medium text-gray-400">
      <em>
        可點選畫面上方中間的搜尋欄
        <br />
        ，搜尋您感興趣的咖啡廳
      </em>
    </div>
  );
}

function SearchList() {
  const { data: allCoffeeData } = useGetAllCoffeeQuery();
  const searchKey = useAppSelector((state) => state.coffee.searchKey);
  console.log(searchKey);

  // const searchResults = useAppSelector(
  //   (state) => state.coffee.searchCoffeeShopResult,
  // );
  let searchResults: CoffeeDataType[] | undefined;
  if (searchKey) {
    searchResults = allCoffeeData?.filter(
      (coffee) =>
        coffee.name?.includes(searchKey) || coffee.address?.includes(searchKey),
    );
  }

  const memoResults = useMemo(() => searchResults, [searchResults]);
  const hasData = memoResults !== undefined && memoResults.length > 0;

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-2">
      {hasData ? (
        memoResults?.map((coffeeShop) => (
          <StoreInfoCard coffeeShop={coffeeShop} key={coffeeShop.id} />
        ))
      ) : (
        <EmptyResult />
      )}
    </div>
  );
}

export default SearchList;
