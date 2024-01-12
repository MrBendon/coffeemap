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
  setUserPostion,
} from "../store/coffeeSlice";
import filterData from "../helper/filterData";

interface SetViewPropsType {
  animateRef: MutableRefObject<boolean>;
}

interface SetViewToTargetCoffeeShopPropsType {
  setActiveCoffeeShopId: (activeCoffeeShop: string) => void;
}

interface SetViewportBoundsPropsType {
  coffeeData: CoffeeDataType[] | undefined;
}

function InitUserLocation() {
  // const [userPosition, setUserPosition] = useState<unknown>(null);
  const map = useMap();
  const dispatch = useAppDispatch();
  useEffect(() => {
    map.locate({ setView: true });
    map.on("locationfound", (e) => {
      console.log(e.latlng);
      const usePosition = { lat: e.latlng.lat, lng: e.latlng.lng };
      dispatch(setUserPostion(usePosition));
    });
  }, [map, dispatch]);
  return null;
}

function SetViewOnClick({ animateRef }: SetViewPropsType) {
  const dispatch = useAppDispatch();
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

function SetViewToTargetCoffeeShopByClickCard({
  setActiveCoffeeShopId,
}: SetViewToTargetCoffeeShopPropsType) {
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
      map.setView([latitude, longitude], 17);
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
interface RenderMarkPropsType {
  coffeeData: CoffeeDataType[] | undefined;
  activeCoffeeShopId: string;
}

function RenderMarker({ coffeeData, activeCoffeeShopId }: RenderMarkPropsType) {
  const activeFilter = useAppSelector((state) => state.coffee.activeFilters);
  let coffeeDataAfterFilter = coffeeData;

  if (activeFilter.length > 0 && coffeeData) {
    coffeeDataAfterFilter = filterData(coffeeData, activeFilter);
  }
  return (
    <MarkerClusterGroup chunkedLoading>
      {coffeeDataAfterFilter?.map((coffeeShop) => (
        <MapMarker
          activeCoffeeShopId={activeCoffeeShopId}
          coffeeShop={coffeeShop}
          key={coffeeShop.id}
        />
      ))}
    </MarkerClusterGroup>
  );
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
        <InitUserLocation />
        <RenderMarker
          coffeeData={coffeeData}
          activeCoffeeShopId={activeCoffeeShopId}
        />
        <SetViewportBounds coffeeData={coffeeData} />
        <SetViewOnClick animateRef={animateRef} />
        <SetViewToTargetCoffeeShopByClickCard
          setActiveCoffeeShopId={setActiveCoffeeShopId}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
