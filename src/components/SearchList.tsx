import { useGetAllCoffeeQuery } from "../store/apis/apiSlice";
import StoreInfoCard from "./UI/StoreInfoCard";

function SearchList() {
  const { data: coffeeData } = useGetAllCoffeeQuery();
  const testdata = coffeeData?.slice(0, 10);
  console.log(testdata);

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-2">
      {testdata?.map((coffeeShop) => (
        <StoreInfoCard coffeeShop={coffeeShop} key={coffeeShop.id} />
      ))}
    </div>
  );
}

export default SearchList;
