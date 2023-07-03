import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ProductType } from "@/components/header/header";

export type CartItem = {
  product: ProductType;
  quantity: number;
  variant: string[];
};

export type CartType = {
  cart: CartItem[];
};

const initialState: CartType = {
  cart: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // cart
    setCart: (state, action: PayloadAction<CartType>) => {
      state.cart = action.payload.cart;
    },
  },
});

export const { setCart } = cart.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cart.reducer;
