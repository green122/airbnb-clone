import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
  IAuthState,
} from "../../types/models";
import {
  authRoute,
  signUpRoute,
} from "../../constants/apiRoutes";
import {createSelector} from "reselect";
import {apiClient, setJwtToken} from "../../utils/apiClient";

const initialState: IAuthState = {
  isLogged: false,
  user: null,
  loading: false,
  loadingCurrent: false,
  loaded: false,
};

export const getAuthState = (state: any): IAuthState => state.auth;
export const getUser = createSelector(getAuthState, (authState) => {
  return authState.user;
});

export interface UserSignUpInfo {
  name: string;
  email: string;
  password: string;
}

export interface UserSocialSignUpInfo {
  social: 'facebook' | 'google',
  accessToken: string;
}

export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async () => {
    const result = await apiClient().get(authRoute);
    return result.data;
  }
);

export const signUp = createAsyncThunk(
  "auth/sign-up",
  async (userInfo: UserSignUpInfo | UserSocialSignUpInfo) => {
    const result = await axios.post(signUpRoute, userInfo);
    setJwtToken(result.data.accessToken, result.data.refreshToken);
    return result.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.isLogged = true;
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.loadingCurrent = true;
        state.loaded = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLogged = true;
        state.loadingCurrent = false;
        state.loaded = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.loaded = true;
        state.loadingCurrent = false;
      })

});

export const authReducer = authSlice.reducer;
