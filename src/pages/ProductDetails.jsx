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
    <div className="mt-20">
      <div>
        <div>{product.name}</div>
      </div>
      <div>
        <FeaturedProduct title={"You May Also Like"}/>
      </div>
    </div>
  );
}

export default ProductDetails;