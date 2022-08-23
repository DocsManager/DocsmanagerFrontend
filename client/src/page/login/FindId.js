import React from "react";
import { Button, TextField, Box, Container } from "@mui/material";
import { findId } from "../../api/mailApi";
import "./FindidAndPw.css";

function FindId() {
  return (
    <Container>
      <div className="idformcontainer">
        <Box>
          <TextField
            id="findName"
            label="이름"
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
              name: document.getElementById("findName").value,
              email: document.getElementById("findEmail").value,
            };
            findId(params);
          }}
        >
          아이디찾기
        </Button>
      </div>
    </Container>
  );
}

export default FindId;
