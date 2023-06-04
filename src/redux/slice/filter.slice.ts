import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";

type FilterType = {
  main: string | undefined;
};

// Define the initial state using that type
const initialState: FilterType = {
  main: undefined,
};

export const filter = createSlice({
  name: "filter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.main = action.payload;
    },
  },
});

export const { setFilter } = filter.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFilterMain = (state: RootState) => state.filter.main;

export default filter.reducer;
