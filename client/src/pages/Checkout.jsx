import { ChevronLeft } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductDataContext } from "../context/ProductContext";
import razorpay from "../assets/razorpay.png";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function Checkout() {
  const navigation = useNavigate();
  const { cartData } = useContext(ProductDataContext);
  let [method, setMethod] = useState("");
  const { serverUrl } = useContext(authDataContext);
  let Price;
  if (cartData.length > 0) {
    Price = cartData.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const emptyField = Object.entries(formData).find(
      ([key, val]) => val === ""
    );
    if (emptyField) {
      alert(`Fill the ${emptyField[0]} field`);
      return;
    }
    if (!method) {
      alert("Select a payment method");
      return;
    }
    let orderData = {
      address: formData,
      items: cartData,
      amount: Price + (Price < 500 ? 50 : 0),
    };

    switch (method) {
      case "COD":
        try {
          await axios
            .post(serverUrl + "/api/order/placeOrder", orderData, {
              withCredentials: true,
            })
            .then((e) => {
              console.log(e);
              navigation('/orders')
            });
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        break;
    }
  };

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
        <div className="my-4 mx-6 border border-gray-400 p-4 rounded-lg bg-white flex flex-col gap-6 lg:w-[70%] h-fit">
          <div>
            <p className="text-xl font-semibold">Shipping Information</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="First name"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
                name="firstName"
                value={formData.firstName}
                onChange={handleForm}
              />
              <input
                type="text"
                placeholder="Last name"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
                name="lastName"
                value={formData.lastName}
                onChange={handleForm}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Email"
                className="border border-gray-400 py-2 px-4 rounded-lg w-full"
                name="email"
                value={formData.email}
                onChange={handleForm}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Street"
                className="border border-gray-400 py-2 px-4 rounded-lg w-full"
                name="street"
                value={formData.street}
                onChange={handleForm}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="City"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
                name="city"
                value={formData.city}
                onChange={handleForm}
              />
              <input
                type="text"
                placeholder="State"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
                name="state"
                value={formData.state}
                onChange={handleForm}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder="Pincode"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
                name="pincode"
                value={formData.pincode}
                onChange={handleForm}
              />
              <input
                type="text"
                placeholder="Country"
                className="border border-gray-400 py-2 px-4 rounded-lg sm:w-1/2 w-full"
                name="country"
                value={formData.country}
                onChange={handleForm}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Phone"
                className="border border-gray-400 py-2 px-4 rounded-lg w-full"
                name="phone"
                value={formData.phone}
                onChange={handleForm}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-semibold">Payment Method</p>
            <div className="flex gap-4 max-[420px]:flex-col">
              <img
                src={razorpay}
                alt="razorpay logo"
                className={`w-40 max-[420px]:w-full object-contain max-[420px]:h-12 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
                  method === "Razorpay" ? "border-blue-500" : "border-gray-400"
                }`}
                onClick={() => setMethod("Razorpay")}
              />
              <button
                className={`border font-semibold hover:scale-105 rounded-lg py-2 px-4 cursor-pointer transition-all ${
                  method === "COD" ? "border-blue-500" : "border-gray-400"
                }`}
                onClick={() => setMethod("COD")}
              >
                Cash On Delivery
              </button>
            </div>
          </div>
          <div className="self-center">
            <button
              className="bg-black text-white items-start py-2 px-18 cursor-pointer border border-gray-300 rounded-md hover:bg-[#000000cc] font-semibold transition-all"
              onClick={handleSubmit}
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="flex lg:mt-8 lg:mr-8 m-6 py-4 px-8 border border-gray-300 rounded-lg bg-gray-50 lg:w-[30%] h-fit flex-col gap-4">
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
