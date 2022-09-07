import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { styled } from "@mui/material/styles";
import AddWorkspace from "../workspace/AddWorkspace";
import { makeStyles, Tooltip } from "@material-ui/core";
import { IconButton, Typography, LinearProgress } from "@mui/material";
import { fileSize } from "../../api/documentApi";
import { getUser } from "../../component/getUser/getUser";

const sidebarLinkStyle = {
  fontSize: "1.3rem",
  marginLeft: "7px",
  display: "flex",
  flexDirection: "column",
  // alignItems: "flex-end",
  color: "white",
  listStyle: "none",
  textDecoration: "none",
};
const SidebarSideLink = styled(ListItemButton)`
  font-size: 30px;
  padding: 5px 10px 5px 10px;
  margin: 10px 10px 10px 0;
  width: 18vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
  list-style: none;
  text-decoration: none;
  &:hover {
    background: white;
    border-left: 3px solid #3791f8;
    cursor: pointer;
    text-decoration-line: none;
    color: #3791f8;
    font-weight: bold;
  }
`;

const style = {
  fontSize: "1.3rem",
  width: "193px",
  display: "flex",
  alignContent: "center",
  "&:hover": {
    fontWeight: "bold",
  },
};

//워크스페이스 생성버튼
const SidebarBtn = styled(Button)`
  display: flex;
  max-width: 420px;
  min-width: 350px;
  height: 58px;
  background: white;
  font-size: 1.3em;
  color: #3791f8;
  border: none;
  border-radius: 20px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-weight: bold;

  &:hover {
    background-color: white;
    text-decoration: none;
    font-weight: bolder;
  }
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
//tooltip 스타일
const useStyles = makeStyles({
  tooltip: {
    fontSize: "1em",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
  },
});

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(0);
  const classes = useStyles();
  const [click, setClick] = useState(false);
  const clickHandler = () => {
    setClick(!click);
  };
  useEffect(() => {
    fileSize(getUser().userNo, setSize);
  }, [size]);
  return (
    <Box>
      <Box className="sidebar-nav">
        <div className="sidebar-nav-child">
          <SidebarBtn variant="contained" onClick={() => setOpen(true)}>
            워크스페이스 생성
          </SidebarBtn>
        </div>

        <List style={sidebarLinkStyle}>
          {SidebarData.map((item, index) => (
            <SidebarSideLink to={item.path} key={index} onClick={clickHandler}>
              <Tooltip
                title={item.tooltip}
                classes={{ tooltip: classes.tooltip }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "0.25fr 0.5fr",
                    width: "250px",
                  }}
                >
                  <p style={{ margin: "0 auto" }}>{item.icon}</p>

                  <ListItemText
                    primary={
                      <Typography style={style}>{item.title}</Typography>
                    }
                  />
                </Box>
              </Tooltip>
            </SidebarSideLink>
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
