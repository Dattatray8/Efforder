import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.webp";
import { Moon, ShoppingCart, Sun, User } from "lucide-react";

function navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

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

  return (
    <div className="w-screen overflow-hidden shadow-md h-20 flex justify-center items-center">
      <div className="w-[80%] flex items-center justify-between">
        <img src={logo} alt="Efforder Logo" className="w-35" />
        <div className="flex gap-16 items-center">
          <div
            onClick={() => {
              setSearchOpen(true);
            }}
          >
            {searchOpen ? (
              <div className="flex items-center hover:border-blue-600 border py-2 px-4 rounded-full transition-[0.95s]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none"
                  ref={searchRef}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex gap-2 items-center cursor-pointer hover:text-blue-600 transition-[0.95s] hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <p className="font-semibold text-lg">Search</p>
              </div>
            )}
          </div>
          <p className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition hover:scale-105">
            Shop
          </p>
          <div className="flex gap-2 items-center hover:text-blue-600 cursor-pointer transition hover:scale-105">
            <ShoppingCart />
            <p className="font-semibold text-lg">Cart</p>
          </div>
          <div className="flex gap-2 items-center hover:text-blue-600 cursor-pointer transition hover:scale-105">
            <User />
            <p className="font-semibold text-lg">Sign In</p>
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
  );
}

export default navbar;