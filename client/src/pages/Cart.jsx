import { authDataContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { ProductDataContext } from "../context/ProductContext";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

function Cart() {
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const { getCart, cartData, loading, error } = useContext(ProductDataContext);

  const navigation = useNavigate();

  // Fetch cart only if user is logged in
  useEffect(() => {
    if (userData?._id) {
      getCart();
    }
  }, [userData]);

  // Update cart quantity or remove
  const updateCart = async (id, quantity) => {
    try {
      const res = await axios.post(
        serverUrl + "/api/cart/updateCart",
        { productId: id, quantity },
        { withCredentials: true }
      );
      if (res.data.success) {
        await getCart();
      } else {
        console.error(res.data.message || "Failed to update cart");
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // Calculate subtotal
  const Price =
    cartData.length > 0
      ? cartData.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        )
      : 0;

  // --- UI RENDER CONDITIONS ---
  // 1️⃣ User Not Logged In
  if (!userData || !userData._id) {
    return (
      <div className="mt-24 flex flex-col p-8 justify-center items-center gap-4">
        <ShoppingBag className="text-gray-400 w-20 h-20" />
        <p className="font-semibold text-xl">Please login to view your cart</p>

        <button
          onClick={() => navigation("/signin")}
          className="bg-black text-white py-2 px-6 rounded-md hover:bg-[#000000cc] transition-all font-semibold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // 2️⃣ Loading Spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // 3️⃣ Error Message (only when user is logged in)
  if (error) {
    return <ErrorMessage message={error} onRetry={getCart} />;
  }

  return (
    <div className="mt-20 bg-[#e6f0fe] flex lg:flex-row flex-col justify-center lg:items-center">
      {/* CART SECTION */}
      <div className="flex flex-col p-4 gap-3 lg:w-[70%]">
        <p className="text-3xl font-semibold pl-4">Shopping Cart</p>

        {/* CART ITEMS */}
        {cartData.length > 0 ? (
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
                  <div className="flex flex-col gap-2 p-2">
                    <p className="font-semibold text-xl">{item.product.name}</p>
                    <p className="text-gray-400">₹{item.product.price} each</p>

                    {/* QUANTITY */}
                    <div className="flex border-gray-300 border rounded-md w-fit">
                      <button
                        className={`px-4 py-2 ${
                          item.quantity > 1
                            ? "hover:bg-gray-100 cursor-pointer"
                            : "cursor-not-allowed opacity-50"
                        }`}
                        onClick={() =>
                          item.quantity > 1 &&
                          updateCart(item.product._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <p className="py-2 px-4 border-l border-r border-gray-300">
                        {item.quantity}
                      </p>

                      <button
                        className="cursor-pointer hover:bg-gray-100 py-2 px-4"
                        onClick={() =>
                          item.quantity < item.product.stock &&
                          updateCart(item.product._id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* REMOVE */}
                <div
                  className="flex flex-col justify-between py-4 items-center cursor-pointer"
                  onClick={() => updateCart(item.product._id, 0)}
                >
                  <Trash2 className="text-red-500 hover:scale-105 transition-all" />
                  <p className="font-semibold pr-8">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // EMPTY CART
          <div className="flex flex-col items-center gap-4 mt-3">
            <ShoppingBag className="text-gray-400 w-22 h-22" />
            <p className="font-semibold">Your cart is empty</p>
          </div>
        )}

        {/* SHOP BUTTON */}
        <div className="px-4 self-center">
          <button
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-[#000000cc] font-semibold"
            onClick={() => navigation("/")}
          >
            {cartData.length > 0 ? "Continue Shopping" : "Start Shopping"}
          </button>
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="flex lg:mt-8 lg:mr-8 m-8 py-4 px-8 border border-gray-300 rounded-lg bg-gray-50 lg:w-[30%] h-fit flex-col gap-4">
        <p className="text-2xl font-semibold">Order Summary</p>

        <div className="flex justify-between">
          <p className="text-gray-500">Subtotal</p>
          <p>{Price > 0 ? "₹" + Price : "-"}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">Shipping</p>
          <p>{Price > 0 ? "₹" + (Price < 500 ? 50 : 0) : "-"}</p>
        </div>

        <div className="border-b border-gray-300"></div>

        <div className="flex justify-between">
          <p className="font-semibold text-lg">Total</p>
          <p className="font-semibold text-lg">
            {Price > 0 ? "₹" + (Price + (Price < 500 ? 50 : 0)) : "-"}
          </p>
        </div>

        <div
          className="flex justify-center items-center gap-2 bg-black text-white py-2 rounded-md hover:bg-[#000000cc] transition-colors cursor-pointer"
          onClick={() => {
            if (Price > 0) navigation("/checkout");
          }}
        >
          <button>Proceed to Checkout</button>
          <ArrowRight className="w-[1.25rem] h-[1.25rem]" />
        </div>
      </div>
    </div>
  );
}

export default Cart;
