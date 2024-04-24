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
    <div className="Catogrery  pt-5 Image w-full h-40 bg-white flex justify-between  space-x-7  snap-x items-center pl-4 overflow-x-auto overflow-y-hidden">
      {ServiceCatagries &&
        ServiceCatagries.map((data) => (
          <div
            key={data._id}
            className="Frame5 w-14 h-20 flex-col justify-start items-center snap-center  inline-flex"
          >
            <img className="Rectangle4 w-14 h-16" src={data.ImageSrc} alt="" />
            <div className="Grocary text-black text-sm font-normal font-['Inder']">
              {data.title}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductCatogery;
