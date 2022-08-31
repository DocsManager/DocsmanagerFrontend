import { Box, ThemeProvider } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { theme } from "../Config";
import Header from "./main/Header";
import Sidebar from "./main/Sidebar";

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Header />
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "0.4fr 2fr",
            width: "100%",
          }}
        >
          <Sidebar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Main;
