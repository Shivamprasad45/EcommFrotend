import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UserAddresedata,
  UserAddresedataRemove,
  UserLogindata,
  UserSignUpdata,
  UserUpdateAddrese,
} from "./AuthAPI";

const initialState = {
  UserData: null,
  status: "",
  CheckedData: [],
  error: null,
};

export const UserSignUpAsync = createAsyncThunk(
  "user/UserSignUpdata",
  async (SignUpdata) => {
    try {
      const response = UserSignUpdata(SignUpdata);
      console.log(response, "UserSignUpdata");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const UserLoginAsync = createAsyncThunk(
  "user/UserLogindata",
  async (Logindata) => {
    try {
      const response = UserLogindata(Logindata);
      console.log(response, "user login response");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const UserAddresedataRemoveAsync = createAsyncThunk(
  "user/UserAddresedataRemove",
  async (Logindata) => {
    try {
      const response = UserAddresedataRemove(Logindata);
      console.log(response, "user login response");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const UserDataAsync = createAsyncThunk(
  "user/UserAddresedata",
  async (Userdata) => {
    try {
      const response = UserAddresedata(Userdata);
      console.log(response, "UserSignUpdata");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const UserDataUpdteAsync = createAsyncThunk(
  "user/UserUpdateAddrese",
  async (Userdata) => {
    try {
      const response = UserUpdateAddrese(Userdata);
      console.log(response, "UserSignUpdata");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const AuthSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UserSignUpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserSignUpAsync.fulfilled, (state, action) => {
        console.log("Fulfilled Action Payload:", action.payload);
        state.UserData = action.payload;
        state.status = "fulfilled";
      })
      .addCase(UserSignUpAsync.rejected, (state, action) => {
        console.log("Fulfilled Action Payload UserSignUpAsync", action.payload);
        state.error = action.error;
        state.status = "Rejected";
      })
      .addCase(UserLoginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserLoginAsync.fulfilled, (state, action) => {
        console.log("Fulfilled Action Payload:", action.payload);

        state.UserData = action.payload;
        state.status = "fulfilled";
        state.error = null;
      })
      .addCase(UserLoginAsync.rejected, (state, action) => {
        console.log("Fulfilled Action Payload:", action.payload);
        state.error = action.error;
        state.status = "Rejected";
      })
      .addCase(UserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserDataAsync.fulfilled, (state, action) => {
        console.log("Fulfilled Action Payload:", action.payload);
        state.UserData.data.Addresses.push(action.payload);
        state.status = "fulfilled";
      })
      .addCase(UserAddresedataRemoveAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserAddresedataRemoveAsync.fulfilled, (state, action) => {
        console.log(state.UserData.data.Addresses[0], "Remove Addresses");
        const RemoveAdd = state.UserData.data.Addresses.filter(
          (item) => item.billing_zip !== action.payload.billing_zip
        );

        state.UserData.data.Addresses = RemoveAdd;
        state.status = "fulfilled";
      })
      .addCase(UserDataUpdteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserDataUpdteAsync.fulfilled, (state, action) => {
        state.UserData.data.Addresses[action.payload.Index] =
          action.payload.Addresses[0];
      });
  },
});

export default AuthSlice.reducer;
export const UserSelector = (state) => state.Auths.UserData;
export const ErrorSelector = (state) => state.Auths.error;
