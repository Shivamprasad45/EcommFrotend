import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RemoveCartItemAsync,
  UpdateCartItemAsync,
  UserCartSlector,
} from "../CartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const RemoverData = (e, cart) => {
    console.log(cart, "CartId");
    dispatch(RemoveCartItemAsync(cart));
  };
  const cartdata = useSelector(UserCartSlector);
  const cartdatabyId = cartdata;
  const TotalAmount = cartdatabyId.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);

  const shipingcost = cartdatabyId.length * 3;

  if (!cartdata) {
    return <div>....Loading</div>;
  }

  const incr = (cart) => {
    dispatch(UpdateCartItemAsync({ ...cart, Quantity: cart.Quantity + 1 }));
  };

  const Decr = (cart) => {
    if (cart.Quantity > 1) {
      dispatch(UpdateCartItemAsync({ ...cart, Quantity: cart.Quantity - 1 }));
    }
  };

  return (
    <div>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center  px-6 md:flex md:space-x-6 xl:px-0">
          <div
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=1388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
              backgroundRepeat: "no-repeat", // Optional: Adjust background repeat
              backgroundSize: "cover", // Optional: Adjust background size
              backgroundPosition: "center", // Optional: Adjust background position
              overflowY: "auto", // Add vertical scroll to overflow content
            }}
            className="rounded-lg md:w-2/3 h-60 "
          >
            {cartdatabyId ? (
              cartdatabyId.map((cart) => (
                <div
                  key={cart._id}
                  className="justify-between mb-6 rounded-lg bg-transparent p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={cart.thumbnail}
                    className="w-full rounded-lg sm:w-40 max-h-40" // Set max height for the images
                    alt={cart.thumbnail}
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {cart.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {cart.Quantity}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => Decr(cart)}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <p className="h-8 w-8 border bg-white text-center text-xs outline-none">
                          {cart.Quantity}
                        </p>
                        <span
                          onClick={() => incr(cart)}
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">{cart.price}</p>
                        <button onClick={(e) => RemoverData(e, cart._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5" // Corrected attribute name
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round" // Corrected attribute name
                              strokeLinejoin="round" // Corrected attribute name
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>

          {/* <!-- Sub total --> */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${TotalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">${shipingcost}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  ${TotalAmount + shipingcost} USD
                </p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              <Link to="/CheckOutpage">Check out</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
