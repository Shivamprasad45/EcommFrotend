import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchOrder, OrderApi } from "./OrderApi";

const initialState = {
  UserOrder: [],
};

export const OrderDataAsync = createAsyncThunk(
  "user/OrderApi",
  async (Orderdata) => {
    try {
      const response = OrderApi(Orderdata);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const FetchOrderDataAsync = createAsyncThunk(
  "user/FetchOrder",
  async (Id) => {
    try {
      const response = FetchOrder(Id);
      
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OrderDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(OrderDataAsync.fulfilled, (state, action) => {
        console.log("Fulfilled Action Payload:", action.payload);
        state.UserOrder.push(action.payload);
        state.status = "fulfilled";
      })
      .addCase(FetchOrderDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchOrderDataAsync.fulfilled, (state, action) => {
        console.log("Fulfilled Action Payload:", action.payload);
        state.UserOrder = action.payload;
        state.status = "fulfilled";
      });
  },
});

export default OrderSlice.reducer;
export const UserOrderSelector = (state) => state.Order.UserOrder;
