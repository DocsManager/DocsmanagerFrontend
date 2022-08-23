import React, { useState, useEffect, useContext } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "./Header.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export const NoticeContext = createContext({
  isRead: "",
  setIsReadHandler: (isRead) => {},
});

export default function Header() {
  const name = getUser().name;
  const [noticeList, setNoticeList] = useState([]);
  const [changeNotice, setChangeNotice] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [newNotice, setNewNotice] = useState();
  const setIsReadHandler = (isRead) => setIsRead(isRead);

  useEffect(() => {
    getNoticeList(setNoticeList);
    wsDocsSubscribe(setNewNotice, setNoticeList, noticeList);
    // return () => wsDisconnect();
  }, [isRead, changeNotice, newNotice]);

  //Toast message 띄워주는 함수
  const showNotice = (newNotice) => {
    notify(newNotice);
    //newNotice 초기화 해주자..
    setNewNotice();
  };

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
          {newNotice && showNotice(newNotice.content)}
          <div className="header-alert">
            <NoticeContext.Provider value={{ isRead, setIsReadHandler }}>
              <NoticePopover
                noticeList={noticeList}
                changeNotice={changeNotice}
                setChangeNotice={setChangeNotice}
              />
            </NoticeContext.Provider>
            <div className="header-profile" />
          </div>
        </div>
      </Navbar>
    </div>
  );
}
