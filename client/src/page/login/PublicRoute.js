import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
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
  return auth ? <Navigate to="main" /> : <Outlet />;
};

export default PublicRoute;
