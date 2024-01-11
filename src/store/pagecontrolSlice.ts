import { createSlice } from "@reduxjs/toolkit";

interface PagecontrolType {
  isOpenMap: boolean;
  isDarkMode: boolean;
  isOpenFiltersBlock: boolean;
  listMaxDisplayQuantity: number;
}

const initialState: PagecontrolType = {
  isOpenMap: true,
  isDarkMode: false,
  isOpenFiltersBlock: false,
  listMaxDisplayQuantity: 20,
};

export const pagecontrolSlice = createSlice({
  name: "pagecontrolSlice",
  initialState,
  reducers: {
    darkModeInit: (state) => {
      if (state.isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    toggleIsOpenMap: (state) => {
      state.isOpenMap = !state.isOpenMap;
    },
    toggleIsDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      if (state.isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    toggleIsOpenFiltersBlock: (state) => {
      state.isOpenFiltersBlock = !state.isOpenFiltersBlock;
    },
  },
});

export const {
  toggleIsOpenMap,
  toggleIsDarkMode,
  darkModeInit,
  toggleIsOpenFiltersBlock,
} = pagecontrolSlice.actions;

export default pagecontrolSlice.reducer;
