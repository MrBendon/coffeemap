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
}

const initialState: InitialStateType = {
  activeCoffeeShop: undefined,
  coffeeData: undefined,
};

export const CoffeeSlice = createSlice({
  name: "CoffeeSlice",
  initialState,
  reducers: {
    initCoffeeStore: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setActiveCoffeeShop: (state, action) => ({
      ...state,
      activeCoffeeShop: action.payload,
    }),
  },
});

export const { initCoffeeStore, setActiveCoffeeShop } = CoffeeSlice.actions;

export default CoffeeSlice.reducer;
