import { createSlice } from "@reduxjs/toolkit";

export interface CoffeeDataType {
  address: string | undefined;
  cheap: number | undefined;
  city: string | undefined;
  id: string | undefined;
  latitude: string | undefined;
  limited_time: "yes" | "maybe" | "no" | undefined;
  longitude: string | undefined;
  mrt: string | undefined;
  music: number | undefined;
  name: string | undefined;
  open_time: string | undefined;
  quiet: number | undefined;
  seat: number | undefined;
  socket: "yes" | "maybe" | "no" | undefined;
  standing_desk: "yes" | "no" | undefined;
  tasty: number | undefined;
  url: string | undefined;
  wifi: number | undefined;
}

interface InitialStateType {
  activeCoffeeShop: CoffeeDataType | undefined;
  coffeeData: CoffeeDataType[] | undefined;
  searchCoffeeShopResult: CoffeeDataType[] | undefined;
  searchKey: string | null;
}

const initialState: InitialStateType = {
  activeCoffeeShop: undefined,
  coffeeData: undefined,
  searchCoffeeShopResult: undefined,
  searchKey: null,
};

export const CoffeeSlice = createSlice({
  name: "CoffeeSlice",
  initialState,
  reducers: {
    initCoffeeStore: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setSearchKey: (state, action) => ({
      ...state,
      searchKey: action.payload,
    }),
    setActiveCoffeeShop: (state, action) => ({
      ...state,
      activeCoffeeShop: action.payload,
    }),
    setSearchCoffeeShopResult: (state, action) => ({
      ...state,
      searchCoffeeShopResult: action.payload,
    }),
  },
});

export const {
  initCoffeeStore,
  setActiveCoffeeShop,
  setSearchCoffeeShopResult,
  setSearchKey,
} = CoffeeSlice.actions;

export default CoffeeSlice.reducer;
