import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const ProductDataContext = createContext();

function ProductContext({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { serverUrl } = useContext(authDataContext);
  let [cartItemsCount, setCartItemsCount] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(serverUrl + "/api/products/getProducts");
      console.log(res.data.products);

      if (res.data.success) {
        setProducts(res.data.products || []);
      } else {
        setError(res.data.message || "Failed to fetch products");
        console.log(res.data.message || "Failed to fetch products");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Error connecting to server");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCart = async () => {
    try {
      const res = await axios.post(
        serverUrl + "/api/cart/getCart",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res)
      if (res.data.success) {
        setCartItemsCount(Object.keys(res.data.cart).length);
      } else {
        console.error(res.data.message || "Failed to fetch cart");
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    getCart();
  }, [serverUrl, cartItemsCount]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
    };
    fetchData();
  }, [serverUrl]);

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    cartItemsCount,
    setCartItemsCount,
  };

  return (
    <ProductDataContext.Provider value={value}>
      {children}
    </ProductDataContext.Provider>
  );
}

export default ProductContext;
