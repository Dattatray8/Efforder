import { ArrowRight, ChevronLeft, Trash2 } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductDataContext } from "../context/ProductContext";

function Checkout() {
  const navigation = useNavigate();
  const { cartData } = useContext(ProductDataContext);
  let Price;
  if (cartData.length > 0) {
    Price = cartData.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }
  return (
    <div className="mt-20 bg-[#e6f0fe]">
      <div className="flex p-4 gap-3 items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigation(-1)}
        >
          <ChevronLeft className="hover:translate-x-[-2px] transition-transform" />
        </div>
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </div>
      <div className="flex lg:flex-row flex-col justify-center">
        <div className="my-4 mx-6 border border-gray-400 p-4 rounded-lg bg-white flex flex-col gap-6 lg:w-[70%]">
          <div>
            <p className="text-xl font-semibold">Shipping Information</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="First name"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
              />
              <input
                type="text"
                placeholder="Last name"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Email"
                className="border border-gray-400 py-2 px-4 rounded-lg w-full"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Street"
                className="border border-gray-400 py-2 px-4 rounded-lg w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="City"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
              />
              <input
                type="text"
                placeholder="State"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="Pincode"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
              />
              <input
                type="text"
                placeholder="Country"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Phone"
                className="border border-gray-400 py-2 px-4 rounded-lg w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex lg:mt-8 lg:mr-8 m-8 py-4 px-8 border border-gray-300 rounded-lg bg-gray-50 lg:w-[30%] h-fit flex-col gap-4">
          <p className="text-2xl font-semibold">Order Summary</p>
          <div className="flex flex-col gap-2">
            {cartData.map((item, index) => (
              <div
                className="flex justify-between w-full border-gray-300 border rounded-lg py-2"
                key={index}
              >
                <div className="sm:flex p-2 gap-4">
                  <img
                    src={item.product.image}
                    alt="product image"
                    className="xl:w-30 xl:h-30 w-20 h-20 object-cover"
                  />
                  <div className="flex flex-col gap-2 p-2">
                    <p className="font-semibold text-lg xl:text-xl">
                      {item.product.name}
                    </p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                    <p className="font-semibold">₹{item.product.price} </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-b border-gray-300"></div>
          <div className="flex justify-between">
            <p className="text-gray-500">Subtotal</p>
            <p>{cartData.length > 0 ? "₹" + Price : "-"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Shipping</p>
            <p>{cartData.length > 0 ? "₹" + (Price < 500 ? 50 : 0) : "-"}</p>
          </div>
          <div className="border-b border-gray-300"></div>
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Total</p>
            <p className="font-semibold text-lg">
              {cartData.length > 0
                ? "₹" + (Price + (Price < 500 ? 50 : 0))
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
