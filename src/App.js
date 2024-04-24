import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Featuers/Pages/Home";
import LoginPage from "./Featuers/Pages/LoginPage";
import SignupPage from "./Featuers/Pages/SignupPage";
import CartPage from "./Featuers/Pages/CartPage";
import ProductDetails from "./Featuers/Products/Components/ProductDetails";

import ErrorPage from "./Featuers/Pages/404";
import ProductList from "./Featuers/Products/Components/ProductList";
import Protected from "./Featuers/auth/Components/Protected";

import { useDispatch, useSelector } from "react-redux";
import { UserCartItemAsync } from "./Featuers/Cart/CartSlice";
import { UserSelector } from "./Featuers/auth/AuthSlice";
import { FetchHistoryAsync } from "./Featuers/Browser/BrowserSlice";
import {
  AllProductsAsync,

  fetchProductServecesAsync,
} from "./Featuers/Products/ProductsSlice";
import CheckOut from "./Featuers/Pages/CheckOut";
import Order from "./Featuers/Order/Components/Order";
import ProfilePage from "./Featuers/Pages/UserpfoilePage";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/Signup",
    element: <SignupPage />,
  },
  {
    path: "/Cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/:catoryName/:id",
    element: (
      <Protected>
        <ProductDetails />
      </Protected>
    ),
  },
  {
    path: "/:catoryName",
    element: (
      <Protected>
        <ProductList />
      </Protected>
    ),
  },
  {
    path: "/Order",
    element: (
      <Protected>
        <Order />
      </Protected>
    ),
  },
  {
    path: "/Profile",
    element: (
      <Protected>
        <ProfilePage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/CheckOutpage",

    element: (
      <Protected>
        <CheckOut />
      </Protected>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(UserSelector);

  useEffect(() => {
    if (user) {
      dispatch(UserCartItemAsync(user.data._id));
      dispatch(FetchHistoryAsync(user.data._id));
      dispatch(fetchProductServecesAsync());
      dispatch(AllProductsAsync());
      
    }
  }, [dispatch, user]);
  return (
    <div className=" ">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
