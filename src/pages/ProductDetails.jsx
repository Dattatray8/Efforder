import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../data/Products";
import GetProduct from "../utils/GetProduct";
import FeaturedProduct from "../components/FeaturedProduct";

function ProductDetails() {
  const { pId } = useParams();
  const [product, setProduct] = useState("loading...");
  useEffect(() => {
    setProduct(GetProduct(Products, pId));
  }, [pId]);

  return (
    <div className="mt-20 w-full overflow-hidden">
      <div className="w-full flex min-h-[90vh] flex-col md:flex-row gap-5 md:gap-0">
        <div className="md:w-1/2 w-full p-[2%] flex self-center relative">
          <p className="absolute lg:top-10 lg:left-10 md:left-10 top-3 left-3 bg-[#ef4444] text-white font-semibold px-2 py-[0.1rem] rounded-full">
            {product.discount}% OFF
          </p>
          <img
            src={product.image}
            alt="Product image"
            className="w-full h-full p-[5%]"
          />
        </div>
        <div className="md:w-1/2 w-full py-[2%] px-[4%] flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-4xl font-bold">{product.name}</p>
            <div className="flex w-full gap-8">
              <p className="text-gray-500">({product.reviewsCount} reviews)</p>
              <p className="font-medium text-green-600">
                In stock ({product.stock} available)
              </p>
            </div>
          </div>
          <div className="flex items-end gap-4">
            <p className="font-bold text-4xl">₹{product.price}</p>
            <strike className="text-gray-500 text-2xl">
              ₹{product.oldPrice}
            </strike>
          </div>
          <hr />
          <div>
            <p className="text-[1.1em] text-gray-700">{product.description}</p>
          </div>
          <div>
            <ul
              style={{ listStyleType: "disc" }}
              className="pl-[1.5em] text-gray-700"
            >
              {product?.features?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <hr />
        </div>
      </div>
      <div>
        <FeaturedProduct title={"You May Also Like"} />
      </div>
    </div>
  );
}

export default ProductDetails;