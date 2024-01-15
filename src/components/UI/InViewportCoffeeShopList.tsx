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
      <div className="w-full rounded-lg bg-gray-200 px-4 text-justify text-sm text-gray-800 dark:bg-gray-800 dark:text-white">
        該區域共有 &ensp;
        <em className="text-lg font-bold text-black underline underline-offset-4 dark:text-primary">
          {dataLength}
        </em>{" "}
        &ensp; 筆店家資料
        {dataLength >= listMaxDisplayQuantity && (
          <>
            {" "}
            ，列表僅預先顯示前{listMaxDisplayQuantity}
            筆，可透過縮小地圖或開啟篩選器來取得您感興趣的店家，或往下滑查看更多店家。
          </>
        )}
      </div>
      {showCardList?.map((coffeeShop) => (
        <ShopInfoCard coffeeShop={coffeeShop} key={coffeeShop.id} />
      ))}
    </>
  );
}

export default InViewportCoffeeShopList;
