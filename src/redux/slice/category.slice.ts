import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export type CategoryType = {
  Title: string;
  Image: string;
  Meta_Title: string;
  Meta_Description: string;
  subCategory: string[];
};

export type CategoryStateType = {
  categories: CategoryType[];
};

const initialState: CategoryStateType = {
  categories: [],
};

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    // category
    setCategory: (state, action: PayloadAction<CategoryStateType>) => {
      state.categories = action.payload.categories;
    },
  },
});

export const { setCategory } = category.actions;

export const selectCategory = (state: RootState) => state.category;

export default category.reducer;
