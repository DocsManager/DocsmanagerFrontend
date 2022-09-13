import { Box, ThemeProvider } from "@mui/material";
import React, { useState, createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { theme } from "../Config";
import Header from "./main/Header";
import Sidebar from "./main/Sidebar";
export const MyContext = createContext({
  check: false,
  setCheckHandler: (check) => {},
});

function Main() {
  const [check, setCheck] = useState(false);
  const setCheckHandler = (check) => setCheck(check);
  console.log(check);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <MyContext.Provider value={{ check, setCheckHandler }}>
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
        </MyContext.Provider>
      </Box>
    </ThemeProvider>
  );
}

export default Main;
