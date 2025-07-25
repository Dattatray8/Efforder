import { CircleCheckBig, CirclePlus, List } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

function SiderBar() {
  const navigation = useNavigate();
  const { adminData } = useContext(userDataContext);
  return (
    adminData && (
      <div className="w-[15%] mt-20 min-h-screen bg-[#e6f0fe] border-r border-blue-600 left-0 fixed flex flex-col items-end">
        <div
          className="border-y border-l border-blue-500 transition-colors w-[90%] my-4 py-2 flex justify-start px-[2vw] font-semibold hover:bg-blue-500 items-center cursor-pointer hover:text-white gap-2"
          onClick={() => {
            navigation("/add");
          }}
        >
          <CirclePlus className="w-[1.5rem] h-[2vw]" />
          <p>Add Items</p>
        </div>
        <div
          className="border-y border-l border-blue-500 transition-colors w-[90%] my-4 py-2 flex justify-start px-[2vw] font-semibold hover:bg-blue-500 items-center cursor-pointer hover:text-white gap-2"
          onClick={() => {
            navigation("/lists");
          }}
        >
          <List className="w-[1.5rem] h-[2vw]" />
          <p>List Items</p>
        </div>
        <div
          className="border-y border-l border-blue-500 transition-colors w-[90%] my-4 py-2 flex justify-start px-[2vw] font-semibold hover:bg-blue-500 items-center cursor-pointer hover:text-white gap-2"
          onClick={() => {
            navigation("/orders");
          }}
        >
          <CircleCheckBig className="w-[1.5rem] h-[2vw]" />
          <p>View Orders</p>
        </div>
      </div>
    )
  );
}

export default SiderBar;
