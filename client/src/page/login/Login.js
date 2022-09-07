import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/userApi";
import "./Login.css";
import { loginMenu } from "./loginMenu";

function Login() {
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      const userInfo = {
        id: document.getElementById("userId").value,
        password: document.getElementById("userPwd").value,
      };
      login(userInfo, setUser);
    }
  };

  const [user, setUser] = useState({});
  if (user.userNo) {
    console.log(user);
    alert(user.name + "님 환영합니다");
    window.location.href = "main";
  }

  return (
    <div className="logincontainer">
      <div className="fontcontainer">
        <div>
          <img src={`${process.env.PUBLIC_URL}/dmlogo.png`} className="logo" />
          <div className="fonts">
            <p className="font1">문서를 세분화된 폴더로 관리해보세요!</p>
            <p className="font1">
              워크스페이스를 생성해 <br /> 문서를 공동 편집 해보세요!
            </p>
          </div>
        </div>
      </div>
      <div style={{ width: "50vw" }} className="login">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} className="dmlogo" />
        <p className="font1">
          <span className="D">D</span> <span className="M">M</span>에 오신것을
          환영합니다.
        </p>
        <div style={{ width: "30vw", margin: "0 auto", fontSize: 500 }}>
          <form>
            <Box
              sx={{
                "& > :not(style)": { m: 5 },
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {loginMenu.map((menu, idx) => {
                return (
                  <TextField
                    key={idx}
                    id={menu.id}
                    placeholder={menu.placeholder}
                    type={menu.type}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {menu.icon}
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    onKeyPress={onKeyPress}
                  />
                );
              })}
            </Box>
          </form>
        </div>

        <Box
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              const userInfo = {
                id: document.getElementById("userId").value,
                password: document.getElementById("userPwd").value,
              };
              login(userInfo, setUser);
            }}
          >
            로그인
          </Button>
          <Link to="/signup">
            <Button type="button">회원가입</Button>
          </Link>

          <Link to="findidpw">
            <Button>Id/pw찾기</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}
export default Login;
