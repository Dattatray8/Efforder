import { authDataContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { ProductDataContext } from "../context/ProductContext";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { serverUrl } = useContext(authDataContext);
  const { getCart, cartData, loading, error } = useContext(ProductDataContext);
  const navigation = useNavigate();
  const updateCart = async (id, quantity) => {
    try {
      const res = await axios.post(
        serverUrl + "/api/cart/updateCart",
        { productId: id, quantity },
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log(res.data.message);
        await getCart();
      } else {
        console.error(res.data.message || "Failed to update cart");
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };
  if (!loading) {
    console.log(cartData);
  }
  useEffect(() => {
    async function fetchCartData() {
      await getCart();
    }
    fetchCartData();
  }, []);
  const handleRetry = () => {
    getCart();
  };

  return (
    <div className="mt-20 bg-[#e6f0fe]">
      <div className="flex flex-col p-4 gap-3">
        <p className="text-3xl font-semibold pl-4">Shopping Cart</p>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : cartData.length > 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center p-4">
            {cartData.map((item, index) => (
              <div
                className="flex justify-between w-full bg-white border-gray-300 border rounded-lg py-2"
                key={index}
              >
                <div className="sm:flex p-2 gap-4">
                  <img
                    src={item.product.image}
                    alt="product image"
                    className="w-40 h-40 object-cover"
                  />
                  <div className="flex flex-col sm:justify-around gap-2 p-2">
                    <p className="font-semibold text-xl">{item.product.name}</p>
                    <p className="text-gray-400">₹{item.product.price} each</p>
                    <div className="flex border-gray-300 border rounded-md w-fit">
                      <button
                        className={`px-4 py-2 ${
                          item.quantity > 1
                            ? "hover:bg-gray-100 cursor-pointer"
                            : "cursor-not-allowed opacity-50"
                        } rounded-md transition-colors`}
                        onClick={() => {
                          if (item.quantity > 1) {
                            const newCount = item.quantity - 1;
                            updateCart(item.product._id, newCount);
                          }
                        }}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <p className="py-2 px-4 border-l border-r border-gray-300">
                        {item.quantity}
                      </p>

                      <button
                        className="cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md transition-colors"
                        onClick={() => {
                          if (item.quantity < item.product.stock) {
                            const newCount = item.quantity + 1;
                            updateCart(item.product._id, newCount);
                          }
                        }}
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-col justify-end gap-8 sm:gap-0 sm:justify-between py-4 items-center"
                  onClick={() => {
                    updateCart(item.product._id, 0);
                  }}
                >
                  <Trash2 className="text-red-500 cursor-pointer" />
                  <p className="font-semibold pr-8">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 mt-3">
            <ShoppingBag className="text-gray-400 w-22 h-22" />
            <p className="font-semibold">Your cart is empty</p>
          </div>
        )}
        <div className="px-4 self-center">
          <button
            className="bg-white items-start py-2 px-4 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-100 font-semibold"
            onClick={() => navigation("/")}
          >
            {cartData.length > 0 ? "Continue Shopping" : "Start Shopping"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
