import { useContext, useEffect, useState } from "react";
import SearchProduct from "../utils/SearchProduct";
import { useLocation } from "react-router-dom";
import { ProductDataContext } from "../context/ProductContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ProductCard from "../components/ProductCard";

function Search() {
  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search).get("q");
  const { products, fetchProducts, loading, error } =
    useContext(ProductDataContext);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!loading && products.length > 0 && searchQuery) {
      const results = SearchProduct(products, searchQuery);
      setSearchResults(results);
    } else if (!loading) {
      setSearchResults([]);
    }
  }, [products, searchQuery, loading]);

  const handleRetry = () => fetchProducts();

  if (loading)
    return (
      <div className="mt-20">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="mt-20">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );

  return (
    <div className="mt-20 bg-[#e6f0fe] min-h-screen">
      <div className="px-[5%] py-8">
        <h1 className="text-2xl font-bold mb-6">
          Search Results for:{" "}
          <span className="text-blue-600">"{searchQuery}"</span>
        </h1>

        {searchResults.length === 0 ? (
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600 mb-4">
              No products found for "
              <span className="font-semibold">{searchQuery}</span>"
            </p>
            <div className="space-y-2">
              <button
                onClick={handleRetry}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
              >
                Refresh
              </button>
              <a
                href="/"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Back to Home
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5">
            {searchResults.map((item) => (
              <ProductCard key={item._id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
