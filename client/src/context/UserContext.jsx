import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);
  const getCurrentUser = async () => {
    try {
      let { data } = await axios.get(serverUrl + "/api/user/getUser", {
        withCredentials: true,
      });
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    userData,
    setUserData,
    getCurrentUser,
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
