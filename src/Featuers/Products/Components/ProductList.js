import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ServiceProvideList, fetchtServecesListAsync } from "../ProductsSlice";

const ProductList = () => {
  const ProductList = useSelector(ServiceProvideList);
  const { catoryName } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchtServecesListAsync(catoryName));
  }, [dispatch, catoryName]);

  return (
    <div className="cursor-pointer mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8   ">
      {ProductList.map((data) => (
        <div
          key={data.id}
          className=" mx-auto mt-11 w-40  md:w-60 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Link to={`/${catoryName}/${data.id}`}>
            <img
              className="h-48 w-40 md:w-60 object-cover object-center"
              src={data.thumbnail}
              alt={data.thumbnail}
            />
            <div className="p-4">
              <h2 className="mb-1 text-sm md:text-lg font-medium dark:text-white text-gray-900">
                {data.title}
              </h2>
              <p className="mb-2 text-[10px] md:text-sm dark:text-gray-300 text-gray-700">
                {data.description}
              </p>
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                  ${data.price}
                </p>
                <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                  $25.00
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
