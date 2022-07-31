import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Link to="/main">
        <button>로그인</button>
      </Link>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
    </>
  );
}
export default Login;
