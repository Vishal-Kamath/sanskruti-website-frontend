import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type NotificationType = {
  message: string | undefined;
  type: 'success' | 'info' | 'warning' | 'error' | undefined;
};

type Notify = {
  notify: boolean;
};

// Define the initial state using that type
const initialState: Notify & NotificationType = {
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
    setNotification: (state, action: PayloadAction<NotificationType>) => {
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
