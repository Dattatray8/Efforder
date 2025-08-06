import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";

export const ProductDataContext = createContext();

function ProductContext({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const [orders, setOrders] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(serverUrl + "/api/products/getProducts");
      console.log(res);
      if (res.data.success) {
        setProducts(res.data.products || []);
      } else {
        setError(res.data.message || "Failed to fetch products");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      await axios
        .get(serverUrl + "/api/order/allOrders", {
          withCredentials: true,
        })
        .then((e) => {
          setOrders(e.data.orders);
        });
    } catch (error) {
      console.error("Error in order Fetching: ", error);
    }
  };

  let value = {
    products,
    loading,
    error,
    fetchProducts,
    fetchOrders,
    orders
  };
  return (
    <ProductDataContext.Provider value={value}>
      {children}
    </ProductDataContext.Provider>
  );
}

export default ProductContext;
