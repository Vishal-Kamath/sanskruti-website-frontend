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
  coupon: {
    discount: number;
    code: string;
  };
};

const initialState: CartType = {
  cart: [],
  coupon: {
    discount: 0,
    code: "",
  },
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // cart
    setCart: (state, action: PayloadAction<CartType>) => {
      state.cart = action.payload.cart;
    },

    setCouponDiscount: (
      state,
      action: PayloadAction<{
        discount: number;
        code: string;
      }>
    ) => {
      state.coupon.discount = action.payload.discount;
      state.coupon.code = action.payload.code;
    },
  },
});

export const { setCart, setCouponDiscount } = cart.actions;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectCouponDiscount = (state: RootState) => state.cart.coupon;

export default cart.reducer;
