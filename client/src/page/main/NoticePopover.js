import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import { Badge, Box, Tabs, Button } from "@mui/material";
import { DeleteOutline, NotificationsOutlined } from "@mui/icons-material";
import { Popover } from "@mui/material";
import {
  deleteNotice,
  updateNotice,
  updateAllNotce,
  deleteAllNotice,
  deleteAllUnreadNotice,
  deleteAllReadNotice,
} from "../../api/noticeApi";
import Toastify from "../Toast";
import { NoticeContext } from "./Header";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { MyContext } from "../Main";

//notice.isRead가 1이 되면 글자색이 lightgray가 됨
const noticeColor = {
  0: "black",
  1: "lightgray",
};

export function NoticePopover({
  noticeList,
  setNoticeList,
  newNotice,
  setCheck,
  check,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isRead, setIsReadHandler } = useContext(NoticeContext);
  const { userInfo } = useContext(MyContext);

  //읽은 알림은 전체 알림 개수에서 제외하는 것
  const unRead =
    noticeList && noticeList.filter((notice) => notice.isRead !== 1);

  //읽지 않은 알림은 전체 알림 개수에서 읽은 알림만큼 제외
  const read = noticeList && noticeList.filter((notice) => notice.isRead !== 0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const label = {
    0: `전체 ${noticeList.length}`,
    1: `읽지 않은 알림 ${unRead.length}`,
    2: `읽은 알림 ${read.length}`,
    // 3: <Button>전체 알림 삭제</Button>,
    // 4: <Button>전체 알림 읽음</Button>,
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (e, newValue) => {
    setSelectedTab(newValue);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const CustomTab = withStyles({
    root: {
      fontSize: "1.1rem",
      textAlign: "center",
      outline: "none!important",
      fontWeight: "bold",
    },
    selected: {
      color: "#3791F8 !important",
      fontWeight: "bolder",
    },
  })(Tab);

  const tabContent = () => {
    switch (selectedTab) {
      case 0:
        return noticeList;
      case 1:
        return unRead;
      default:
        return read;
    }
  };

  const tabContentButton = () => {
    switch (selectedTab) {
      case 0:
        return (
          <React.Fragment>
            <Button
              sx={{
                fontSize: "1rem",
                textAlign: "center",
                color: "rgba(0,0,0,0.7)",
              }}
              onClick={() => {
                deleteAllNotice(setNoticeList, userInfo);
                setCheck(true);
                handleClose();
              }}
            >
              전체 알림 삭제
            </Button>
            <Button
              sx={{
                fontSize: "1rem",
                textAlign: "center",
                color: "rgba(0,0,0,0.7)",
              }}
              onClick={() => {
                updateAllNotce(noticeList, userInfo);
                updateModal(isRead, setIsReadHandler);
              }}
            >
              전체 알림 읽음
            </Button>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Button
              sx={{
                fontSize: "1rem",
                textAlign: "center",
                color: "rgba(0,0,0,0.7)",
              }}
              onClick={() => {
                deleteAllUnreadNotice(setNoticeList, userInfo);
                setCheck(true);
              }}
            >
              <span>
                읽지 않은 알림
                <br />
                전체 삭제
              </span>
            </Button>
            <Button
              sx={{
                fontSize: "1rem",
                textAlign: "center",
                color: "rgba(0,0,0,0.7)",
              }}
              onClick={() => {
                updateAllNotce(noticeList, userInfo);
                updateModal(isRead, setIsReadHandler);
              }}
            >
              <span>
                읽지 않은 알림
                <br />
                전체 읽음
              </span>
            </Button>
          </React.Fragment>
        );
      default:
        return (
          <Button
            sx={{
              fontSize: "1rem",
              textAlign: "center",
              color: "rgba(0,0,0,0.7)",
            }}
            onClick={() => {
              deleteAllReadNotice(setNoticeList, userInfo);
              setCheck(true);
            }}
          >
            읽은 알림 전체 삭제
          </Button>
        );
    }
  };
  const updateModal = () => {
    setIsReadHandler(!isRead);
  };
  const containerRef = React.useRef();

  return (
    <div>
      <Toastify newNotice={newNotice} />
      <Badge
        variant="contained"
        color="info"
        badgeContent={unRead ? unRead.length : 0} //알림 개수
        max={99}
        showZero //알림 개수가 0일때 숫자 0이 보이도록 설정
        onClick={handleClick}
        overlap="circular"
      >
        <NotificationsOutlined
          sx={{
            color: "rgba(0,0,0,0.7);",
            fontSize: "35px",
            cursor: noticeList.length > 0 ? "pointer" : "",
          }}
        />
      </Badge>

      {noticeList.length > 0 ? (
        <Box ref={containerRef}>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            container={containerRef.current}
            sx={{ height: "650px" }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Tabs onChange={handleChange} value={selectedTab}>
                {/* label이라는 객체의 값만으로 map을 돌림 */}
                {Object.values(label).map((la) => {
                  return (
                    <CustomTab label={la} key={la} sx={{ color: "#3791f8" }} />
                  ); //09.02 키 변경
                })}
              </Tabs>
            </Box>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "5px",
              }}
            >
              {tabContentButton()}
            </div>

            <Box>
              {tabContent().length > 0 ? (
                tabContent().map((notice) => {
                  return (
                    <div
                      key={notice.noticeNo}
                      style={{
                        color: noticeColor[notice.isRead],
                        margin: 0,
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          width: "450px",

                          display: "flex",
                          padding: "16px 30px 16px 30px",
                        }}
                      >
                        {notice.urlParams ? (
                          <Link
                            to={notice.urlParams}
                            style={{
                              color:
                                notice.isRead === 0 ? "#3791f8" : "lightgray",
                              ":hover": {
                                cursor: "pointer",
                              },
                            }}
                          >
                            {notice.content}
                          </Link>
                        ) : (
                          <Box
                            sx={{
                              color: notice.isRead ? "lightgray" : "#356599",
                            }}
                          >
                            {notice.content}
                          </Box>
                        )}
                        <Box
                          sx={{
                            marginLeft: "10px",
                            alignItems: "center",
                            fontSize: "16px",
                          }}
                        >
                          <span
                            style={{
                              color:
                                notice.isRead === 0 && notice.urlParams
                                  ? "#3791f8"
                                  : notice.isRead === 0
                                  ? "#356599"
                                  : "lightgray",
                              padding: "0",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (!notice.isRead) {
                                updateNotice(
                                  notice.noticeNo,
                                  notice.sender,
                                  notice.receiver,
                                  notice.content,
                                  notice.sendDate,
                                  updateModal
                                );
                              }
                            }}
                          >
                            읽음
                          </span>
                          <DeleteOutline
                            sx={{
                              margin: "-4px auto",
                              color:
                                notice.isRead === 0 && notice.urlParams
                                  ? "#3791f8"
                                  : notice.isRead === 0
                                  ? "#356599"
                                  : "lightgray",
                              fontSize: "19px",
                              ":hover": {
                                cursor: "pointer",
                              },
                            }}
                            onClick={() => {
                              deleteNotice(notice.noticeNo);
                              setCheck(!check);
                              if (tabContent().length === 1) {
                                handleClose();
                              }
                            }}
                          />
                        </Box>
                      </Box>
                      <Box
                        style={{
                          fontSize: "15px",
                          fontWeight: 300,
                          color: noticeColor[notice.isRead],
                          display: "inline-block",
                          padding: "0px 16px 16px 30px",
                        }}
                      >
                        {notice.sendDate}
                      </Box>
                    </div>
                  );
                })
              ) : (
                <div>
                  <Typography sx={{ p: 3, marginTop: "0 !important" }}>
                    존재하는 알림이 없습니다!
                  </Typography>
                </div>
              )}
            </Box>
          </Popover>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}
