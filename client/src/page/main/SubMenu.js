import React from "react";

import "./SubMenu.css";

function SubMenu({ item }) {
  return (
    <div>
      <div className="sidebar-link">
        <div>
          {item.icon}
          <span className="sidebar-label">{item.title}</span>
        </div>
      </div>
    </div>
  );
}

export default SubMenu;
