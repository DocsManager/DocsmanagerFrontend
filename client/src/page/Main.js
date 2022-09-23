import { Box } from "@mui/material";
import React, { useState, createContext, useEffect } from "react";
import { mypage } from "../api/userApi";
import Header from "./main/Header";
import { useLocation } from "react-router-dom";
import Sidebar from "./main/Sidebar";
import { Outlet } from "react-router-dom";
export const MyContext = createContext({
  check: false,
  setCheckHandler: (check) => {},
  userInfo: {},
  setUserInfoHandler: (info) => {},
  toast: true,
  setToastHandler: (toast) => {},
  searchData: "",
  setSearchDataHandler: (searchData) => {},
});

function Main() {
  const [check, setCheck] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [toast, setToast] = useState(true);
  const [searchData, setSearchData] = useState("");
  const setSearchDataHandler = (searchData) => setSearchData(searchData);
  const setCheckHandler = (check) => setCheck(check);
  const location = useLocation();
  const setUserInfoHandler = (info) => setUserInfo(info);
  const setToastHandler = (toast) => setToast(toast);
  useEffect(() => {
    mypage(setUserInfoHandler);
  }, []);
  return (
    <Box>
      <MyContext.Provider
        value={{
          check,
          setCheckHandler,
          userInfo,
          setUserInfoHandler,
          toast,
          setToastHandler,
          searchData,
          setSearchDataHandler,
        }}
      >
        {userInfo.userNo && (
          <>
            <Header />
            <Box
              style={{
                display: "grid",
                gridTemplateColumns:
                  location.pathname === "/main/document"
                    ? "100% 0%"
                    : "350px 2fr", //09.01 바뀜
                width: "100%",
              }}
            >
              <Sidebar urlPath={location.pathname} />
              <Outlet />
            </Box>
          </>
        )}
      </MyContext.Provider>
    </Box>
  );
}

export default Main;
