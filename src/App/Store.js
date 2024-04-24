import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Featuers/Products/ProductsSlice";
import AuthReducer from "../Featuers/auth/AuthSlice";
import CartReducer from "../Featuers/Cart/CartSlice";
import BrowserSlice from "../Featuers/Browser/BrowserSlice";
import OrderSlice from "../Featuers/Order/OrderSlice";

export const Store = configureStore({
  reducer: {
    products: ProductReducer,
    Auths: AuthReducer,
    Cart: CartReducer,
    Browser: BrowserSlice,
    Order: OrderSlice,
  },
});
