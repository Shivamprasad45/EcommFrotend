import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CartDataById, RemoveProduct, UpdateCartId, UserCart } from "./CartAPI";

const initialState = {
  UserCartData: [],
  status: "",
};

export const AllUserCartAddAsync = createAsyncThunk(
  "user/UserCart",
  async (CartData) => {
    try {
      const response = UserCart(CartData);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const UserCartItemAsync = createAsyncThunk(
  "user/CartDataById",
  async (id) => {
    try {
      const response = CartDataById(id);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const RemoveCartItemAsync = createAsyncThunk(
  "user/RemoveProduct",
  async (id) => {
    try {
      const response = RemoveProduct(id);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const UpdateCartItemAsync = createAsyncThunk(
  "user/UpdateCartId",
  async (data) => {
    try {
      const response = UpdateCartId(data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    CleanCart: (state, action) => {
      state.UserCartData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AllUserCartAddAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AllUserCartAddAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.UserCartData.push(action.payload);
      })
      .addCase(UserCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UserCartItemAsync.fulfilled, (state, action) => {
        state.UserCartData = action.payload;
        state.status = "fulfield";
      })
      .addCase(RemoveCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RemoveCartItemAsync.fulfilled, (state, action) => {
        const RemoveItem = state.UserCartData.filter(
          (item) => item._id !== action.payload._id
        );
      

        state.UserCartData = RemoveItem;
        state.status = "fulfilled";
      })
      .addCase(UpdateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const index = state.UserCartData.findIndex(
          (item) => item._id === action.payload._id
        );

        state.UserCartData[index] = action.payload;
      });
  },
});

export default CartSlice.reducer;
export const UserCartSlector = (state) => state.Cart.UserCartData;
export const { CleanCart } = CartSlice.actions;
