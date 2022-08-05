import React from "react";
import { Link } from "react-router-dom";

import "./SubMenu.css";

function SubMenu({ item }) {
  return (
    <div>
      <div className="sidebar-link">
        <Link to={item.path}>
          <div>
            {item.icon}
            <span className="sidebar-label">{item.title}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SubMenu;
