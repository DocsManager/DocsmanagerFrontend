import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/userApi";
import { getUser } from "../../component/getUser/getUser";

function Login() {
  const [user, setUser] = useState({});
  if (user.userNo) {
    window.location.href = "main";
  }

  return (
    <>
      <input id="userId" placeholder="ID를 입력해주세요." />
      <input
        type="password"
        id="userPwd"
        placeholder="비밀번호를 입력해주세요."
      />
      <Link to={"main"}>
        <button
          onClick={() => {
            const userInfo = {
              id: document.getElementById("userId").value,
              password: document.getElementById("userPwd").value,
            };
            login(userInfo, setUser);
          }}
        >
          로그인
        </button>
      </Link>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
    </>
  );
}
export default Login;
