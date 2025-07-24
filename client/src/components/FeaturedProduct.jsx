import React, { useEffect, useState } from "react";
import Products from "../data/Products";
import GetRandomProducts from "../utils/GetRandomProducts";
import ProductCard from "./ProductCard";

function FeaturedProduct({title}) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    setFeaturedProducts(GetRandomProducts(Products, 4));
  }, []);
  return (
    <div
      className="bg-[#e6f0fe] max-w-screen flex justify-center items-center p-4 sm:p-8 min-w-screen"
      id="featured-products"
    >
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <div
          className="font-semibold text-[2em] ml-[2.5%] self-start"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-once="true"
        >
          {title}
        </div>
        <div className="flex justify-center items-center flex-wrap h-auto sm:gap-10 gap-5">
          {featuredProducts.map((item) => (
            <ProductCard data={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
