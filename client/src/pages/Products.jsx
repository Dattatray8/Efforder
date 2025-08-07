import { useContext, useEffect, useState } from "react";
import GetProductsViaCategory from "../utils/GetProductsViaCategory";
import ProductCard from "../components/ProductCard";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ProductDataContext } from "../context/ProductContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Products() {
  const { search } = useLocation();
  const cName = new URLSearchParams(search).get("name");
  const { products, fetchProducts, loading, error } =
    useContext(ProductDataContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!loading && products.length > 0 && cName) {
      const categoryProducts = GetProductsViaCategory(products, cName);
      setFilteredProducts(categoryProducts);
    } else if (!loading) {
      setFilteredProducts([]);
    }
  }, [products, cName, loading]);

  const handleRetry = () => {
    fetchProducts();
  };

  return (
    <div className="mt-20">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : (
        <div className="flex flex-col items-center w-full overflow-hidden bg-[#e6f0fe] min-h-screen">
          <div className="flex w-full px-[10%] sm:px-[6.5%] pt-8">
            <Link to={"/"}>
              <p className="text-gray-600 hover:text-blue-600 hover:underline">
                Home
              </p>
            </Link>
            <ChevronRight className="text-gray-600" />
            <Link to="/" state={{ scrollTo: "category-section" }}>
              <p className="text-gray-600 hover:text-blue-600 hover:underline">
                Category
              </p>
            </Link>
            <ChevronRight className="text-gray-600" />
            <p className="text-black font-bold">{cName}</p>
          </div>

          <div className="flex flex-wrap w-full justify-center items-center gap-5 p-8">
            {filteredProducts.length === 0 ? (
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
                  No products found in category:{" "}
                  <span className="font-semibold">{cName}</span>
                </p>
                <div className="space-y-2">
                  <button
                    onClick={handleRetry}
                    className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-2"
                  >
                    Refresh
                  </button>
                  <Link
                    to="/"
                    className="inline-block cursor-pointer bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              filteredProducts.map((item) => (
                <ProductCard key={item._id} data={item} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
