import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { styled } from "@mui/material/styles";
import styles from "styled-components";
import AddWorkspace from "../workspace/AddWorkspace";
import { makeStyles, Tooltip } from "@material-ui/core";
import { Typography, LinearProgress } from "@mui/material";
import { fileSize } from "../../api/documentApi";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import { MyContext } from "../Main";

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

const SidebarSideLinkPage = styles(Link)`
  font-size: 30px;
  padding: 5px 10px 5px 10px;
  margin: 5px 10px 0px 5px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bolder;
  list-style: none;
  text-decoration: none;
  background: white;
  border-left: 3px solid #3791f8;
  cursor: pointer;
  text-decoration-line: none;
  color: #3791f8;
  font-weight: bold;
  border-radius: 30px 0px 0px 30px;
  &:hover {
    background: white;
    border-left: 3px solid #3791f8;
    cursor: pointer;
    text-decoration-line: none;
    color: #3791f8;
    font-weight: bold;
  }
`;
const SidebarSideLink = styles(Link)`
font-size: 30px;
padding: 5px 10px 5px 10px;
margin: 5px 10px 0px 5px;
color:white;
height: 60px;
display: flex;
justify-content: space-between;
align-items: center;
font-weight: bolder;
list-style: none;
text-decoration: none;
border-radius: 30px 0px 0px 30px;

&:hover {
  background: #8bc7ff;
  border-left: 3px solid #3791f8;
  cursor: pointer;
  text-decoration-line: none;
  color: white;
  font-weight: bold;
}
`;
const style1 = {
  fontSize: "1.4rem",
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
  min-width: 330px; //바뀜
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
        <Typography variant="body2">{`${Math.floor(props.value)}%`}</Typography>
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
    fontFamily: "Pretendard-Regular",
  },
});

//드라이브 용량 표시 css 컴포넌트
const Storage = styled(Box)({
  color: "white",
  padding: "20px",
  fontSize: "1.2rem",
});
export default function Sidebar({ urlPath }) {
  const pathName = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(0);
  const classes = useStyles();
  const [click, setClick] = useState(false);
  const { check, setCheckHandler, userInfo, setSearchDataHandler } = useContext(
    MyContext
  );
  const clickHandler = () => {
    setSearchDataHandler("");
    setClick(!click);
  };
  const reloadClickHandler = () => {
    setSearchDataHandler("");
    setCheckHandler(!check);
  };

  useEffect(() => {
    fileSize(userInfo.userNo, setSize);
  }, [check]);
  return (
    <>
      {urlPath === "/main/document" ? (
        <></>
      ) : (
        <Box>
          <Box className="sidebar-nav">
            <div className="sidebar-nav-child">
              <SidebarBtn variant="contained" onClick={() => setOpen(true)}>
                워크스페이스 생성
              </SidebarBtn>
            </div>

            <List style={sidebarLinkStyle}>
              {SidebarData.map((item, index) =>
                pathName === item.path ? (
                  <SidebarSideLinkPage
                    to={item.path}
                    key={index}
                    onClick={reloadClickHandler}
                  >
                    <Tooltip
                      title={item.tooltip}
                      classes={{ tooltip: classes.tooltip }}
                      placement="bottom-end" //툴팁 위치 변경됨 08.31
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
                            <Typography style={style1}>{item.title}</Typography>
                          }
                        />
                      </Box>
                    </Tooltip>
                  </SidebarSideLinkPage>
                ) : (
                  <SidebarSideLink
                    to={item.path}
                    key={index}
                    onClick={clickHandler}
                  >
                    <Tooltip
                      title={item.tooltip}
                      classes={{ tooltip: classes.tooltip }}
                      placement="bottom-end" //툴팁 위치 변경됨 08.31
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
                            <Typography style={style1}>{item.title}</Typography>
                          }
                        />
                      </Box>
                    </Tooltip>
                  </SidebarSideLink>
                )
              )}
            </List>
            {/* 08.31 드라이브 용량 표시 변경 코드 */}
            <Storage>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CloudOutlinedIcon
                  sx={{ fontSize: "40px", marginRight: "15px" }}
                />
                잔여 저장 용량
              </Box>
              <LinearProgressWithLabel value={(size / 10485760) * 100} />
              {(size / 1024 / 1024).toFixed(2)} GB / 10 GB
            </Storage>
          </Box>

          <AddWorkspace open={open} setOpen={setOpen} />
        </Box>
      )}
    </>
  );
}
