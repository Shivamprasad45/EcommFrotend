import React, { useState } from "react";
import { CleanCart, UserCartSlector } from "../Cart/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { UserDataAsync, UserSelector } from "../auth/AuthSlice";
import { OrderDataAsync } from "../Order/OrderSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CheckOut = () => {
  const [Addressed, setAddress] = useState();
  const dispatch = useDispatch();
  const cartSelector = useSelector(UserCartSlector);
  const Address = useSelector(UserSelector).data.Addresses;
  const TotalAmount = cartSelector.reduce((accumulator, item) => {
    return accumulator + item.price * item.Quantity;
  }, 0);
  const Order = () => {
    // Assuming Addressed contains address details
    const NewOrder = {
      Add: Addressed, // Make sure Addressed is defined and contains address details
      UserId: cartSelector[0].user,
      Cart: cartSelector.map((item) => ({
        // Map cart items to include only necessary fields

        ProductId: item.ProductId,
        Quantity: item.Quantity,
        price: item.price,
        title: item.title,
        thumbnail: item.thumbnail,

        // Include other necessary fields from cart items
      })),
    };

    // Dispatch NewOrder to an async function for further processing
    dispatch(OrderDataAsync(NewOrder));
    dispatch(CleanCart());

    toast("Your Order conform");
  };

  const shipingcost = cartSelector.length * 3;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const NewAddresses = {
      Addresses: [
        {
          email: data.email,
          CardHolder: data.CardHolder,
          Card_Details: data.Card_Details,
          credit_expiry: data.credit_cvc,
          billing_address: data.billing_address,
          billing_state: data.billing_state,
          billing_zip: data.billing_zip,
        },
      ],
      UserId: cartSelector[0].user,
    };

    dispatch(UserDataAsync(NewAddresses));
    reset();
  };
  return (
    <div>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32 overflow-y-hidden">
        <p className="text-2xl font-bold text-gray-800">sneekpeeks</p>

        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </p>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                  2
                </p>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                  3
                </p>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartSelector.length === 0 && (
              <>
                <Link to="/Order">
                  <p className="text-xl font-semibold hover:text-red-500">
                    Your Order page
                  </p>
                </Link>
              </>
            )}
            {cartSelector &&
              cartSelector.map((data) => (
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={data.thumbnail}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{data.title}</span>
                    <span className="float-right text-gray-400">
                      Quantity {data.Quantity}
                    </span>
                    <p className="text-lg font-bold">${data.price}</p>
                  </div>
                </div>
              ))}
          </div>

          <p className="mt-8 text-lg font-medium">Choses addresses</p>
          <div className="mt-5 overflow-y-auto h-80">
            <form className="grid gap-6">
              {Address &&
                Address.map((data, index) => (
                  <div key={index}>
                    <label className="flex items-center space-x-2">
                      <input
                        onClick={() => setAddress(data)}
                        type="radio"
                        name="selectedAddress"
                        value={data.email}
                      />
                      <p>
                        {data.email.slice(0, 6) +
                          "......" +
                          data.email.slice(10, data.email.length)}
                        {data.email}
                      </p>
                    </label>
                  </div>
                ))}
            </form>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <label
                for="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
              <label
                for="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Holder
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="card-holder"
                  {...register("CardHolder", {
                    required: "CardHolder is required",
                  })}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>
              <label
                for="card-no"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Details
              </label>
              <div className="flex">
                <div className="relative w-7/12 flex-shrink-0">
                  <input
                    type="text"
                    id="card-no"
                    {...register("Card_Details", {
                      required: "Card_Details is required",
                    })}
                    className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  name="credit-expiry"
                  {...register("credit_expiry", {
                    required: "credit-expiry is required",
                  })}
                  className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
                <input
                  type="text"
                  {...register("credit_cvc", {
                    required: "credit-cvc is required",
                  })}
                  className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="CVC"
                />
              </div>
              <label
                for="billing-address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="billing-address"
                    {...register("billing_address", {
                      required: "billing-address is required",
                    })}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img
                      className="h-4 w-4 object-contain"
                      src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                      alt=""
                    />
                  </div>
                </div>
                <select
                  type="text"
                  {...register("billing_state", {
                    required: "billing-state is required",
                  })}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="State">State</option>
                </select>
                <input
                  type="text"
                  {...register("billing_zip", {
                    required: "billing-zip is required",
                  })}
                  className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ZIP"
                />
              </div>

              {/* <!-- Total --> */}
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">${TotalAmount}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">${shipingcost}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${TotalAmount + shipingcost}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            >
              Add Addresses
            </button>

            <button
              onClick={() => Order()}
              type="button"
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
