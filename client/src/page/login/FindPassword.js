import React from "react";
import { Button, TextField, Box, Container } from "@mui/material";
import { findPw } from "../../api/mailApi";

function FindPassword() {
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      const params = {
        id: document.getElementById("findid").value,
        email: document.getElementById("findEmail").value,
      };
      findPw(params);
    }
  };
  return (
    <Container>
      <div>
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            id="findid"
            label="아이디"
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
              id: document.getElementById("findid").value,
              email: document.getElementById("findEmail").value,
            };

            findPw(params);
          }}
        >
          비밀번호찾기
        </Button>
      </div>
    </Container>
  );
}

export default FindPassword;
