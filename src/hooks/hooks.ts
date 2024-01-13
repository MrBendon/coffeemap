import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useGetAllCoffeeQuery } from "../store/apis/apiSlice";
import dummyCoffeeShopData from "../data/dummyCoffeeShopData";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetCoffeeData = () => {
  const { data, isLoading, error } = useGetAllCoffeeQuery();
  const coffeeData = error ? dummyCoffeeShopData : data;
  return { coffeeData, isLoading, error };
};
