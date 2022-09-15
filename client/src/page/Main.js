import { Box, ThemeProvider } from "@mui/material";
import React, { useState, createContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { mypage } from "../api/userApi";
import { theme } from "../Config";
import Header from "./main/Header";
import Sidebar from "./main/Sidebar";
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
  const setUserInfoHandler = (info) => setUserInfo(info);
  useEffect(() => {
    console.log("=====================================");
    mypage(setUserInfoHandler);
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
                  gridTemplateColumns: "350px 2fr", //09.01 바뀜
                  width: "100%",
                }}
              >
                <Sidebar />
                <Outlet />
              </Box>
            </>
          )}
        </MyContext.Provider>
      </Box>
    </ThemeProvider>
  );
}

export default Main;
