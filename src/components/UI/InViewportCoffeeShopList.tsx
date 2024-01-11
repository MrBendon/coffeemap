import { useAppSelector } from "../../hooks/hooks";
import { CoffeeDataType } from "../../store/coffeeSlice";
import ShopInfoCard from "./ShopInfoCard";

interface PropsType {
  inViewportDataList: CoffeeDataType[] | undefined;
  inViewportCoffeeShopData: CoffeeDataType[] | undefined;
}

function InViewportCoffeeShopList({
  inViewportDataList,
  inViewportCoffeeShopData,
}: PropsType) {
  const { listMaxDisplayQuantity } = useAppSelector(
    (state) => state.pagecontrol,
  );
  return (
    <>
      <div className="w-full rounded-lg bg-gray-200 px-4 text-sm text-gray-800 dark:bg-gray-800 dark:text-white">
        該區域共有 &ensp;
        <em className="dark:text-primary text-lg font-bold text-black underline underline-offset-4">
          {inViewportCoffeeShopData?.length}
        </em>{" "}
        &ensp; 筆店家資料，列表僅顯示前{listMaxDisplayQuantity}筆
      </div>
      {inViewportDataList?.map((coffeeShop) => (
        <ShopInfoCard coffeeShop={coffeeShop} key={coffeeShop.id} />
      ))}
    </>
  );
}

export default InViewportCoffeeShopList;
