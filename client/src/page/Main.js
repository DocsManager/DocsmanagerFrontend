import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./main/Header";
import Sidebar from "./main/Sidebar";

function Main() {
  return (
    <div>
      <Header />
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 2fr" }}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
