import React, { useEffect, useState } from "react";
import data from "../data/Products";
import GetProductsViaCategory from "../utils/GetProductsViaCategory";
import ProductCard from "../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Products() {
  const { cName } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(GetProductsViaCategory(data, cName));
  }, [cName]);

  return (
    <div className="mt-20 flex flex-col justify-center items-center w-full overflow-hidden bg-[#e6f0fe]">
      <div className="flex w-full px-[10%] sm:px-[6.5%] pt-8 ">
        <Link to={"/"}>
          <p className="text-gray-600 hover:text-blue-600 hover:underline">
            Home
          </p>
        </Link>
        <ChevronRight className="text-gray-600"/>
        <Link to="/" state={{ scrollTo: "category-section" }}>
          <p className="text-gray-600 hover:text-blue-600 hover:underline">
            Category
          </p>
        </Link>
        <ChevronRight className="text-gray-600"/>
        <p className="text-black font-bold">{cName}</p>
      </div>
      <div className="flex flex-wrap w-full justify-center items-center gap-5 p-8">
        {products.length === 0 ? (
          <p className="font-semibold">
            No products found in this category: {cName}
          </p>
        ) : (
          products.map((item) => <ProductCard key={item.id} data={item} />)
        )}
      </div>
    </div>
  );
}

export default Products;