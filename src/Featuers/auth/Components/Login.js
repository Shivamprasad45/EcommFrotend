import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ErrorSelector, UserLoginAsync, UserSelector } from "../AuthSlice";
const Login = () => {
  const error = useSelector(ErrorSelector);
  const user = useSelector(UserSelector);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(
      UserLoginAsync({
        email: data.email,
        password: data.password,
      })
    );
  };
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}

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
                      Login your Account
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
                      <div className=" flex items-center mb-4">
                        <input
                          {...register("password", {
                            required: "password is required",
                          })}
                          type="text"
                          className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                          placeholder=" password"
                          required
                        />
                        {error && (
                          <div className="text-xl text-red-700">
                            {error.message}
                          </div>
                        )}
                      </div>

                      <button
                        className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200 "
                        type="submit"
                      >
                        LOGIN
                      </button>
                    </form>
                    <main className="flex-row justify-between text-center ">
                      <div>
                        <Link to="/Signup">Create a a account</Link>
                      </div>
                      <div>
                        <Link to="/Signup">Forgot password </Link>
                      </div>
                    </main>
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

export default Login;
