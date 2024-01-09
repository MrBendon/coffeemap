import { IoLocation } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { CoffeeDataType, setActiveCoffeeShop } from "../../store/coffeeSlice";
import FeatureInfo from "./FeatureInfo";
import { useAppDispatch } from "../../hooks/hooks";

interface PropsType {
  coffeeShop: CoffeeDataType;
}

function ShopInfoCard({ coffeeShop }: PropsType) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {
    wifi,
    limited_time: limitedTime,
    socket,
    standing_desk: standingDesk,
    name,
    open_time: openTime,
    seat,
    quiet,
    tasty,
    cheap,
    music,
    url,
    address,
  } = coffeeShop;
  const dispatch = useAppDispatch();

  function handleOnClickCoffeeShopCard() {
    dispatch(setActiveCoffeeShop({}));
    dispatch(setActiveCoffeeShop(coffeeShop));
  }

  const hasWifi = wifi !== undefined && wifi > 0;
  const limitTime = limitedTime === "no";
  const provideSocket = socket === "yes" || socket === "maybe";
  const provideStandingDesk = standingDesk === "yes";

  return (
    <div
      className="flex w-full flex-col gap-2 rounded-md bg-white p-2 shadow-[10px_10px_20px_0px_rgba(0,0,0,0.5)]  transition-all hover:cursor-pointer hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100"
      onClick={() => handleOnClickCoffeeShopCard()}
      onKeyDown={() => handleOnClickCoffeeShopCard()}
      role="button"
      tabIndex={0}
    >
      <div className="flex w-full items-center justify-start  gap-2">
        <h3 className="text-xl font-bold underline underline-offset-2">
          {name}
        </h3>
      </div>
      <div className="flex w-full flex-wrap gap-4 text-sm">
        {hasWifi && <p className="dark:bg-primary  rounded-md px-2">有Wifi</p>}
        {provideSocket && (
          <p className="dark:bg-primary rounded-md px-2">有插座</p>
        )}
        {limitTime && <p className="dark:bg-primary rounded-md px-2">無限時</p>}
        {provideStandingDesk && (
          <p className="dark:bg-primary rounded-md px-2">有站位</p>
        )}
      </div>
      <div className="flex items-center justify-start gap-2">
        <IoLocation />
        <address>{address}</address>
      </div>
      <div
        className={`flex items-center justify-start gap-2 ${
          openTime || "text-gray-400"
        }`}
      >
        <MdAccessTime />
        <p>{openTime || "未提供營業時間"}</p>
      </div>
      <div className=" flex items-center justify-start gap-2">
        <CgWebsite />
        <a
          className={`${url ? "text-black" : "text-gray-300"}`}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {url === "" ? "未提供店家網址" : "店家網址"}
        </a>
      </div>
      <div className="border-b border-gray-400" />
      <div className="flex flex-col gap-2 text-sm xl:grid xl:grid-cols-2 xl:gap-2">
        <FeatureInfo title="seat" stars={seat} />
        <FeatureInfo title="wifi" stars={wifi} />
        <FeatureInfo title="quiet" stars={quiet} />
        <FeatureInfo title="tasty" stars={tasty} />
        <FeatureInfo title="cheap" stars={cheap} />
        <FeatureInfo title="music" stars={music} />
      </div>
    </div>
  );
}

export default ShopInfoCard;
