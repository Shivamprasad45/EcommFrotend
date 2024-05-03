import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ServiceProvideCatogry,
  fetchProductServecesAsync,
} from "../ProductsSlice";

const ProductCatogery = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductServecesAsync());
  }, [dispatch]);

  const ServiceCatagries = useSelector(ServiceProvideCatogry);

  return (
    <div className="Catogrery   Image w-full h-28 md:h-40 bg-white flex justify-between  space-x-7  snap-x items-center pl-4 overflow-x-auto ">
      {ServiceCatagries &&
        ServiceCatagries.map((data) => (
          <Link to={`/${data.title}`}>
            <div
              key={data._id}
              className="Frame5 w-14 h-20 flex-col justify-start cursor-pointer items-center snap-center  inline-flex"
            >
              <img
                className="Rectangle4 w-10 h-10 md:w-16 md:h-16"
                src={data.ImageSrc}
                alt=""
              />
              <div className="Grocary text-black text-sm font-normal font-['Inder']">
                {data.title}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ProductCatogery;
