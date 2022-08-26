import React from "react";
import { Button, TextField, Box, Container } from "@mui/material";
import { findPw } from "../../api/mailApi";
import "./FindidAndPw.css";

function FindPassword() {
  return (
    <Container>
      <div className="pwformcontainer">
        <Box>
          <TextField
            id="findid"
            label="아이디"
            size="small"
            variant="standard"
          />
        </Box>

        <Box>
          <TextField
            id="findEmail"
            label="이메일"
            size="small"
            variant="standard"
          />
        </Box>
        <Button
          onClick={() => {
            const params = {
              name: document.getElementById("findid").value,
              email: document.getElementById("findEmail").value,
            };
            findPw(params);
            console.log(document.getElementById("findid").value);
            console.log(document.getElementById("findEmail").value);
          }}
        >
          비밀번호찾기
        </Button>
      </div>
    </Container>
  );
}

export default FindPassword;
