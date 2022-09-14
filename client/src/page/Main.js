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
      <Box>
        <MyContext.Provider value={{ check, setCheckHandler }}>
          <Header />
          <Box
            style={{
              display: "grid",
              gridTemplateColumns:window.location.href.split("main")[1].includes("/document")?"100% 0%":"350px 2fr", //09.01 바뀜
              width: "100%",
            }}
          >
            {window.location.href.split("main")[1].includes("/document")?<></>:<Sidebar/>}
            <Outlet />
          </Box>
        </MyContext.Provider>
      </Box>
  );
}

export default Main;
