import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.webp";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  ShoppingCart,
  Sun,
  User,
  Laptop,
  Smartphone,
  Headphones,
  Camera,
  Watch,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const searchRef = useRef(null);
  let [searchValue, setSearchValue] = useState("");

  const categories = [
    { name: "Laptops", icon: <Laptop /> },
    { name: "Smartphones", icon: <Smartphone /> },
    { name: "Audio", icon: <Headphones /> },
    { name: "Cameras", icon: <Camera /> },
    { name: "Wearables", icon: <Watch /> },
  ];

  const navUiClasses = [
    {
      div: "flex gap-2 items-center group hover:text-blue-600 cursor-pointer transition hover:scale-105",
      p: "font-semibold text-lg text-[#394762] group-hover:text-blue-600",
    },
  ];

  useEffect(() => {
    function handleClickEvent(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickEvent);
    } else {
      document.removeEventListener("mousedown", handleClickEvent);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  }, [searchOpen]);
  const navigation = useNavigate();

  return (
    <>
      <div className="w-screen shadow-md h-20 flex justify-center items-center z-20 bg-[#e6f0fe] fixed">
        <div className="w-[80%] flex items-center justify-between">
          <img
            src={logo}
            alt="Efforder Logo"
            className="w-35 cursor-pointer"
            onClick={() => {
              navigation("/");
            }}
          />
          <div className="flex gap-16 items-center relative">
            <div
              onClick={() => {
                setSearchOpen(true);
              }}
            >
              {searchOpen ? (
                <div className="flex items-center hover:border-blue-600 border border-[#394762] py-2 px-4 rounded-full transition-[0.95s]">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="outline-none"
                    ref={searchRef}
                    value={searchValue}
                    onInput={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchValue(value);
                      if (value === "") {
                        navigation("/");
                      } else {
                        navigation(`/search/${e.target.value}`);
                      }
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer hover:text-blue-600 text-[#394762]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex gap-2 items-center cursor-pointer hover:text-blue-600 transition-[0.95s] hover:scale-105 group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-[#394762] group-hover:text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  <p className={navUiClasses[0].p}>Search</p>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="font-semibold text-lg hover:text-blue-600 text-[#394762] cursor-pointer transition hover:scale-105"
                onClick={() => {
                  setShopOpen(!shopOpen);
                }}
              >
                Shop
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-30"
                  >
                    <ul className="p-2">
                      {categories.map((item) => (
                        <li
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setShopOpen(false);
                            navigation(`/products/category/${item.name}`);
                          }}
                        >
                          {item.icon}
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className={navUiClasses[0].div}>
              <ShoppingCart className="text-[#394762] group-hover:text-blue-600" />
              <p className={navUiClasses[0].p}>Cart</p>
            </div>
            <div className={navUiClasses[0].div}>
              <User className="text-[#394762] group-hover:text-blue-600" />
              <p className={navUiClasses[0].p}>Sign In</p>
            </div>
            <div
              className="flex items-center cursor-pointer hover:scale-105"
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            >
              {darkMode ? (
                <Moon className="text-white hover:text-blue-600 transition" />
              ) : (
                <Sun className="text-black hover:text-blue-600 transition" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default navbar;