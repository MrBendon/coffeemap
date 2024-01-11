import { useAppSelector } from "../../hooks/hooks";
import { CoffeeDataType } from "../../store/coffeeSlice";
import ShopInfoCard from "./ShopInfoCard";

interface PropsType {
  showCardList: CoffeeDataType[] | undefined;
  inViewPortDataAfterFilter: CoffeeDataType[] | undefined;
}

function InViewportCoffeeShopList({
  showCardList,
  inViewPortDataAfterFilter,
}: PropsType) {
  const { listMaxDisplayQuantity } = useAppSelector(
    (state) => state.pagecontrol,
  );
  const dataLength = inViewPortDataAfterFilter?.length || 0;
  return (
    <>
      <div className="w-full rounded-lg bg-gray-200 px-4 text-sm text-gray-800 dark:bg-gray-800 dark:text-white">
        該區域共有 &ensp;
        <em className="dark:text-primary text-lg font-bold text-black underline underline-offset-4">
          {dataLength}
        </em>{" "}
        &ensp; 筆店家資料
        {dataLength >= 20 && <> ，列表僅顯示前{listMaxDisplayQuantity}筆</>}
      </div>
      {showCardList?.map((coffeeShop) => (
        <ShopInfoCard coffeeShop={coffeeShop} key={coffeeShop.id} />
      ))}
    </>
  );
}

export default InViewportCoffeeShopList;
