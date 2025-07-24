import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/logo.webp";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  User,
  Laptop,
  Smartphone,
  Headphones,
  Camera,
  Watch,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { authDataContext } from "../context/authContext";

function navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const searchRef = useRef(null);
  const { serverUrl } = useContext(authDataContext);
  let [searchValue, setSearchValue] = useState("");
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { userData, getCurrentUser, setUserData } = useContext(userDataContext);
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    getCurrentUser();
  }, []);

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
        <div className="lg:w-[80%] w-[85%] flex items-center justify-between">
          <img
            src={logo}
            alt="Efforder Logo"
            className="w-35 cursor-pointer"
            onClick={() => {
              navigation("/");
            }}
          />
          <div className="md:flex hidden lg:gap-12 md:gap-8 items-center relative">
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
                      navigation(value === "" ? "/" : `/search/${value}`);
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
                    <ul className="p-2 rounded-md">
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
            {userData ? (
              <div className="relative">
                <div
                  className="bg-[#394762] text-white rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:scale-105 transition-all"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  {userData?.userName.slice(0, 1)}
                </div>
                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-30"
                    >
                      <ul className="p-2 rounded-md">
                        <div>
                          <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Orders
                          </li>
                        </div>
                        <div
                          className="flex items-center hover:bg-gray-100 cursor-pointer"
                          onClick={async () => {
                            try {
                              await axios.post(
                                serverUrl + "/api/auth/logout",
                                {},
                                { withCredentials: true }
                              );
                              setUserData(null);
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          <li className="flex items-center py-2 px-4">
                            Logout
                          </li>
                          <LogOut className="text-[#394762] h-4 w-4" />
                        </div>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div
                className={navUiClasses[0].div}
                onClick={() => navigation("/signin")}
              >
                <User className="text-[#394762] group-hover:text-blue-600" />
                <p className={navUiClasses[0].p}>Sign in</p>
              </div>
            )}
            <div className={navUiClasses[0].div + " relative"}>
              <ShoppingCart className="text-[#394762] group-hover:text-blue-600 group" />
              <p className="absolute right-[-0.9em] top-[-0.7em] text-white text-[0.8em] bg-[#394762] group-hover:bg-blue-600 h-5 w-5 flex justify-center items-center rounded-full">
                0
              </p>
            </div>
          </div>
          <div className="md:hidden block">
            <Menu
              className="cursor-pointer text-[#394762] hover:text-blue-600 transition hover:scale-105"
              onClick={() => setSideBarOpen(!sideBarOpen)}
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {sideBarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 flex flex-col items-center h-full w-[85%] bg-white z-50 shadow-lg px-6"
          >
            <div className="flex justify-between items-center w-[90%]">
              <img
                src={logo}
                alt="Efforder Logo"
                className="w-35 cursor-pointer"
                onClick={() => {
                  navigation("/");
                  setSideBarOpen(false);
                }}
              />
              <X
                className="cursor-pointer text-[#394762] hover:text-blue-600 transition hover:scale-105"
                onClick={() => setSideBarOpen(false)}
              />
            </div>
            <div className="flex items-center hover:border-blue-600 border border-[#394762] py-2 px-4 rounded-full transition-[0.95s] w-[87%] relative">
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
                  navigation(value === "" ? "/" : `/search/${value}`);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 absolute cursor-pointer hover:text-blue-600 text-[#394762] right-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <div className="w-[90%] flex justify-self-start mt-6 flex-col">
              <p className="px-4 font-bold text-[#394762]">
                Shop By Categories
              </p>
              <ul className="p-2">
                {categories.map((item, i) => (
                  <li
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigation(`/products/category/${item.name}`);
                      setSideBarOpen(false);
                    }}
                    key={i}
                  >
                    {item.icon}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b-1 w-[85%] my-6 border-[#394762]"></div>

            <div className="mt-3 px-4 flex justify-between w-[90%]">
              {userData ? (
                <div className="bg-[#394762] text-white rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:scale-105 transition-all">
                  {userData?.userName.slice(0, 1)}
                </div>
              ) : (
                <div
                  className={navUiClasses[0].div}
                  onClick={() => {
                    navigation("/signin");
                    setSideBarOpen(false);
                  }}
                >
                  <User className="text-[#394762] group-hover:text-blue-600" />
                  <p className={navUiClasses[0].p}>Sign in</p>
                </div>
              )}
              <div className={navUiClasses[0].div + " relative"}>
                <ShoppingCart className="text-[#394762] group-hover:text-blue-600 group" />
                <p className="absolute right-[-0.9em] top-[-0.7em] text-white text-[0.8em] bg-[#394762] group-hover:bg-blue-600 h-5 w-5 flex justify-center items-center rounded-full">
                  0
                </p>
              </div>
            </div>
            <div
              className="text-[#394762] cursor-pointer mt-2 font-semibold"
              onClick={async () => {
                try {
                  await axios.post(
                    serverUrl + "/api/auth/logout",
                    {},
                    { withCredentials: true }
                  );
                  setUserData(null);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Logout
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default navbar;
