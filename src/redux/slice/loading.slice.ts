import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

type LoadingType = {
  loading: boolean;
  total: number;
  complete: number;
};

// Define the initial state using that type
const initialState: LoadingType = {
  loading: true,
  total: 0,
  complete: 0,
};

export const loading = createSlice({
  name: "loading",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.total += 1;
    },
    completeLoading: (state) => {
      state.complete += 1;

      if (state.total === state.complete) {
        state.loading = false;
        state.total = 0;
        state.complete = 0;
      }
    },
    stopLoading: (state) => {
      if (state.total === state.complete) {
        state.loading = false;
        state.total = 0;
        state.complete = 0;
      }
    },
  },
});

export const { startLoading, completeLoading, stopLoading } = loading.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoadingState = (state: RootState) => state.loading;

export default loading.reducer;
