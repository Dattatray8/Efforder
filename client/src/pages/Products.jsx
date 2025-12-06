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
      {filteredProducts.length === 0 ? (
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
            {filteredProducts.length !== 0 &&
              filteredProducts.map((item) => (
                <ProductCard key={item._id} data={item} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
