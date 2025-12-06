import { useContext, useEffect, useState } from "react";
import GetRandomProducts from "../utils/GetRandomProducts";
import ProductCard from "./ProductCard";
import { ProductDataContext } from "../context/ProductContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { toast } from "react-toastify";

function FeaturedProduct({ title }) {
  const { products, loading } = useContext(ProductDataContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      setFeaturedProducts(GetRandomProducts(products, 4));
    }
  }, [products, loading]);

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

        {loading && <LoadingSpinner />}
        {featuredProducts.length > 0 && !loading ? (
          <div className="flex justify-center items-center flex-wrap h-auto sm:gap-10 gap-5">
            {featuredProducts.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
          </div>
        ) : (
          !loading && <ErrorMessage message={"No products available"} />
        )}
      </div>
    </div>
  );
}

export default FeaturedProduct;
