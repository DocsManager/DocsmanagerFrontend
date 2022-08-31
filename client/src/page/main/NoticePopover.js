import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import { Badge, Box, Tabs, Button } from "@mui/material";
import {
  DeleteOutline,
  Notifications,
  NotificationsOutlined,
} from "@mui/icons-material";
import { Popover } from "@mui/material";
import {
  deleteNotice,
  updateNotice,
  updateAllNotce,
  deleteAllNotice,
} from "../../api/noticeApi";
import Toastify from "../Toast";
import { NoticeContext } from "./Header";
import { withStyles } from "@material-ui/styles";

//notice.isRead가 1이 되면 글자색이 lightgray가 됨
const noticeColor = {
  0: "black",
  1: "lightgray",
};

export function NoticePopover({ noticeList, setNoticeList, newNotice }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isRead, setIsReadHandler } = useContext(NoticeContext);

  //읽은 알림은 전체 알림 개수에서 제외하는 것
  const unRead =
    noticeList && noticeList.filter((notice) => notice.isRead !== 1);

  //읽지 않은 알림은 전체 알림 개수에서 읽은 알림만큼 제외
  const read = noticeList && noticeList.filter((notice) => notice.isRead !== 0);

  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const label = {
    0: `전체 ${noticeList.length}`,
    1: `읽은 알림 ${read.length}`,
    2: `읽지 않은 알림 ${unRead.length} `,
    // 3: <Button>전체 알림 삭제</Button>,
    // 4: <Button>전체 알림 읽음</Button>,
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (e, newValue) => {
    console.log(e, newValue);
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
      color: "#3791F8",
      fontWeight: "bolder",
    },
  })(Tab);

  const tabContent = () => {
    switch (selectedTab) {
      case 0:
        return noticeList;
      case 1:
        return read;

      case 2:
        return unRead.length == 0 ? (
          <div>존재하는 알림이 없습니다</div>
        ) : (
          unRead
        );
    }
  };

  const updateModal = (isRead, setIsReadHandler) => {
    isRead ? setIsReadHandler(false) : setIsReadHandler(true);
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
        // style={{ fontSize: "1rem", marginLeft: "-5px" }}
        showZero //알림 개수가 0일때 숫자 0이 보이도록 설정
        onClick={handleClick}
        overlap="circular"
      >
        <NotificationsOutlined
          sx={{ color: "rgba(0,0,0,0.7);", fontSize: "35px" }}
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
            sx={{ height: "600px" }}
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
                  return <CustomTab label={la} key={la.key} />;
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
              <Button
                sx={{
                  fontSize: "1rem",
                  textAlign: "center",
                }}
                onClick={() => deleteAllNotice(setNoticeList)}
              >
                전체 알림 삭제
              </Button>
              <Button
                sx={{
                  fontSize: "1rem",
                  textAlign: "center",
                }}
                onClick={() => {
                  updateAllNotce(noticeList, setNoticeList);
                  updateModal(isRead, setIsReadHandler);
                }}
              >
                전체 알림 읽음
              </Button>
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
                      <Typography
                        sx={{
                          p: 2,
                          width: "380px",
                        }}
                        onClick={() => {
                          updateNotice(
                            notice.noticeNo,
                            notice.sender,
                            notice.receiver,
                            notice.content,
                            notice.sendDate
                          );
                          updateModal(isRead, setIsReadHandler);
                          // setChangeNotice(false);
                        }}
                      >
                        {notice.content}

                        <DeleteOutline
                          sx={{
                            margin: "-4px auto",
                            color:
                              notice.isRead === 0 ? "#3791f8" : "lightgray",
                          }}
                          onClick={() => deleteNotice(notice.noticeNo)}
                        />
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: 300,
                            color: noticeColor[notice.isRead],
                            display: "inline-block",
                          }}
                        >
                          {notice.sendDate}
                        </span>
                      </Typography>
                    </div>
                  );
                })
              ) : (
                <div>
                  <Typography sx={{ p: 3 }}>
                    존재하는 알림이 없습니다.
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
