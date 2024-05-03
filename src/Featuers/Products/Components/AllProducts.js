import React from "react";
import { useSelector } from "react-redux";
import { ProductsData } from "../ProductsSlice";
import { Link } from "react-router-dom";

const AllProductDATA = () => {
  const ProductsDATA = useSelector(ProductsData);

  return (
    <div className="cursor-pointer  mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6 ">
      {ProductsDATA &&
        ProductsDATA.map((item) => (
          <div class="w-40 md:w-52 lg:w-72  bg-white shadow-md rounded-xl  mx-auto duration-500 hover:scale-105 hover:shadow-xl">
            <Link to={`${item.category}`}>
              <img
                src={item.thumbnail}
                alt="Product"
                class="h-50  w-40 md:w-52 lg:w-72 sm:h-56 sm:w-48   md:h-60 object-cover rounded-t-xl items-center"
              />
              <div class="px-4 py-3 w-40">
                <span class="text-gray-400 mr-3 uppercase text-xs">
                  {item.brand}
                </span>
                <p class="text-sm md:text-lg font-bold text-black truncate block capitalize">
                  {item.title}
                </p>
                <div class="flex items-center">
                  <p class="text-lg font-semibold text-black cursor-auto my-3">
                    ${item.price}
                  </p>
                  <del>
                    <p class="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                  </del>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AllProductDATA;
