import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

type LoadingType = {
  loading: boolean;
  value: number;
};

// Define the initial state using that type
const initialState: LoadingType = {
  loading: true,
  value: 0,
};

export const loading = createSlice({
  name: "loading",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingType>) => {
      state.loading = action.payload.loading;
      state.value = action.payload.value;
    },
  },
});

export const { setLoading } = loading.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoadingState = (state: RootState) => state.loading;

export default loading.reducer;
