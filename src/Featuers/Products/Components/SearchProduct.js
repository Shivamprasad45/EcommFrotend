import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchDATA, fetchtSearchProductsAsync } from "../ProductsSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const SearchProduct = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector(SearchDATA);

  const handleSearch = (data) => {
    dispatch(fetchtSearchProductsAsync(data));
  };

  return (
    <div className="">
      <div className="Group1 lg:w-96 lg:h-14 md:h-12 h-10 md:w-56 w-36   relative">
        <input
          placeholder="Search your Products"
          onChange={(e) => handleSearch(e.target.value)}
          className="Rectangle2 lg:w-96 lg:h-14 md:h-12 h-10 md:w-56 w-36  pl-8  md:pl-14 lg:pl-28 bg-blue-50 rounded-lg"
        />

        <div className="IcBaselineSearch w-8 h-10   left-[0px] top-[1px] md:top-2  md:left-2 absolute justify-center items-center inline-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="sm:w-5 sm:h-4  w-8 h-7 md:w-14 md:h-14"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            />
          </svg>
        </div>
      </div>

      <motion.div
        className="absolute mt-0  bg-transparent border-gray-300 rounded-lg lg:w-96 lg:h-14 md:h-12 h-10 md:w-56 w-36  shadow-lg z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {searchResults &&
          searchResults.map((product) => (
            <motion.div
              key={product._id}
              className="flex justify-between transition delay-100 duration-300 ease-in-out rounded-sm lg:w-96 lg:h-14 md:h-12 h-10 md:w-56 w-36  bg-neutral-100 hover:bg-blue-100"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={`${product.brand}/${product.id}`}
                className="flex justify-start"
              >
                <div className="lg:w-96 lg:h-14 md:h-12 h-10 md:w-56 w-36  justify-start items-center gap-16 inline-flex">
                  <img
                    className=" w-10 h-7 "
                    src={product.thumbnail}
                    alt="ddf"
                  />
                  <div className=" text-black text-[8px]  md:text-[16px] font-normal font-['Khula']">
                    {product.title}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default SearchProduct;
