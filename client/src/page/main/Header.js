import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "./Header.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser } from "../../component/getUser/getUser";
import { getNoticeList, connect } from "../../api/noticeApi";
import { NoticePopover } from "./NoticePopover";

export default function Header() {
  const name = getUser().name;

  const [noticeList, setNoticeList] = useState([]);
  const [newNotice, setNewNotice] = useState([]);

  useEffect(() => {
    getNoticeList(setNoticeList);
    connect();
    // return () => disconnect();
  }, [noticeList]);

  return (
    <div style={{ backGroundColor: "#8bc7ff" }}>
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
            <FontAwesomeIcon
              icon={faUser}
              size="2x"
              color="#3791F8"
              className="icon"
            />
          </div>
          <p className="header-user-text">
            <span>{name}</span>님 환영합니다
          </p>
          <div className="header-alert">
            <NoticePopover noticeList={noticeList} />
            <div className="header-profile" />
          </div>
        </div>
      </Navbar>
    </div>
  );
}
