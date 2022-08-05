import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarSideLink = styled(Link)`
  font-size: 1em;
  height: 60px;
  width: 20vw;
  padding: 0 1.5625vw 0px 1.5625vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8bc7ff;
  list-style: none;
  text-decoration: none;

  &:hover {
    background: #d9d9d9;
    border-left: 4px solid #3791f8;
    cursor: pointer;
    text-decoration-line: none;
    font-weight: bold;
    color: #3791f8;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 0.6944vw;
`;

function SubMenu({ item }) {
  return (
    <div>
      <SidebarSideLink to={item.path}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarSideLink>
    </div>
  );
}

export default SubMenu;
