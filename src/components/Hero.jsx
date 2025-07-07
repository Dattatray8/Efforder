import React from "react";
import hero from "../assets/hero.webp";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

function Hero() {
  return (
    <div
      className="overflow-hidden px-[10%] py-16 md:h-[600px] bg-cover bg-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="flex flex-col md:flex-row items-center max-w-[1300px] mx-auto h-full">
        {/* Left Text Content */}
        <div className="md:w-[50%] flex flex-col gap-6">
          <p
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="1000"
            data-aos-once="true"
          >
            Next-Gen Tech at Your Command
          </p>
          <p
            className="text-lg md:text-xl text-white"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-once="true"
            data-aos-delay="1500"
          >
            Discover the latest electronics with exclusive deals and free
            shipping on orders over ₹50.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              className="relative flex items-center justify-center gap-3 px-7 py-3 hover:border-[#2A7CF7] rounded-md bg-[#312af7] text-white overflow-hidden group hover:bg-[#2563eb] transition"
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="2000"
            >
              <span className="z-10 font-semibold transition-transform duration-300 group-hover:scale-110 group-hover:text-[#2A7CF7]">
                Shop Now
              </span>
              <span className="absolute inset-0 bg-white opacity-0 translate-y-12 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 z-0" />
            </button>

            <button
              className="relative flex items-center justify-center gap-3 px-7 py-3 border hover:border-[#2A7CF7] rounded-md text-white overflow-hidden group hover:text-white transition"
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="2500"
            >
              <span className="z-10 font-semibold transition-transform duration-300 group-hover:scale-110">
                Explore Categories
              </span>
              <span className="absolute inset-0 bg-[#2A7CF7] opacity-0 translate-y-12 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 z-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
