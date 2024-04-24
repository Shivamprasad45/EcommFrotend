import React from "react";
import { useSelector } from "react-redux";
import { ProductsData } from "../ProductsSlice";
import { Link } from "react-router-dom";

const AllProductDATA = () => {
  const ProductsDATA = useSelector(ProductsData);

  return (
    <div className="cursor-pointer  mt-6 grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
      {ProductsDATA &&
        ProductsDATA.map((item) => (
          <div class="w-72 bg-white shadow-md rounded-xl  mx-auto duration-500 hover:scale-105 hover:shadow-xl">
            <Link to={`${item.category}`}>
              <img
                src={item.thumbnail}
                alt="Product"
                class="h-72 w-60 sm:h-56 sm:w-48  md:w-56 md:h-60 object-cover rounded-t-xl items-center"
              />
              <div class="px-4 py-3 w-72">
                <span class="text-gray-400 mr-3 uppercase text-xs">
                  {item.brand}
                </span>
                <p class="text-lg font-bold text-black truncate block capitalize">
                  {item.title}
                </p>
                <div class="flex items-center">
                  <p class="text-lg font-semibold text-black cursor-auto my-3">
                    ${item.price}
                  </p>
                  <del>
                    <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                  </del>
                  <div class="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-bag-plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                      />
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AllProductDATA;
