import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { Tags } from '@/model/item.model';

export type SearchType = {
  message: string | undefined;
  type: 'success' | 'warning' | 'info' | undefined;
};

type Notify = {
  notify: boolean;
};

// Define the initial state using that type
const initialState: Notify & SearchType = {
  notify: false,
  message: undefined,
  type: undefined,
};

export const notification = createSlice({
  name: 'notification',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showNotification: (state) => {
      state.notify = true;
    },
    closeNotification: (state) => {
      state.notify = false;
    },
    setNotification: (state, action: PayloadAction<SearchType>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.message = undefined;
      state.type = undefined;
    },
  },
});

export const {
  showNotification,
  closeNotification,
  setNotification,
  clearNotification,
} = notification.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNotification = (state: RootState) => state.notification;

export default notification.reducer;
