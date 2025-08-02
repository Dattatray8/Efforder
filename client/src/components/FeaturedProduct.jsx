import { useContext, useEffect, useState } from "react";
import GetRandomProducts from "../utils/GetRandomProducts";
import ProductCard from "./ProductCard";
import { ProductDataContext } from "../context/ProductContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

function FeaturedProduct({ title }) {
  const { products, loading, error, fetchProducts } =
    useContext(ProductDataContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      setFeaturedProducts(GetRandomProducts(products, 4));
    }
  }, [products, loading]);

  const handleRetry = () => {
    fetchProducts();
  };

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

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : featuredProducts.length > 0 ? (
          <div className="flex justify-center items-center flex-wrap h-auto sm:gap-10 gap-5">
            {featuredProducts.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m0 0V4a2 2 0 012-2h10a2 2 0 012 2v1M9 7h6v6H9V7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-4">
              There are no products available at the moment.
            </p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedProduct;
