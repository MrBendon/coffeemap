import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  value: number;
}

const initialState: InitialStateType = {
  value: 20,
};

export const CoffeeSlice = createSlice({
  name: "CoffeeSlice",
  initialState,
  reducers: {
    plus: (state) => ({ ...state, value: state.value + 1 }),
    minus: (state, action) => ({
      ...state,
      value: state.value - action.payload,
    }),
  },
});

export const { plus, minus } = CoffeeSlice.actions;

export default CoffeeSlice.reducer;
// state.value += 1;
// state.value = action.payload;
