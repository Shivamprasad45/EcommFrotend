import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProductDetailsAsync, ServiceDetails } from "../ProductsSlice";
import Loading from "../../Pages/Loading";
import {
  AllUserCartAddAsync,
  UpdateCartItemAsync,
  UserCartSlector,
} from "../../Cart/CartSlice";

import { UserSelector } from "../../auth/AuthSlice";
import {
  BrowserUserSelector,
  FetchCommentAsync,
  UserCommentAsync,
  UserCommentsSelector,
  UserHistoryAsync,
} from "../../Browser/BrowserSlice";
import { useForm } from "react-hook-form";
const ProductDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductDetailsAsync(id));
    dispatch(FetchCommentAsync(id));
  }, [dispatch, id]);
  const [ImageChangeset, setImageChange] = useState("");
  const ProductDelailes = useSelector(ServiceDetails);

  const UserHistBrowser = useSelector(BrowserUserSelector);

  //By name color generater
  function nameToNumber(name) {
    let number = "";
    for (let i = 0; i < name.length; i++) {
      number += name.charCodeAt(i);
    }
    console.log(number.slice(0, 2));

    const NameParts = number.slice(0, 2) + number.slice(3, 7);
    return "#" + parseInt(NameParts);
  }
  const User = useSelector(UserSelector);
  const Comments = useSelector(UserCommentsSelector);

  const UserCart = useSelector(UserCartSlector);
  //comment functions controllers

  const onSubmit = (data) => {
    dispatch(
      UserCommentAsync({
        Name: data.name,
        Comment: data.comment,
        ProductId: id,
      })
    );
  };
  useEffect(() => {
    let timer;
    // Check if ProductDelailes is defined before accessing its length property
    if (ProductDelailes && ProductDelailes.length > 0) {
      // Set a timer to dispatch the UserHistoryAsync action after a delay (e.g., 3000 milliseconds)'
      //Condition check for save data inside database

      timer = setTimeout(() => {
        const Abliable = UserHistBrowser.find(
          (item) =>
            item.user === User.data._id &&
            item.title === ProductDelailes[0].title
        );
        if (Abliable) {
        } else {
          dispatch(
            UserHistoryAsync({
              title: ProductDelailes[0].title,
              thumbnail: ProductDelailes[0].thumbnail,
              brand: ProductDelailes[0].brand,
              Id: id,
              user: User.data._id,
            })
          );
        }
      }, 3000); // Adjust the delay as needed
    }

    // Cleanup function to clear the timer when the component unmounts or when ProductDelailes changes
    return () => clearTimeout(timer);
  }, [dispatch, ProductDelailes, User.data._id]);
  //  Image array to change thambinel
  const ImageChange = (data) => {
    setImageChange(data);
  };

  const AddCart = (e) => {
    const ProductAlBuy = UserCart.find((data) => data.ProductId == id);

    //For incrise quantity of product
    if (ProductAlBuy) {
      dispatch(
        UpdateCartItemAsync({
          ...ProductAlBuy,
          Quantity: ProductAlBuy.Quantity + 1,
        })
      );
    } else {
      const newItem = {
        ...firstProduct,
        Quantity: 1,
        user: User.data._id,
        ProductId: id,
      };
      delete newItem["id"];
      dispatch(AllUserCartAddAsync(newItem));
    }
  };
  //Random comment color functions
  // function getRandomColorFromLetter(letter) {
  //   // Get the ASCII value of the letter
  //   const asciiValue = letter.charCodeAt(0);

  //   // Map the ASCII value to a color range
  //   const colorValue = Math.floor((asciiValue / 26) * 16777215);

  //   // Convert the color value to hexadecimal
  //   const hexColor = colorValue.toString(16);

  //   // Pad the hexadecimal color with zeros if necessary
  //   const paddedHexColor = hexColor.padStart(6, "0");
  //   console.log(paddedHexColor);
  //   return "#" + paddedHexColor;
  // }

  if (!ProductDelailes) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  if (ProductDelailes.length === 0) {
    return <div>No product details available</div>; // Handle case where no details are found
  }

  // console.log(ProductDelailes[0].price, "Product details");
  const firstProduct = ProductDelailes[0];
  return (
    <>
      {firstProduct ? (
        <div>
          <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
            <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4 md:w-1/2 ">
                  <div className="sticky top-0 z-50 overflow-hidden ">
                    <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                      <img
                        src={
                          ImageChangeset.length === 0
                            ? firstProduct.thumbnail
                            : ImageChangeset
                        }
                        alt={firstProduct.thumbnail}
                        className="object-cover w-[80vw] h-[70vh] "
                      />
                    </div>
                    <div className="flex-wrap hidden md:flex ">
                      {firstProduct?.images &&
                        firstProduct?.images.map((data) => (
                          <div className="w-1/2 p-2 sm:w-1/4">
                            <Link
                              href="#"
                              className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300"
                            >
                              <img
                                onClick={(e) => ImageChange(data)}
                                src={data}
                                alt=""
                                className="object-cover w-full lg:h-20"
                              />
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2 ">
                  <div className="lg:pl-20">
                    <div className="mb-8 ">
                      <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                        New
                      </span>
                      <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                        {firstProduct.title}
                      </h2>
                      <div className="flex items-center mb-6">
                        <ul className="flex mr-2">
                          <li>
                            <Link href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                            </Link>
                          </li>
                        </ul>
                        <p className="text-xs dark:text-gray-400 ">
                          ({Comments.length} customer reviews)
                        </p>
                      </div>
                      <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                        {firstProduct.description}
                      </p>
                      <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                        <span>{firstProduct.discountPercentage}</span>
                        <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                          {firstProduct.price}
                        </span>
                      </p>
                      <p className="text-green-600 dark:text-green-300 ">
                        {firstProduct.stock} in stock
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center -mx-4 ">
                      <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                        <button
                          className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                          onClick={(e) => AddCart(e)}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                        <button className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                          Add to wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex-1 items-center justify-center">
          <Loading />
        </div>
      )}

      <div className="border border-gray-300 p-4 rounded-lg max-w-xl mb-10 mx-auto mt-40">
        <h2 className="text-lg font-medium mb-2">Leave a comment</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" for="name">
              Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
              {...register("name", {
                required: "name is required",
              })}
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              for="comment"
            >
              Comment
            </label>
            <textarea
              rows="4"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
              id="comment"
              placeholder="Enter your comment"
              {...register("comment", {
                required: "comment is required",
              })}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center">
        {Comments.map((data, index) => (
          <div key={index} className="border p-4 mb-4 flex items-center">
            <div>
              <main className="flex text-center justify-between">
                <div
                  className="rounded-full flex w-5 h-5 justify-center text-white font-semibold items-center text-center  "
                  style={{ backgroundColor: nameToNumber(data.Name) }}
                >
                  {data.Name.slice(0, 1).toUpperCase()}
                </div>
                <p className="text-blue-500 font-normal text-[14px] mr-4">
                  {data.Name}
                </p>
              </main>
              <h1 className="text-gray-800 text-[12px] w-24 flex-wrap">
                {data.Comment}
              </h1>
            </div>
            <p className="text-gray-600 mb-10 text-[7px]">
              {new Date(data.Date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDetails;
