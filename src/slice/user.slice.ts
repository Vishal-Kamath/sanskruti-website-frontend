import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import axios from "axios";
import getUser from "@/utils/getUser.utils";

export type AccessToken = {
  accessToken: string | undefined;
};

export type UserType = {
  name: string;
  email: string;
  Mobile_No: number;
};

type LoggedIn = {
  loggedIn: boolean;
};

// Define the initial state using that type
const initialState: AccessToken & UserType & LoggedIn = {
  accessToken: undefined,
  loggedIn: false,

  // user
  name: "John Doe",
  Mobile_No: 1234567890,
  email: "Johndoe@email.com",
};

const fetchUser = createAsyncThunk(
  "users/fetchByIdStatus",
  async (accessToken: string, thunkAPI) => {
    const response = await getUser({ accessToken });
    return response;
  }
);

export const user = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // accessToken
    setAccessToken: (state, action: PayloadAction<AccessToken>) => {
      state.accessToken = action.payload.accessToken;
    },
    // user
    setUser: (state, action: PayloadAction<UserType>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.Mobile_No = action.payload.Mobile_No;
    },
    // login status
    loggedIn: (state) => {
      state.loggedIn = true;
    },
    loggedOut: (state) => {
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // Add user to the state array
    });
  },
});

export const { setAccessToken, setUser, loggedIn, loggedOut } = user.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectLoginStatus = (state: RootState) => state.user.loggedIn;
export const selectUser = (state: RootState) => state.user;

export default user.reducer;
