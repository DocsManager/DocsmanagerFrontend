import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./main/Header";
import Sidebar from "./main/Sidebar";

function Main() {
  return (
    <div>
      <Header />
      <div>
        <a href="/logout">
          <button>로그아웃</button>
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "0.5fr 2fr" }}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
