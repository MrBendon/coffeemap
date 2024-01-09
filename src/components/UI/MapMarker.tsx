import { useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { IoLocation } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { CoffeeDataType } from "../../store/coffeeSlice";
import FeatureInfo from "./FeatureInfo";

interface PropsType {
  coffeeShop: CoffeeDataType;
  activeCoffeeShopId: string;
}

function MapMarker({ activeCoffeeShopId, coffeeShop }: PropsType) {
  const map = useMap();
  const isActive = activeCoffeeShopId === coffeeShop.id;
  const markerRef = useRef(null);
  const latitude = Number(coffeeShop.latitude);
  const longitude = Number(coffeeShop.longitude);

  useEffect(() => {
    if (isActive && markerRef.current) {
      // console.log(markerRef.current);
      markerRef.current.openPopup();
    }
  }, [isActive]);

  return (
    <Marker
      position={[latitude, longitude]}
      eventHandlers={{
        click: () => {
          map.setView([latitude, longitude], 18);
        },
      }}
      ref={isActive ? markerRef : null}
    >
      <Popup>
        <div className="w-max">
          <p className="text-xl font-bold underline underline-offset-2 ">
            {coffeeShop.name}
          </p>
          <div className="grid grid-cols-2 gap-x-4 text-[12px]">
            <address className="col-span-2 flex items-center gap-2">
              <IoLocation /> {coffeeShop.address}
            </address>
            <p className="col-span-2 flex items-center gap-2">
              <MdAccessTime />
              {coffeeShop.open_time || "未提供營業時間"}
            </p>
            <FeatureInfo title="seat" stars={coffeeShop.seat} />
            <FeatureInfo title="wifi" stars={coffeeShop.wifi} />
            <FeatureInfo title="quiet" stars={coffeeShop.quiet} />
            <FeatureInfo title="tasty" stars={coffeeShop.tasty} />
            <FeatureInfo title="cheap" stars={coffeeShop.cheap} />
            <FeatureInfo title="music" stars={coffeeShop.music} />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
