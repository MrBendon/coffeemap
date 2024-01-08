import { createSlice } from "@reduxjs/toolkit";

interface PagecontrolType {
  isOpenMap: boolean;
  isDarkMode: boolean;
}

const initialState: PagecontrolType = {
  isOpenMap: true,
  isDarkMode: false,
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
  },
});

export const { toggleIsOpenMap, toggleIsDarkMode, darkModeInit } =
  pagecontrolSlice.actions;

export default pagecontrolSlice.reducer;
