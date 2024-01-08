/* eslint-disable import/no-extraneous-dependencies */
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MutableRefObject, useRef, useState } from "react";
import { LeafletMouseEvent } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import MapMarker from "./UI/MapMarker";
import { useGetAllCoffeeQuery } from "../store/apis/apiSlice";
import LoadingPage from "./UI/LoadingPage";
import { useAppSelector } from "../hooks/hooks";

interface SetViewPropsType {
  animateRef: MutableRefObject<boolean>;
}

function SetViewOnClick({ animateRef }: SetViewPropsType) {
  const map = useMapEvent("click", (e: LeafletMouseEvent) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });
  return null;
}

interface PropsType {
  setActiveCoffeeShopId: (activeCoffeeShop: string) => void;
}

function SetViewToTargetCoffeeShop({ setActiveCoffeeShopId }: PropsType) {
  const map = useMap();
  const activeCoffeeShop = useAppSelector(
    (state) => state.coffee.activeCoffeeShop,
  );
  if (
    !activeCoffeeShop?.id ||
    !activeCoffeeShop?.latitude ||
    !activeCoffeeShop?.longitude
  )
    return;
  const latitude = Number(activeCoffeeShop.latitude);
  const longitude = Number(activeCoffeeShop.longitude);
  map.setView([latitude, longitude], 17);
  setActiveCoffeeShopId(activeCoffeeShop.id);
  // eslint-disable-next-line consistent-return
  return null;
}

function Map() {
  const { data: coffeeData, isLoading } = useGetAllCoffeeQuery();
  const [activeCoffeeShopId, setActiveCoffeeShopId] = useState("");
  const animateRef = useRef(true);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="h-full w-full bg-blue-300">
      <MapContainer
        center={[24.18, 120.6149]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {coffeeData?.map((coffeeShop) => (
            <MapMarker
              activeCoffeeShopId={activeCoffeeShopId}
              coffeeShop={coffeeShop}
              key={coffeeShop.id}
            />
          ))}
        </MarkerClusterGroup>

        <SetViewOnClick animateRef={animateRef} />
        <SetViewToTargetCoffeeShop
          setActiveCoffeeShopId={setActiveCoffeeShopId}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
