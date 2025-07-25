import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SiderBar from "../components/SiderBar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <SiderBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
