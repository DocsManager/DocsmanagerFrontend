import React from "react";
import { Button, TextField, Box, Container } from "@mui/material";
import { findId } from "../../api/mailApi";

function FindId() {
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      const params = {
        name: document.getElementById("findName").value,
        email: document.getElementById("findEmail").value,
      };
      findId(params);
    }
  };
  return (
    <div>
      <Container>
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            id="findName"
            label="이름"
            size="small"
            variant="standard"
            onKeyPress={onKeyPress}
          />
        </Box>

        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            helperText="회원가입시 작성했던 이메일을 입력해주세요"
            id="findEmail"
            label="이메일"
            size="small"
            variant="standard"
            onKeyPress={onKeyPress}
          />
        </Box>
        <br />
        <Button
          fullWidth
          variant="contained"
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
      </Container>
    </div>
  );
}

export default FindId;
