import React, { useEffect, useState } from "react";
import Products from "../data/Products";
import GetRandomProducts from "../utils/GetRandomProducts";

function FeaturedProduct() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    setFeaturedProducts(GetRandomProducts(Products, 4));
  }, []);
  return (
    <div className="bg-[#e6f0fe] max-w-screen flex justify-center items-center p-4 sm:p-8 min-w-screen">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <div className="font-semibold text-[2em] ml-[2.5%] self-start">
          Featured Products
        </div>
        <div className="flex justify-center items-center flex-wrap h-auto sm:gap-10 gap-5">
          {featuredProducts.map((item) => (
            <div
              className="bg-white sm:w-[20em] sm:h-[18em] w-[17rem] h-[14rem] flex-shrink-0 items-center flex flex-col gap-3 justify-around transition cursor-pointer rounded-xl hover:shadow-lg my-2"
              key={item.id}
            >
              <p></p>
              <img
                src={item.image}
                alt="Product Image"
                className="w-[50%] h-[50%] object-contain"
              />
              <div className="w-full flex flex-col justify-around items-start px-8 h-1/2">
                <p className="font-semibold text-lg">{item.name}</p>
                <div className="flex w-full gap-2 items-center">
                  <p className="font-bold text-xl">₹{item.price}</p>
                  <strike className="text-gray-500">₹{item.oldPrice}</strike>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
