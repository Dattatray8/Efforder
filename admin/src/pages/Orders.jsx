import { useContext, useEffect } from "react";
import { ProductDataContext } from "../context/ProductContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

function Orders() {
  const { fetchOrders, orders } = useContext(ProductDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { adminData } = useContext(userDataContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusHandler = async (e, orderId) => {
    try {
      await axios
        .post(
          serverUrl + "/api/order/updateStatus",
          { orderId, status: e.target.value },
          { withCredentials: true }
        )
        .then(async () => {
          await fetchOrders();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0fe] to-[#f0f8ff] p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {adminData ? "Order Management" : "Your Orders"}
          </h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
        </div>

        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Order Date:</span>{" "}
                            {formatDate(order.date)}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <p className="text-sm text-gray-600">
                            Total Amount:{" "}
                            <span className="font-semibold text-green-600 text-lg">
                              ₹{order.amount}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Payment Method:</span>
                            <span className="ml-1 font-semibold text-gray-900 capitalize">
                              {order.paymentMethod}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="font-medium">Payment Status:</span>
                            <span
                              className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border`}
                            >
                              {order.payment.toString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center lg:items-end">
                      <label className="text-sm font-medium text-gray-700 mb-2">
                        Order Status:
                      </label>
                      <select
                        className="border rounded p-2 text-sm"
                        value={order.status}
                        onChange={(e) => statusHandler(e, order._id)}
                      >
                        <option value={order.status}>{order.status}</option>
                        <option value="Order Packing">Order Packing</option>
                        <option value="Order Out for delivery">
                          Order Out for delivery
                        </option>
                        <option value="Order Shipped">Order Shipped</option>
                        <option value="Order Delivered">Order Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      Order Items ({order.items?.length || 0})
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {item.product?.name ||
                                item.name ||
                                "Product Name"}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <p className="text-sm text-gray-600">
                                Quantity:{" "}
                                <span className="font-medium">
                                  {item.quantity}
                                </span>
                              </p>
                              {item.price && (
                                <p className="text-sm text-gray-600">
                                  Price:{" "}
                                  <span className="font-medium">
                                    ₹{item.price}
                                  </span>
                                </p>
                              )}
                              {item.size && (
                                <p className="text-sm text-gray-600">
                                  Size:{" "}
                                  <span className="font-medium">
                                    {item.size}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="ml-4 text-right">
                            <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      Shipping Address
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {order.address.firstName} {order.address.lastName}
                          </p>
                          <p className="text-gray-700 text-sm mt-1">
                            {order.address.street}
                          </p>
                          <p className="text-gray-700 text-sm">
                            {order.address.city}, {order.address.state} -{" "}
                            {order.address.pincode}
                          </p>
                          <p className="text-gray-700 text-sm">
                            {order.address.country}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              Email:
                            </span>
                            <span className="text-sm text-gray-900 ml-2 break-all">
                              {order.address.email}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              Phone:
                            </span>
                            <span className="text-sm text-gray-900 ml-2">
                              {order.address.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
