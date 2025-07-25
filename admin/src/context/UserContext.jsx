import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);
  const navigation = useNavigate();
  const getAdminData = async () => {
    try {
      let { data } = await axios.get(serverUrl + "/api/user/getadmin", {
        withCredentials: true,
      });
      setAdminData(data);
    } catch (error) {
      navigation("/login");
      console.log(error);
    }
  };
  useEffect(() => {
    getAdminData();
  }, []);
  const value = { adminData, setAdminData, getAdminData };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
