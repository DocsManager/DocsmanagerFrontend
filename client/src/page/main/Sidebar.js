import React, { useState, useEffect } from "react";
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
import { Typography, LinearProgress } from "@mui/material";
import { fileSize } from "../../api/documentApi";
import { getUser } from "../../component/getUser/getUser";

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

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.floor(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
export default function Sidebar(check, setCheck) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(0);

  useEffect(() => {
    fileSize(getUser().userNo, setSize);
  }, [size]);

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
        <Typography>
          내 용량 : {(size / 1024 / 1024).toFixed(2)} GB / 10 GB
          <LinearProgressWithLabel value={(size / 10485760) * 100} />
        </Typography>
      </Box>

      <AddWorkspace open={open} setOpen={setOpen} />
    </Box>
  );
}
