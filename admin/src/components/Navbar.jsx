import React, { useContext, useRef, useState } from "react";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

function Navbar() {
  const { serverUrl } = useContext(authDataContext);
  const { setAdminData, adminData } = useContext(userDataContext);
  const navigation = useNavigate();

  return (
    <>
      <div className="w-screen shadow-md h-20 top-0 flex justify-center items-center z-20 bg-[#e6f0fe] fixed">
        <div className="lg:w-[80%] w-[85%] flex items-center justify-between">
          <img
            src={logo}
            alt="Efforder Logo"
            className="w-35 cursor-pointer"
            onClick={() => {
              navigation("/");
            }}
          />
        </div>
        {adminData && (
          <div
            className="font-semibold text-lg text-[#394762] cursor-pointer hover:scale-105 transition-all hover:text-blue-600"
            onClick={async () => {
              try {
                await axios.post(
                  serverUrl + "/api/auth/logout",
                  {},
                  {
                    withCredentials: true,
                  }
                );
                navigation("/login");
                setAdminData(null);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Logout
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
