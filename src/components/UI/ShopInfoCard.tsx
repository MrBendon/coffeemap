import { IoLocation } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { IoIosStar } from "react-icons/io";
import { CoffeeDataType, setActiveCoffeeShop } from "../../store/coffeeSlice";
import FeatureInfo from "./FeatureInfo";
import { useAppDispatch } from "../../hooks/hooks";
import Badge from "./Badge";
import calcShopStars from "../../helper/calcShopStars";

interface PropsType {
  coffeeShop: CoffeeDataType;
}

function ShopInfoCard({ coffeeShop }: PropsType) {
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

  const totalStar = calcShopStars(coffeeShop);

  function handleOnClickCoffeeShopCard() {
    // dispatch(setActiveCoffeeShop({}));
    dispatch(setActiveCoffeeShop(coffeeShop));
  }

  const hasWifi = wifi !== undefined && wifi > 0;
  const limitTime = limitedTime === "no";
  const provideSocket = socket === "yes" || socket === "maybe";
  const provideStandingDesk = standingDesk === "yes";

  return (
    <div
      className="flex w-full flex-col gap-2 rounded-md bg-white p-2 py-4 shadow-[10px_10px_20px_0px_rgba(0,0,0,0.5)] transition-all  hover:cursor-pointer hover:bg-gray-200 md:gap-4 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-100 "
      onClick={() => handleOnClickCoffeeShopCard()}
      onKeyDown={() => handleOnClickCoffeeShopCard()}
      role="button"
      tabIndex={0}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <h3 className="text-base font-bold underline underline-offset-4 md:text-xl">
          {name}
        </h3>
        <div className="flex items-center justify-center gap-1 text-sm text-orange-500 md:text-base">
          {totalStar}
          <IoIosStar />
        </div>
      </div>
      {/* 徽章 */}
      <div className="flex w-full flex-wrap gap-4 text-xs md:text-sm">
        {hasWifi && <Badge badgeText="有Wifi" />}
        {provideSocket && <Badge badgeText="有插座" />}
        {limitTime && <Badge badgeText="無限時" />}
        {provideStandingDesk && <Badge badgeText="有站位" />}
      </div>
      {/* 地址 */}
      <div className="flex items-center justify-start gap-2 text-sm md:text-base">
        <IoLocation />
        <address>{address}</address>
      </div>
      {/* 營業日 */}
      <div
        className={`flex items-center justify-start gap-2 text-sm md:text-base ${
          openTime || "text-gray-400"
        }`}
      >
        <MdAccessTime />
        <p>{openTime || "未提供營業時間"}</p>
      </div>
      {/* 店家網址 */}
      <div className=" flex items-center justify-start gap-2 text-sm md:text-base">
        <CgWebsite />
        {url ? (
          <a
            className="text-black underline underline-offset-4 dark:text-white"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            店家網址
          </a>
        ) : (
          <p className="text-gray-400">未提供店家網址</p>
        )}
      </div>
      <div className="border-b border-gray-400" />
      <div className="flex flex-col gap-2 text-sm md:block xl:grid xl:grid-cols-2 xl:gap-2">
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
