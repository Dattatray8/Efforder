import React from "react";
import {
  Laptop,
  Smartphone,
  Headphones,
  Camera,
  Watch,
  Gamepad,
  Speaker,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

AOS.init();

function ShopviaCategory() {
  let navigation = useNavigate();

  const category = [
    {
      name: "Laptops",
      icon: <Laptop />,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      name: "Smartphones",
      icon: <Smartphone />,
      color: "bg-purple-50 text-purple-600",
    },
    { name: "Audio", icon: <Headphones />, color: "bg-red-50 text-red-600" },
    {
      name: "Cameras",
      icon: <Camera />,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      name: "Wearables",
      icon: <Watch />,
      color: "bg-pink-50 text-pink-600",
    },
    { name: "Gaming", icon: <Gamepad />, color: "bg-green-50 text-green-600" },
    {
      name: "Speakers",
      icon: <Speaker />,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div
      className="bg-[#e6f0fe] max-w-screen p-8 flex flex-col justify-center items-center gap-8 overflow-hidden"
      id="category-section"
    >
      <div
        className="self-start flex w-[80%] pl-[10%] font-semibold text-3xl"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-once="true"
      >
        Shop By Category
      </div>
      <div className="w-[80%] flex flex-wrap gap-12 justify-center items-center">
        {category.map((item, i) => (
          <div
            className={`${item.color} + w-[15em] h-[10em] flex justify-center items-center flex-col gap-2 rounded-xl hover:scale-110 hover:shadow-md transition`}
            key={i}
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-once="true"
            onClick={() => {
              navigation(`/products/category/${item.name}`);
            }}
          >
            <div className="scale-125">{item.icon}</div>
            <p className="font-semibold">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopviaCategory;