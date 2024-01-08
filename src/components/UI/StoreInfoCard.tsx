import { IoIosStar } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { CoffeeDataType, setActiveCoffeeShop } from "../../store/coffeeSlice";
import FeatureInfo from "./FeatureInfo";
import { useAppDispatch } from "../../hooks/hooks";

interface PropsType {
  coffeeShop: CoffeeDataType;
}

function StoreInfoCard({ coffeeShop }: PropsType) {
  const dispatch = useAppDispatch();

  function handleOnClickCoffeeShopCard() {
    dispatch(setActiveCoffeeShop(coffeeShop));
  }

  return (
    <div
      className="flex w-full flex-col gap-2 rounded-md bg-white p-2 transition-all  hover:cursor-pointer hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100"
      onClick={() => handleOnClickCoffeeShopCard()}
      onKeyDown={() => handleOnClickCoffeeShopCard()}
      role="button"
      tabIndex={0}
    >
      <div className="flex w-full items-center justify-start  gap-2">
        <h3 className="text-xl font-bold underline underline-offset-2">
          {coffeeShop.name}
        </h3>
        <p className="flex items-center justify-start gap-1 text-blue-500">
          4<IoIosStar />
        </p>
      </div>
      <div className="flex w-full flex-wrap gap-4">
        <p className="rounded-md bg-blue-300 px-2">Wifi</p>
        <p className="rounded-md bg-blue-300 px-2">無限時</p>
      </div>
      <div className="flex items-center justify-start gap-2">
        <IoLocation />
        <address>{coffeeShop.address}</address>
      </div>
      <div className="border-b border-gray-400" />
      <div className="flex flex-col gap-2 xl:grid xl:grid-cols-2 xl:gap-2">
        <FeatureInfo title="seat" stars={coffeeShop.seat} />
        <FeatureInfo title="wifi" stars={coffeeShop.wifi} />
        <FeatureInfo title="quiet" stars={coffeeShop.quiet} />
        <FeatureInfo title="tasty" stars={coffeeShop.tasty} />
        <FeatureInfo title="cheap" stars={coffeeShop.cheap} />
        <FeatureInfo title="music" stars={coffeeShop.music} />
      </div>
    </div>
  );
}

export default StoreInfoCard;
