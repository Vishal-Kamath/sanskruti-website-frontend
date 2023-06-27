import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ProductType } from "@/components/header/header";

export type CategoryType = {
  categories: {
    Title: string;
    Image: string;
    Meta_Title: string;
    Meta_Description: string;
    subCategory: string[];
  }[];
};

const initialState: CategoryType = {
  categories: [],
};

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    // category
    setCategory: (state, action: PayloadAction<CategoryType>) => {
      state.categories = action.payload.categories;
    },
  },
});

export const { setCategory } = category.actions;

export const selectCategory = (state: RootState) => state.category;

export default category.reducer;
