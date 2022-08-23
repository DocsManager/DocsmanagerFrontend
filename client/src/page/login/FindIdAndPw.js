import axios from "axios";
import React, { useState } from "react";
import { Button, TextField, Box, Container } from "@mui/material";
import "./FindidAndPw.css";
import FindId from "./FindId";
import FindPassword from "./FindPassword.js";

function FindIdAndPw() {
  const [visible, setVisible] = useState(true);
  const [pwvisible, setPwvisible] = useState(false);

  return (
    // <div className="maincontainer">
    <Container maxWidth={"xs"} sx={{ marginTop: 20 }}>
      <div className="buttoncontainer">
        <button
          type="button"
          className="idpwdiv"
          id="id"
          onClick={() => {
            setVisible(!visible);
            setPwvisible(false);
          }}
        >
          {visible ? "아이디찾기" : "아이디찾기"}
        </button>
        <button
          type="button"
          className="idpwdiv"
          id="pw"
          onClick={() => {
            setPwvisible(!pwvisible);
            setVisible(false);
          }}
        >
          {pwvisible ? "패스워드찾기" : "패스워드찾기"}
        </button>
        {visible && <FindId />}

        {pwvisible && <FindPassword />}
      </div>
    </Container>
  );
}

export default FindIdAndPw;
