import React, { useState, useEffect, useContext } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "./Header.css";
import { getUser } from "../../component/getUser/getUser";
import {
  getNoticeList,
  wsDisconnect,
  wsDocsSubscribe,
} from "../../api/noticeApi";
import { NoticePopover } from "./NoticePopover";
import { createContext } from "react";
import { notify } from "../Toast";

import "react-toastify/dist/ReactToastify.css";
import "../Toast.css";
import { Avatar, Popover, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { AccountBox, Logout } from "@mui/icons-material";

export const NoticeContext = createContext({
  isRead: "",
  setIsReadHandler: (isRead) => {},
});

const PopoverBtn = styled(Button)({
  backgroundColor: "#3791f8",
  color: "white",
  fontSize: "1em",
  "&:hover": {
    fontWeight: "bold",
  },
});

export default function Header() {
  const name = getUser().name;
  const [noticeList, setNoticeList] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const [newNotice, setNewNotice] = useState();
  const setIsReadHandler = (isRead) => setIsRead(isRead);

  useEffect(() => {
    getNoticeList(setNoticeList);
    wsDocsSubscribe(setNewNotice, setNoticeList, noticeList);
    // return () => wsDisconnect();
  }, [isRead, newNotice]);

  //Toast message 띄워주는 함수
  const showNotice = (newNotice) => {
    notify(newNotice);
    //newNotice 초기화 해주자..
    setNewNotice();
  };

  //프로필 사진 변경, 로그아웃 popover를 위한 코드
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Navbar className="header-box">
        <NavbarBrand href="/main" style={{ padding: "0" }}>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="banner"
            className="header-logo"
          />
        </NavbarBrand>
        <div className="header-user">
          <div className="header-user-icon">
            <Avatar
              onClick={handleClick}
              sx={{ bgcolor: "#3791F8" }}
              src={`${process.env.PUBLIC_URL}/kihonglee.jpg`}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  width: "350px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <PopoverBtn variant="contained" endIcon={<AccountBox />}>
                  마이페이지
                </PopoverBtn>
                <PopoverBtn variant="contained" endIcon={<Logout />}>
                  로그아웃
                </PopoverBtn>
                {/* <PopoverBtn variant="contained">로그아웃</PopoverBtn> */}
              </Box>
            </Popover>
          </div>
          <p className="header-user-text">
            <span>{name}</span>님 환영합니다
          </p>
          {newNotice && showNotice(newNotice.content)}
          <div className="header-alert">
            <NoticeContext.Provider value={{ isRead, setIsReadHandler }}>
              <NoticePopover
                noticeList={noticeList}
                setNoticeList={setNoticeList}
                newNotice={newNotice}
              />
            </NoticeContext.Provider>
            <div className="header-profile" />
          </div>
        </div>
      </Navbar>
    </div>
  );
}
