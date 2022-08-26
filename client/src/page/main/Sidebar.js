import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { styled } from "@mui/material/styles";
import AddWorkspace from "../workspace/AddWorkspace";

const SidebarList = styled(ListItem)`
  /* padding: 20px; */
`;
const SidebarSideLink = styled(ListItemButton)`
  font-size: 1.5em;
  padding: 20px;
  /* width: 18vw; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8bc7ff;
  font-weight: bolder;
  list-style: none;
  text-decoration: none;
  &:hover {
    background: #d9d9d9;
    border-left: 4px solid #3791f8;
    cursor: pointer;
    text-decoration-line: none;
    color: #3791f8;
  }
`;
const SidebarText = styled(ListItemText)`
  font-weight: bold;
  font-size: 1.2em;
  &:hover {
    font-weight: bold;
  }
`;

const SidebarBtn = styled(Button)`
  display: flex;
  width: 18vw;
  height: 8vh;
  background: #3791f8;
  font-size: 1em;
  color: white;
  border: none;
  border-radius: 5px;
  height: 5.2vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  &:hover {
    text-decoration: none;
    font-weight: bolder;
  }
`;

const ListIcon = styled(ListItemIcon)`
  color: #8bc7ff;
`;
export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Box className="sidebar-nav">
        <div className="sidebar-nav-child">
          <SidebarBtn
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ outline: "none !important" }}
          >
            워크스페이스 생성
          </SidebarBtn>
        </div>

        <List>
          {SidebarData.map((item, index) => (
            // <SidebarList key={index}>
            <SidebarSideLink to={item.path} key={index}>
              <ListIcon>{item.icon}</ListIcon>
              <SidebarText primary={item.title} sx={{ fontSize: "1.5em" }} />
            </SidebarSideLink>
            // </SidebarList>
          ))}
        </List>
      </Box>
      <AddWorkspace open={open} setOpen={setOpen} />
    </Box>
  );
}
