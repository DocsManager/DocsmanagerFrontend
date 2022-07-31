import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div>notfound</div>
      <Link to="/">
        <button>로그인</button>
      </Link>
    </>
  );
}

export default NotFound;
