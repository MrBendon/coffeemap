/* eslint-disable import/no-extraneous-dependencies */
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { LeafletMouseEvent } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import MapMarker from "./UI/MapMarker";
import { useGetAllCoffeeQuery } from "../store/apis/apiSlice";
import LoadingPage from "./UI/LoadingPage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  CoffeeDataType,
  setInViewportCoffeeShopData,
  setSearchMode,
} from "../store/coffeeSlice";

interface SetViewPropsType {
  animateRef: MutableRefObject<boolean>;
}

interface SetViewToTargetCoffeeShopPropsType {
  setActiveCoffeeShopId: (activeCoffeeShop: string) => void;
}

interface SetViewportBoundsPropsType {
  coffeeData: CoffeeDataType[] | undefined;
}

function SetViewOnClick({ animateRef }: SetViewPropsType) {
  const dispatch = useAppDispatch();
  console.log("OnCLICK");
  const isSearchMode = useAppSelector((state) => state.coffee.isSearchMode);
  const map = useMapEvent("click", (e: LeafletMouseEvent) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
    if (isSearchMode) {
      dispatch(setSearchMode(false));
    }
  });

  return null;
}

function SetViewToTargetCoffeeShop({
  setActiveCoffeeShopId,
}: SetViewToTargetCoffeeShopPropsType) {
  console.log("move to active shop");
  const map = useMap();
  const activeCoffeeShop = useAppSelector(
    (state) => state.coffee.activeCoffeeShop,
  );

  useEffect(() => {
    if (
      activeCoffeeShop?.id &&
      activeCoffeeShop?.latitude &&
      activeCoffeeShop?.longitude
    ) {
      const latitude = Number(activeCoffeeShop.latitude);
      const longitude = Number(activeCoffeeShop.longitude);
      map.setView([latitude, longitude], 18);
      setActiveCoffeeShopId(activeCoffeeShop.id);
    }
  }, [activeCoffeeShop, setActiveCoffeeShopId, map]);

  // eslint-disable-next-line consistent-return
  return null;
}

function SetViewportBounds({ coffeeData }: SetViewportBoundsPropsType) {
  const dispatch = useAppDispatch();
  const map = useMap();
  useEffect(() => {
    function updateInViewportData() {
      console.log("effect");
      const boundary = map.getBounds();
      const inViewportBoundCoffeeData = coffeeData?.filter((coffeeShop) => {
        const lag = Number(coffeeShop.latitude);
        const lng = Number(coffeeShop.longitude);
        return boundary.contains([lag, lng]);
      });
      dispatch(setInViewportCoffeeShopData(inViewportBoundCoffeeData));
    }
    map.addEventListener("moveend", updateInViewportData);

    return () => {
      map.removeEventListener("moveend", updateInViewportData);
    };
  }, [map, coffeeData, dispatch]);

  return null;
}

function Map() {
  const { data: coffeeData, isLoading } = useGetAllCoffeeQuery();
  const [activeCoffeeShopId, setActiveCoffeeShopId] = useState("");
  const animateRef = useRef(true);
  console.log("map re-render");
  // const boundary = useAppSelector((state) => state.coffee.boundary);
  // const inViewportData = coffeeData?.filter((coffeeShop) => {
  //   const lat = Number(coffeeShop.latitude);
  //   const lng = Number(coffeeShop.longitude);
  //   return boundary?.contains([lat, lng]);
  // });

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

        <SetViewportBounds coffeeData={coffeeData} />
        <SetViewOnClick animateRef={animateRef} />
        <SetViewToTargetCoffeeShop
          setActiveCoffeeShopId={setActiveCoffeeShopId}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
