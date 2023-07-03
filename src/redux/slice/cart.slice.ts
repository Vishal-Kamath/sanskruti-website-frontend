import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ProductType } from "@/components/header/header";
import { Address } from "./user.slice";

export type CartItem = {
  product: ProductType;
  quantity: number;
  variant: string[];
};

export type CartType = {
  cart: CartItem[];

  // Address
  shippingAddress?: Address;
  billingAddress?: Address;
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

    // Addresses
    setShippingAddress: (
      state,
      action: PayloadAction<{ address: Address }>
    ) => {
      state.shippingAddress = action.payload.address;
    },
    setBillingAddress: (state, action: PayloadAction<{ address: Address }>) => {
      state.billingAddress = action.payload.address;
    },
  },
});

export const { setCart, setShippingAddress, setBillingAddress } = cart.actions;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectShipping = (state: RootState) => state.cart.shippingAddress;
export const selectBilling = (state: RootState) => state.cart.billingAddress;

export default cart.reducer;
