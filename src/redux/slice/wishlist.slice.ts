import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ProductType } from "@/components/header/header";

export type WishlistType = {
  ids: string[];
  list: ProductType[];
};

// Define the initial state using that type
const initialState: WishlistType = {
  ids: [],
  list: [],
};

export const wishlist = createSlice({
  name: "wishlist",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WishlistType>) => {
      state.ids = action.payload.ids;
      state.list = action.payload.list;
    },
    setWishlistIds: (state, action: PayloadAction<{ ids: string[] }>) => {
      state.ids = action.payload.ids;
    },
  },
});

export const { setWishlist, setWishlistIds } = wishlist.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectWishlistIds = (state: RootState) => state.wishlist.ids;
export const selectWishlistList = (state: RootState) => state.wishlist.list;

export default wishlist.reducer;
