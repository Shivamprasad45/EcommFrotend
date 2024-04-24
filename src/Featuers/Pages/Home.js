import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";

import { useSelector, useDispatch } from "react-redux";
import { BrowserUserSelector } from "../Browser/BrowserSlice";
import { Link } from "react-router-dom";
import AllProductDATA from "../Products/Components/AllProducts";
// import { ClearSearch } from "../Products/ProductsSlice";

const Home = () => {
  const UserHisSelector = useSelector(BrowserUserSelector);
  const RecentlyVied = [...UserHisSelector];
  RecentlyVied.reverse();
  return (
    <div>
      <Navbar />

      {RecentlyVied.length > 0 && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Recently view product</h1>

          <div className="Catogrery overflow-x-auto  max-w-screen-lg mx-auto scroll">
            <div className="flex flex-row space-x-4">
              {RecentlyVied.map((data) => (
                <Link
                  to={`${data.brand} /${data.Id}`}
                  key={data._id}
                  className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4"
                >
                  <img
                    src={data.thumbnail}
                    className="w-full h-32 object-cover mb-4"
                    alt={data.title}
                  />

                  <p className="text-lg font-semibold">{data.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <h1 className="font-['inter'] text-2xl ml-5 mt-10 text-gray-600 hover:text-gray-800">
        Top products
      </h1>
      <AllProductDATA />
    </div>
  );
};

export default Home;
