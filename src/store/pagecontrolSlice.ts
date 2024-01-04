import { createSlice } from "@reduxjs/toolkit";

interface PagecontrolType {
  isOpenMap: boolean;
}

const initialState: PagecontrolType = {
  isOpenMap: false,
};

export const pagecontrolSlice = createSlice({
  name: "pagecontrolSlice",
  initialState,
  reducers: {
    toggleIsOpenMap: (state) => {
      state.isOpenMap = !state.isOpenMap;
    },
  },
});

export const { toggleIsOpenMap } = pagecontrolSlice.actions;

export default pagecontrolSlice.reducer;
