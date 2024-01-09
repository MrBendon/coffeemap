import { useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { CoffeeDataType } from "../../store/coffeeSlice";

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
      console.log(markerRef.current);
      markerRef.current.openPopup();
    }
  }, [isActive]);

  return (
    <Marker
      position={[latitude, longitude]}
      eventHandlers={{
        click: () => {
          map.setView([latitude, longitude], 17);
        },
      }}
      ref={isActive ? markerRef : null}
    >
      <Popup>
        <div className="flex flex-col items-start rounded-lg">
          <p className="text-lg font-bold underline underline-offset-2 dark:text-white">
            {coffeeShop.name}
          </p>
          <address> {coffeeShop.address}</address>
          <p>{coffeeShop.open_time}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
