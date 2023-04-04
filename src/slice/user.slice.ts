import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export type AccessToken = {
  accessToken: string | undefined;
};

type LoggedIn = {
  loggedIn: boolean;
};

// Define the initial state using that type
const initialState: AccessToken & LoggedIn = {
  accessToken: undefined,
  loggedIn: false,
};

export const user = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<AccessToken>) => {
      state.accessToken = action.payload.accessToken;
    },
    loggedIn: (state) => {
      state.loggedIn = true;
    },
    loggedOut: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { setAccessToken, loggedIn, loggedOut } = user.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectLoginStatus = (state: RootState) => state.user.loggedIn;

export default user.reducer;
