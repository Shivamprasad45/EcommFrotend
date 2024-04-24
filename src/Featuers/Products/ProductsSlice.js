import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AllProducts,
  ProductDetails,
  SearchProducts,
  fetchProductServices,
  fetchServicesList,
} from "./ProductsAPI";

const initialState = {
  ServicesProviderCatogry: [],
  ServicesProviderList: [],
  ServicesProviderDetails: null,
  AllProductsData: [],
  SearchData: [],
  status: "",
};

export const fetchProductServecesAsync = createAsyncThunk(
  "user/fetchProductServeces",
  async () => {
    try {
      const response = fetchProductServices();
      // console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchtServecesListAsync = createAsyncThunk(
  "user/fetchServicesList",
  async (catoryName) => {
    try {
      const response = fetchServicesList(catoryName);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const fetchtSearchProductsAsync = createAsyncThunk(
  "user/SearchProducts",
  async (SearchData) => {
    try {
      const response = SearchProducts(SearchData);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const AllProductsAsync = createAsyncThunk(
  "user/AllProducts",
  async () => {
    try {
      const response = AllProducts();

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const ProductDetailsAsync = createAsyncThunk(
  "user/ProductDetails",
  async (id) => {
    try {
      const response = ProductDetails(id);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
const ServicesSlice = createSlice({
  name: "Service",
  initialState,
  reducers: {
    ClearSearch: (state, action) => {
      state.AllProductsData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductServecesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductServecesAsync.fulfilled, (state, action) => {
        // console.log("Fulfilled Action Payload:", action.payload);

        state.ServicesProviderCatogry = action.payload;
        state.status = "fulfield";
      })
      .addCase(fetchtServecesListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchtServecesListAsync.fulfilled, (state, action) => {
        // console.log("Fulfilled Action Payload:", action.payload);

        state.ServicesProviderList = action.payload;
        state.status = "fulfield";
      })
      .addCase(ProductDetailsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ProductDetailsAsync.fulfilled, (state, action) => {
        state.ServicesProviderDetails = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchtSearchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchtSearchProductsAsync.fulfilled, (state, action) => {
        state.SearchData = action.payload;
        state.status = "fulfilled";
      })
      .addCase(AllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AllProductsAsync.fulfilled, (state, action) => {
        state.AllProductsData = action.payload;
        state.status = "fulfilled";
      });
  },
});

export const ServiceProvideCatogry = (state) =>
  state.products.ServicesProviderCatogry;
export const ServiceProvideList = (state) =>
  state.products.ServicesProviderList;
export const ServiceDetails = (state) => state.products.ServicesProviderDetails;
export const SearchDATA = (state) => state.products.SearchData;
export const ProductsData = (state) => state.products.AllProductsData;
export const { ClearSearch } = ServicesSlice.actions;
export default ServicesSlice.reducer;
