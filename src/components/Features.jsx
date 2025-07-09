import { Clock, CreditCard, ShieldCheck, Truck } from "lucide-react";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function Features() {
  const Features = [
    {
      icon: <Truck />,
      title: "Free Shipping",
      subTitile: "On orders over ₹50",
    },
    {
      icon: <Clock />,
      title: "Same Day Dispatch",
      subTitile: "On orders before 3pm",
    },
    {
      icon: <CreditCard />,
      title: "Secure Payment",
      subTitile: "100% secure checkout",
    },
    {
      icon: <ShieldCheck />,
      title: "2-Year Warranty",
      subTitile: "On all products",
    },
  ];
  return (
    <div className="w-full bg-[#e6f0fe] flex justify-center items-center p-8 overflow-hidden">
      <div className="flex justify-center items-center flex-wrap w-[80%] gap-8">
        {Features.map((item, i) => (
          <div
            className="w-[15em] flex flex-col justify-center items-center gap-3"
            key={i}
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-once="true"
          >
            <div className="bg-[#e6e6e8] p-4 rounded-full">{item.icon}</div>
            <div className="text-center">
              <p className="font-semibold text-lg">{item.title}</p>
              <p className="text-[#00000090]">{item.subTitile}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;