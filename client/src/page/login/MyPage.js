import { config } from "@fortawesome/fontawesome-svg-core";
import React, { Component } from "react";
import axios, { post } from "axios";
import { logout } from "../../api/userApi";
function MyPage() {
  return (
    <div>
      {/* 로그아웃 확인용 버튼 */}
      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </div>
  );
}
export default MyPage;
