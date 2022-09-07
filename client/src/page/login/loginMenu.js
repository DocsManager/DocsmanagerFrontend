import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import React from "react";

export const loginMenu = [
  {
    id: "userId",
    icon: <PersonIcon sx={{ color: "#ffffff", background: "#3791F8" }} />,
    placeholder: " ID를 입력해주세요",
  },
  {
    id: "userPwd",
    type: "password",
    icon: <LockIcon sx={{ color: "#3791F8" }} />,
    placeholder: " 비밀번호를 입력해주세요",
  },
];
