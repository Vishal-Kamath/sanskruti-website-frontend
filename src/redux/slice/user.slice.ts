import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

type UserAuthType = {
  isAuthenticated: boolean;
  accessToken?: string;
  loading: boolean;
};

type UserType = {
  name?: string;
  email?: string;
  address?: string;
  Mobile_No?: number;
  dob?: Date;
};

const initialState: UserAuthType & UserType = {
  isAuthenticated: false,
  loading: false,
  // user
  name: "John Doe",
  Mobile_No: 1234567890,
  email: "Johndoe@email.com",
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    // accessToken
    setAccessToken: (
      state,
      action: PayloadAction<UserAuthType["accessToken"]>
    ) => {
      state.accessToken = action.payload;
    },
    // user
    setUser: (state, action: PayloadAction<UserType>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.Mobile_No = action.payload.Mobile_No;
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

export const { setAccessToken, setUser, loggedIn, loggedOut } = user.actions;

export const selectisAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUser = (state: RootState) => state.user;

export default user.reducer;
