import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ErrorSelector, UserSelector, UserSignUpAsync } from "../AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector(UserSelector);
  const error = useSelector(ErrorSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(
      UserSignUpAsync({
        email: data.email,
        password: data.password,
        Addresses: [],
      })
    );
  };
  return (
    <>
      {user && (
        <Navigate to="/" replace={true}>
          {" "}
        </Navigate>
      )}
      <section className=" font-poppins">
        <div className="flex items-center justify-center h-screen mx-auto max-w-7xl">
          <div className="flex-1">
            <div className="flex flex-wrap ">
              <div className="w-full py-6 bg-gray-100 shadow-md lg:py-7 lg:w-1/2 dark:bg-gray-900">
                <div className="max-w-md mx-auto">
                  <div className="px-4 my-7 ">
                    <div className="mb-7">
                      <span className="flex items-center justify-center w-20 h-20 mx-auto text-gray-900 bg-green-600 rounded-lg dark:bg-green-600 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="currentColor"
                          className="text-gray-200 bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <h2 className="mb-3 text-2xl font-bold text-center text-gray-800 dark:text-gray-400">
                      Signup your Account
                    </h2>
                    <p className="text-base text-center text-gray-500 mb-7 dark:text-gray-400">
                      Please fill your credentials
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                      <div className="mb-4">
                        <input
                          type="text"
                          {...register("email", {
                            required: "email is required",
                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message: "email not valid",
                            },
                          })}
                          className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                          placeholder="Your email"
                          required
                        />
                      </div>
                      <div className="relative flex items-center mb-4">
                        <input
                          {...register("password", {
                            required: "password is required",
                            pattern: {
                              value:
                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                              message: `- at least 8 characters\n
                          - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                          - Can contain special characters`,
                            },
                          })}
                          type="text"
                          className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                          placeholder=" password"
                          required
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          className="absolute right-0 mt-2 mr-3 i dark:text-gray-50"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                      </div>
                      <div>
                        <div className="relative flex items-center mb-4">
                          <input
                            type="password"
                            {...register("confirmPassword", {
                              required: "confirm password is required",
                              validate: (value, formValues) =>
                                value === formValues.password ||
                                "password not matching",
                            })}
                            className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                            placeholder="Repeat password"
                            required
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            className="absolute right-0 items-center mr-3 dark:text-gray-50"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                        </div>
                        {/* {errors.confirmPassword && (
                          <p className="text-red-500">
                            {errors.confirmPassword.message}
                          </p>
                        )} */}
                        {error && (
                          <p className="text-red-500"> {error.message}</p>
                        )}
                      </div>
                      <button
                        className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200 "
                        type="submit"
                      >
                        SIGNUP
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="relative items-center justify-center hidden w-full lg:flex lg:w-1/2 ">
                <div className="absolute inset-0 z-10 bg-gray-900 opacity-40"></div>
                <img
                  className="absolute inset-0 z-0 object-cover w-full h-full ml-auto"
                  src="https://images.pexels.com/photos/7321/sea-water-ocean-horizon.jpg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  alt="Im"
                />
                <div className="top-0 z-10 max-w-xl mx-auto mb-12 text-center ">
                  <h2 className="mb-4 text-4xl font-bold text-gray-100 dark:text-gray-300 ">
                    Welcome to our community and join with us
                  </h2>
                  <div className="max-w-lg mx-auto mb-6">
                    <p className="pt-6 font-medium text-gray-300 dark:text-gray-300">
                      lorem ipsum dor amet sidcuscd andih wkoidus iusoyions
                      hejitywa qopasation dummy text ipsum
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="inline-block px-6 py-2 font-medium bg-green-600 text-gray-50 dark:text-gray-300"
                  >
                    Join now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
