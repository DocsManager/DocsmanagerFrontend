import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  let auth = getCookie("accessToken");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
