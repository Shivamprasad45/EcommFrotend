import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BrowserSave,
  FetchComment,
  FetchHistory,
  UserCommentsSave,
} from "./BrowserAPI";
const initialState = {
  BrowserData: [],
  status: "",
  UserComment: [],
};

export const UserHistoryAsync = createAsyncThunk(
  "user/UserHistoryAsync",
  async (data) => {
    try {
      const response = BrowserSave(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const FetchHistoryAsync = createAsyncThunk(
  "user/FetchHistory",
  async (data) => {
    try {
      const response = FetchHistory(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const UserCommentAsync = createAsyncThunk(
  "Comments/UserCommentsSave",
  async (UsersComment) => {
    try {
      const response = UserCommentsSave(UsersComment);
      console.log(UsersComment, "    UsersComment");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const FetchCommentAsync = createAsyncThunk(
  "Comments/FetchComment",
  async (id) => {
    try {
      const response = FetchComment(id);
      console.log(id, " UsersComment");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
const BrowserSlice = createSlice({
  name: "Browser",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(UserHistoryAsync.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(UserHistoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload, "browser history");
        state.BrowserData.push(action.payload);
      })
      .addCase(FetchHistoryAsync.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(FetchHistoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.BrowserData = action.payload;
      })
      .addCase(UserCommentAsync.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(UserCommentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.UserComment.push(action.payload);
      })
      .addCase(FetchCommentAsync.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(FetchCommentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.UserComment = action.payload;
      });
  },
});

export default BrowserSlice.reducer;
export const BrowserUserSelector = (state) => state.Browser.BrowserData;
export const UserCommentsSelector = (state) => state.Browser.UserComment;
