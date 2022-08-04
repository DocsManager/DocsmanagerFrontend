import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/userApi";
import { UserContext } from "../../component/context/UserContext";

function Login() {
  const { setUserHandler } = useContext(UserContext);
  return (
    <>
      <input id="userId" placeholder="ID를 입력해주세요." />
      <input id="userPwd" placeholder="비밀번호를 입력해주세요." />
      <Link to={"main"}>
        <button
          onClick={() => {
            const user = {
              id: document.getElementById("userId").value,
              password: document.getElementById("userPwd").value,
            };
            login(user, setUserHandler);
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
