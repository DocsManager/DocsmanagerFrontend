import React from "react";
import "./Header.css";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

function Header() {
  const name = "곽예영";
  return (
    <div className="header-box">
      <Link to="/">
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="banner"
            className="header-logo"
          />
        </div>
      </Link>

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
          <FontAwesomeIcon icon={faBell} size="2x" color="#3791F8" />
          {/* <div className="header-profile"></div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
