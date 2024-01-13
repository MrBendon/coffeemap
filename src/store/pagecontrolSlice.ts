import { createSlice } from "@reduxjs/toolkit";

interface PagecontrolType {
  isOpenMap: boolean;
  isDarkMode: boolean;
  isOpenFiltersBlock: boolean;
  listMaxDisplayQuantity: number;
  mobileIsOpenSearch: boolean;
  mobileIsOpenSearchList: boolean;
}

const initialState: PagecontrolType = {
  isOpenMap: true,
  isDarkMode: false,
  isOpenFiltersBlock: false,
  listMaxDisplayQuantity: 30,
  mobileIsOpenSearch: false,
  mobileIsOpenSearchList: false,
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
    toggleMobileIsOpenSearch: (state, action) => ({
      ...state,
      mobileIsOpenSearch: action.payload,
    }),
    toggleMobileIsOpenSearchList: (state, action) => ({
      ...state,
      mobileIsOpenSearchList: action.payload,
    }),
  },
});

export const {
  toggleIsOpenMap,
  toggleIsDarkMode,
  darkModeInit,
  toggleIsOpenFiltersBlock,
  toggleMobileIsOpenSearch,
  toggleMobileIsOpenSearchList,
} = pagecontrolSlice.actions;

export default pagecontrolSlice.reducer;
