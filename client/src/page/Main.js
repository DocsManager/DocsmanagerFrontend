import React from "react";
import { Outlet } from "react-router-dom";
import Head from "./Head";

function Main() {
  return (
    <div>
      <Head />
      <Outlet />
    </div>
  );
}

export default Main;
