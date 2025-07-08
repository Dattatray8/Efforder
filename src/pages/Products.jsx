import React, { useEffect, useState } from "react";
import data from "../data/Products";
import GetProductsViaCategory from "../utils/GetProductsViaCategory";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";

function Products() {
  const { cName } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(GetProductsViaCategory(data, cName));
  }, [cName]);
  return (
    <div className="mt-20 flex justify-center items-center w-full overflow-hidden bg-[#e6f0fe]">
      <div className="flex flex-wrap w-full justify-center items-center gap-5 p-8">
        {products.length === 0 ? (
          <p className="font-semibold">No products found in this category: {cName}</p>
        ) : (
          products.map((item) => <ProductCard key={item.id} data={item} />)
        )}
      </div>
    </div>
  );
}

export default Products;
