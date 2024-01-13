import { createSlice } from "@reduxjs/toolkit";

export interface CoffeeDataType {
  [key: string]: number | string | undefined;
  address: string | undefined;
  cheap: number | undefined;
  city: string | undefined;
  id: string | undefined;
  latitude: string | undefined;
  limited_time: "yes" | "maybe" | "no" | "" | undefined;
  longitude: string | undefined;
  mrt: string | undefined;
  music: number | undefined;
  name: string | undefined;
  open_time: string | undefined;
  quiet: number | undefined;
  seat: number | undefined;
  socket: "yes" | "maybe" | "no" | "" | undefined;
  standing_desk: "yes" | "no" | "" | undefined;
  tasty: number | undefined;
  url: string | undefined;
  wifi: number | undefined;
}

interface InitialStateType {
  activeCoffeeShop: CoffeeDataType | undefined;
  coffeeData: CoffeeDataType[] | undefined;
  searchCoffeeShopResult: CoffeeDataType[] | undefined;
  searchKey: string | null;
  isSearchMode: boolean | "init";
  activeFilters: string[];
  inViewportCoffeeShopData: CoffeeDataType[] | undefined;
  userLocation: { [key: string]: number };
}

const initialState: InitialStateType = {
  activeCoffeeShop: undefined,
  coffeeData: undefined,
  searchCoffeeShopResult: undefined,
  searchKey: null,
  isSearchMode: "init",
  activeFilters: [],
  inViewportCoffeeShopData: undefined,
  userLocation: {},
};

export const CoffeeSlice = createSlice({
  name: "CoffeeSlice",
  initialState,
  reducers: {
    initCoffeeStore: (state, action) => ({ ...state, ...action.payload }),
    setUserPostion: (state, action) => ({
      ...state,
      userLocation: action.payload,
    }),
    setInViewportCoffeeShopData: (state, action) => ({
      ...state,
      inViewportCoffeeShopData: action.payload,
    }),
    setFilters: (state, action) => {
      const isExist = state.activeFilters.find(
        (filter) => filter === action.payload,
      );
      let newActiveFilters: string[];
      if (isExist) {
        newActiveFilters = state.activeFilters.filter(
          (filter) => filter !== action.payload,
        );
        state.activeFilters = newActiveFilters;
      } else {
        state.activeFilters = [...state.activeFilters, action.payload];
      }
    },
    resetFilters: (state) => ({
      ...state,
      activeFilters: [],
    }),
    setSearchMode: (state, action) => ({
      ...state,
      isSearchMode: action.payload,
    }),
    setSearchKey: (state, action) => ({
      ...state,
      searchKey: action.payload,
      isSearchMode: action.payload === "" ? "init" : true,
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
  setUserPostion,
  setInViewportCoffeeShopData,
  setActiveCoffeeShop,
  setSearchCoffeeShopResult,
  setSearchKey,
  setSearchMode,
  setFilters,
  resetFilters,
} = CoffeeSlice.actions;

export default CoffeeSlice.reducer;
