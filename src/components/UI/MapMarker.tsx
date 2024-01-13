import { useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { IoLocation } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import L from "leaflet";
import { CoffeeDataType } from "../../store/coffeeSlice";
import FeatureInfo from "./FeatureInfo";
import { useAppSelector } from "../../hooks/hooks";
import LocationPNG from "../../assets/placeholder.png";
import LocationYellowPNG from "../../assets/placeholder-yellow.png";

interface PropsType {
  coffeeShop: CoffeeDataType;
  activeCoffeeShopId: string;
}

function MapMarker({ activeCoffeeShopId, coffeeShop }: PropsType) {
  const isActive = activeCoffeeShopId === coffeeShop.id;
  const markerRef = useRef<L.Marker>(null);
  const map = useMap();
  const latitude = Number(coffeeShop.latitude);
  const longitude = Number(coffeeShop.longitude);
  const isDarkMode = useAppSelector((state) => state.pagecontrol.isDarkMode);

  useEffect(() => {
    if (isActive && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isActive]);

  return (
    <Marker
      position={[latitude, longitude]}
      ref={markerRef}
      icon={L.divIcon({
        // iconSize: "auto",
        // iconUrl: isDarkMode ? LocationPNG : LocationRedPNG,
        className: "closeDefaultString",
        html: `<div class="${
          isDarkMode ? "custom__marker--dark" : "custom__marker"
        }"><img src=${
          isDarkMode ? LocationPNG : LocationYellowPNG
        } alt="icon" class="marker__icon" />
                    <span>${coffeeShop.name}</span>
                </div>`,
      })}
      eventHandlers={{
        click: () => {
          map.setView([latitude, longitude], 17);
        },
      }}
    >
      <Popup>
        <div className="flex w-[330px] flex-col gap-4 pr-4">
          <div className="text-wrap text-xl font-bold underline underline-offset-2 ">
            {coffeeShop.name}
          </div>
          <div className="flex flex-col gap-1 text-[12px]">
            <address className="flex items-center gap-2">
              <IoLocation /> {coffeeShop.address}
            </address>
            <div className="flex items-center gap-2">
              <MdAccessTime />
              {coffeeShop.open_time || "未提供營業時間"}
            </div>
            <div className="flex items-center gap-2">
              <CgWebsite />
              {coffeeShop.url !== "" ? (
                <a
                  className="text-black underline underline-offset-4 dark:text-white"
                  href={coffeeShop.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  店家網址
                </a>
              ) : (
                <div className="text-gray-400">未提供店家網址</div>
              )}
            </div>
            <div className="grid w-full grid-cols-2 pt-2">
              <FeatureInfo title="seat" stars={coffeeShop.seat} />
              <FeatureInfo title="wifi" stars={coffeeShop.wifi} />
              <FeatureInfo title="quiet" stars={coffeeShop.quiet} />
              <FeatureInfo title="tasty" stars={coffeeShop.tasty} />
              <FeatureInfo title="cheap" stars={coffeeShop.cheap} />
              <FeatureInfo title="music" stars={coffeeShop.music} />
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
