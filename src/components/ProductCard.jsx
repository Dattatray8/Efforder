import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

AOS.init();

function ProductCard(item) {
  const [hover, setHover] = useState(false);
  item = item.data;
  const navigation = useNavigate();
  return (
    <div
      className="bg-white relative sm:w-[20em] sm:h-[18em] w-[17rem] h-[14rem] flex-shrink-0 flex flex-col justify-center items-center transition cursor-pointer rounded-lg hover:shadow-xl my-2"
      key={item.id}
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-once="true"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => {
        navigation(`/products/category/${item.category}/${item.productId}`);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <p className="absolute top-2 left-2 bg-[#ef4444] text-white font-semibold px-2 py-[0.1rem] rounded-full text-[0.8rem]">
        {item.discount}% OFF
      </p>
      <img
        src={item.image}
        alt="Product Image"
        className="w-[50%] h-[50%] object-contain"
      />
      {hover && (
        <div className="absolute flex justify-center items-center bg-gradient-to-t from-black/70 to-transparent w-full h-12 top-30 py-6 transition ease-in-out">
          <div className="flex py-1 gap-2 justify-center items-center px-18 rounded-md bg-white hover:bg-[#ffffffbe]">
            <ShoppingCart className="w-5" />
            <p className="font-semibold">Add to cart</p>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col justify-around items-start px-8 h-1/3  border-t-1 border-[#d7d7d7]">
        <p className="font-semibold text-lg">{item.name}</p>
        <div className="flex w-full gap-2 items-center">
          <p className="font-bold text-xl">₹{item.price}</p>
          <strike className="text-gray-500">₹{item.oldPrice}</strike>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
