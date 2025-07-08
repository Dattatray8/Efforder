import React from "react";
import headphone from "../assets/slider/earbird.webp";
import monitor from "../assets/slider/monitor.webp";
import speaker from "../assets/slider/speaker.webp";
import watch from "../assets/slider/watch.webp";
import watch2 from "../assets/slider/watch2.webp";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

function Slider() {
  const sliderTabs = [
    { img: speaker, title: "Mobile Speakers", boldTxt: "From 499" },
    { img: headphone, title: "Wireless Headphones", boldTxt: "Grab Now" },
    { img: watch, title: "Fastrack Smartwatches", boldTxt: "From 1399" },
    { img: monitor, title: "Acer Monitor", boldTxt: "From 8000" },
    { img: watch2, title: "Noise Smartwatches", boldTxt: "From 1099" },
  ];
  return (
    <div className="bg-[#e6f0fe] max-w-screen p-8">
      <div className="bg-white flex flex-col rounded-lg">
        <div className="px-8 py-4">
          <p
            className="font-semibold text-[2em]"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-once="true"
          >
            Best of Electronics
          </p>
        </div>
        <div className="flex px-8 pb-16 pt-8 gap-20 justify-center items-center flex-wrap">
          {sliderTabs.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-once="true"
              className="flex flex-col justify-center items-center gap-4 cursor-pointer"
            >
              <img
                src={item.img}
                alt=""
                className="h-40 w-fit hover:scale-105 transition"
              />
              <div className="flex flex-col justify-center items-center">
                <p>{item.title}</p>
                <p className="font-bold">{item.boldTxt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
