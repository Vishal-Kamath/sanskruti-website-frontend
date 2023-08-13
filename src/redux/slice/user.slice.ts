import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export type UserAuthType = {
  isAuthenticated: boolean;
};

export type Address = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  tel: number;
  email: string;
};

export type UserType = {
  username?: string;
  email?: string;
  email_verified?: boolean;
  address?: Address[];
  Mobile_No?: number;
  Mobile_No_verified?: boolean;
  provider?: "Email/Number" | "google";
};

const initialState: UserAuthType & UserType = {
  isAuthenticated: true,
  // user
  username: "John Doe",
  Mobile_No: 1234567890,
  email: "Johndoe@email.com",
  address: [],
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    // user
    setUser: (state, action: PayloadAction<UserType>) => {
      state.email = action.payload.email ? action.payload.email : state.email;
      state.email_verified =
        action.payload.email_verified !== undefined
          ? action.payload.email_verified
          : state.email_verified;
      state.username = action.payload.username
        ? action.payload.username
        : state.username;
      state.Mobile_No = action.payload.Mobile_No
        ? action.payload.Mobile_No
        : state.Mobile_No;
      state.Mobile_No_verified =
        action.payload.Mobile_No_verified !== undefined
          ? action.payload.Mobile_No_verified
          : state.Mobile_No_verified;
      state.address = action.payload.address
        ? action.payload.address
        : state.address;
      state.provider = action.payload.provider
        ? action.payload.provider
        : state.provider;
    },
    setAddress: (state, action: PayloadAction<Address[]>) => {
      state.address = action.payload;
    },

    // login status
    loggedIn: (state) => {
      state.isAuthenticated = true;
    },
    loggedOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setAddress, loggedIn, loggedOut } = user.actions;

export const selectisAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUser = (state: RootState) => state.user;
export const selectUsername = (state: RootState) => state.user.username;

export default user.reducer;
