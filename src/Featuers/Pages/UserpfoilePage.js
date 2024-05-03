import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UserAddresedataRemoveAsync,
  UserDataUpdteAsync,
  UserSelector,
} from "../auth/AuthSlice";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const UserId = useSelector(UserSelector).data._id;
  const AllAddresses = useSelector(UserSelector).data.Addresses;
  console.log(AllAddresses, "AllAddresses    User");

  const userData = useSelector(UserSelector).data;
  const dispatch = useDispatch();
  const [showAddresses, setShowAddresses] = useState(false);
  const [index, setindex] = useState(null);
  const [Edit, setEdit] = useState("");

  const toggleShowAddresses = () => {
    setShowAddresses((prevShowAddresses) => !prevShowAddresses);
    setindex(null);
  };
  //Update User function

  const onSubmit = (data) => {
    const index = AllAddresses.findIndex((item) => item._id === Edit._id);

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
      UserId: UserId,

      Index: index,
    };

    dispatch(UserDataUpdteAsync(NewAddresses));

    reset();
  };
  const edit = (address) => {
    setindex(address._id);
    setEdit(address);
  };
  const Remove = (address) => {
    dispatch(
      UserAddresedataRemoveAsync({ Addresses: address, UserId: userData._id })
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 overflow-hidden">
      <h1 className="text-3xl font-bold mb-4">Profile Information</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div>
            <p className="text-lg font-semibold">User ID:</p>
            <p>{userData._id}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Email:</p>
            <p>{userData.email}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Password:</p>
            <p>{userData.password}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Addresses</h2>
        <button
          className="py-2 px-4 bg-indigo-600 text-white rounded-md mb-4"
          onClick={toggleShowAddresses}
        >
          {showAddresses ? "Hide Addresses" : "Show Addresses"}
        </button>
        {showAddresses &&
          userData.Addresses.map((address) => (
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 ">
              {index === address._id ? (
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
                        placeholder={Edit.email}
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
                          message: "CardHolder is required",
                        })}
                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder={Edit.CardHolder}
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
                          placeholder={edit.Card_Details}
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
                          message: "credit-expiry is required",
                        })}
                        className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder={`MM/YY ${edit.credit_expiry}`}
                      />
                      <input
                        type="text"
                        {...register("credit_cvc", {
                          message: "credit-cvc is required",
                        })}
                        className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder={`CVC ${edit.credit_cvc}`}
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
                            message: "billing-address is required",
                          })}
                          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder={`Street Address ${edit.billing_address}`}
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
                          message: "billing-state is required",
                        })}
                        value={edit.billing_state}
                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="State">State</option>
                      </select>
                      <input
                        type="text"
                        {...register("billing_zip", {
                          message: "billing-zip is required",
                        })}
                        className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder={edit.billing_zip}
                      />
                    </div>

                    {/* <!-- Total --> */}
                  </div>

                  <button
                    type="submit"
                    className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                  >
                    Update Addresses
                  </button>
                </form>
              ) : (
                index !== address._id && (
                  <div key={address._id} className="mb-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                        Address ID:
                      </p>
                      <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                        {address._id}
                      </p>
                      <div
                        className="cursor-pointer"
                        onClick={() => Remove(address)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="red"
                          className="w-6 h-6 icon"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div onClick={() => edit(address)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300"
                        >
                          <path
                            className="cursor-pointer"
                            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                          Email:
                        </p>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                          {address.email}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-6 ">
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                          Card Holder:
                        </p>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                          {address.CardHolder}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                          Card Details:
                        </p>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                          {address.Card_Details}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                          Credit Expiry:
                        </p>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                          {address.credit_expiry}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                          Credit CVC:
                        </p>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                          {address.credit_cvc}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                          Billing Address:
                        </p>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                          {address.billing_address}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                          Billing State:
                        </p>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                          {address.billing_state}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">
                          Billing ZIP:
                        </p>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl">
                          {address.billing_zip}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;
