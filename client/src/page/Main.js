import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./main/Header";
import Sidebar from "./main/Sidebar";

function Main() {
  return (
    <div>
      {/* <Head /> */}
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Main;
