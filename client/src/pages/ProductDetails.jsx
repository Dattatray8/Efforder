import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetProduct from "../utils/GetProduct";
import FeaturedProduct from "../components/FeaturedProduct";
import { RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { ProductDataContext } from "../context/ProductContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function ProductDetails() {
  const { pId } = useParams();
  const { products, fetchProducts, loading, error } =
    useContext(ProductDataContext);
  const [product, setProduct] = useState(null);
  const [productNotFound, setProductNotFound] = useState(false);
  const [productCount, setProductCount] = useState(1);

  useEffect(() => {
    if (!loading && products.length > 0 && pId) {
      const foundProduct = GetProduct(products, pId);
      if (foundProduct) {
        setProduct(foundProduct);
        setProductNotFound(false);
      } else {
        setProduct(null);
        setProductNotFound(true);
      }
    }
  }, [products, pId, loading]);

  const handleRetry = () => {
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="mt-20 w-full overflow-hidden">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 w-full overflow-hidden">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (productNotFound || !product) {
    return (
      <div className="mt-20 w-full overflow-hidden">
        <div className="text-center p-8 min-h-[50vh] flex flex-col justify-center items-center">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Product Not Found
          </h3>
          <p className="text-gray-600 mb-4">
            The product with ID "<span className="font-semibold">{pId}</span>"
            could not be found.
          </p>
          <div className="space-y-2">
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-2"
            >
              Refresh
            </button>
            <a
              href="/"
              className="inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 w-full overflow-hidden">
      <div className="w-full flex min-h-[90vh] flex-col md:flex-row gap-5 md:gap-0">
        <div className="md:w-1/2 w-full p-[2%] flex self-center relative">
          {product.discount && (
            <p className="absolute lg:top-10 lg:left-10 md:left-10 top-3 left-3 bg-[#ef4444] text-white font-semibold px-2 py-[0.1rem] rounded-full">
              {product.discount}% OFF
            </p>
          )}
          <img
            src={product.image}
            alt="Product image"
            className="w-full h-full p-[5%]"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
        </div>
        <div className="md:w-1/2 w-full py-[2%] px-[4%] flex flex-col gap-6 my-6">
          <div className="flex flex-col gap-1">
            <p className="text-4xl font-bold">{product.name}</p>
            <div className="flex w-full gap-8">
              <p className="text-gray-500">
                ({product.reviewCount || product.reviewsCount || 0} reviews)
              </p>
              <p className="font-medium text-green-600">
                In stock ({product.stock} available)
              </p>
            </div>
          </div>
          <div className="flex items-end gap-4">
            <p className="font-bold text-4xl">₹{product.price}</p>
            {product.oldPrice && (
              <strike className="text-gray-500 text-2xl">
                ₹{product.oldPrice}
              </strike>
            )}
          </div>
          <hr />
          <div>
            <p className="text-[1.1em] text-gray-700">{product.description}</p>
          </div>
          {product.features && product.features.length > 0 && (
            <div>
              <ul
                style={{ listStyleType: "disc" }}
                className="pl-[1.5em] text-gray-700"
              >
                {product.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <hr />
          <div className="flex w-full gap-4 items-center">
            <p className="font-medium">Quantity:</p>
            <div className="flex border-gray-300 border rounded-md">
              <button
                className={`px-4 py-2 ${
                  productCount > 1
                    ? "hover:bg-gray-100 cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                } rounded-md transition-colors`}
                onClick={() => {
                  if (productCount > 1) {
                    setProductCount((prev) => prev - 1);
                  }
                }}
                disabled={productCount <= 1}
              >
                -
              </button>
              <p className="py-2 px-4 border-l border-r border-gray-300">
                {productCount}
              </p>
              <button
                className="cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md transition-colors"
                onClick={() => {
                  if (productCount < product.stock) {
                    setProductCount((prev) => prev + 1);
                  }
                }}
                disabled={productCount >= product.stock}
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500">(Max: {product.stock})</p>
          </div>
          <button
            className="flex justify-center mx-[5%] w-[90%] bg-black text-white font-medium py-3 hover:bg-[#000000dd] transition rounded-md cursor-pointer"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to cart"}
          </button>
          <div className="flex flex-col sm:flex-row md:flex-col md:gap-4 lg:flex-row lg:gap-10 sm:gap-10 gap-2 justify-center mt-4">
            <div className="flex gap-2 items-center">
              <Truck className="text-gray-500 w-5 h-5" />
              <p>Free shipping over ₹50</p>
            </div>
            <div className="flex gap-2 items-center">
              <ShieldCheck className="text-gray-500 w-5 h-5" />
              <p>2-Year Warranty</p>
            </div>
            <div className="flex gap-2 items-center">
              <RefreshCcw className="text-gray-500 w-5 h-5" />
              <p>30-Day Returns</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <FeaturedProduct title={"You May Also Like"} />
      </div>
    </div>
  );
}

export default ProductDetails;
