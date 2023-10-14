import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ProductType } from "@/components/header/header";

const initialState = {
  min: 0,
  max: 100,
};

export const price = createSlice({
  name: "price",
  initialState,
  reducers: {
    // price
    setPrice: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.min = action.payload.min;
      state.max = action.payload.max;
    },
  },
});

export const { setPrice } = price.actions;

export const selectPrice = (state: RootState) => state.price;

export default price.reducer;
