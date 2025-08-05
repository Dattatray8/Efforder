import { useContext, useEffect, useState } from "react";
import { authDataContext } from "../context/AuthContext";
import { ProductDataContext } from "../context/ProductContext";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Orders() {
  const { serverUrl } = useContext(authDataContext);
  const [orders, setOrders] = useState([]);
  const { loading, setLoading, error } = useContext(ProductDataContext);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      await axios
        .get(serverUrl + "/api/order/getUserOrders", { withCredentials: true })
        .then((e) => {
          console.log(e.data.orders);
          if (e.data.success) {
            setOrders(e.data.orders);
          } else {
            console.error(e.data.message || "Failed to fetch orders");
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="mt-20 bg-[#e6f0fe]">
      <div className="flex justify-center items-center flex-col py-4">
        <p className="font-semibold text-2xl">Your Orders</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 p-4">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              className="bg-white py-4 shadow-md rounded-lg w-full flex sm:flex-row flex-col gap-4 sm:justify-between px-10"
              key={index}
            >
              <div className="flex flex-col gap-1">
                {order.items.map((product, index) => (
                  <div key={index}>
                    <p className="font-semibold text-2xl">
                      {product.product.name}
                    </p>
                    <p className="font-semibold">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                ))}
                <p className="font-semibold text-gray-700">₹ {order.amount}</p>
                <p className="font-semibold text-gray-700">Date: {new Date(order.date).toLocaleString()}</p>
                <p className="font-semibold text-gray-700">Payment Method: {order.paymentMethod}</p>
              </div>
              <div className="flex flex-col justify-between gap-3">
                <p className="text-green-400 font-semibold text-lg">{order.status}</p>
                <button className="bg-black text-white hover:bg-[#000000cc] py-2 px-4 rounded-md">Track Order</button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
