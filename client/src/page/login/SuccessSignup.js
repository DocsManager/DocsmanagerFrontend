import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./SuccessSignup.css";

function SuccesSignup() {
  return (
    <div className="pagecontainer">
      <div className="successcontainer">
        <img
          src={`${process.env.PUBLIC_URL}/successsignup.png`}
          className="successlogo"
          alt="successlogo"
        />
        <h2> 회원가입을 축하드립니다</h2>
        <h2 className="successfont">
          다양한 서비스를 <span className="D">D</span>{" "}
          <span className="M">M</span>에서 즐겨보세요!
        </h2>
        <Link to="/">
          <Button type="button">로그인하러가기</Button>
        </Link>
      </div>
    </div>
  );
}
export default SuccesSignup;
