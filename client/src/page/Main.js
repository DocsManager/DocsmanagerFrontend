import { Box } from "@mui/material";
import React, { useState, createContext, useEffect } from "react";
import { mypage } from "../api/userApi";
import { theme } from "../Config";
import Header from "./main/Header";
import { useLocation } from "react-router-dom";
import Sidebar from "./main/Sidebar";
import { Outlet } from "react-router-dom";
export const MyContext = createContext({
  check: false,
  setCheckHandler: (check) => {},
  userInfo: {},
  setUserInfoHandler: (info) => {},
});

function Main() {
  const [check, setCheck] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const setCheckHandler = (check) => setCheck(check);
  const location = useLocation();
  const setUserInfoHandler = (info) => setUserInfo(info);
  useEffect(() => {
    mypage(setUserInfoHandler);
  }, []);
  return (
    <Box>
      <MyContext.Provider
        value={{ check, setCheckHandler, userInfo, setUserInfoHandler }}
      >
        {userInfo.userNo && (
          <>
            <Header />
            <Box
              style={{
                display: "grid",
                gridTemplateColumns:
                  location.pathname == "/main/document"
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
