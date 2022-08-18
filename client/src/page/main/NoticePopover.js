import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import { Badge, Box, styled, Tabs } from "@mui/material";
import { DeleteOutline, Notifications } from "@mui/icons-material";
import { Popover } from "@mui/material";
import { deleteNotice, updateNotice } from "../../api/noticeApi";

//notice.isRead가 1이 되면 글자색이 lightgray가 됨
const noticeColor = {
  0: "",
  1: "lightgray",
};

export function NoticePopover({ noticeList }) {
  const [anchorEl, setAnchorEl] = useState(null);

  //읽은 알림은 전체 알림 개수에서 제외하는 것
  const unRead = noticeList.filter((notice) => notice.isRead !== 1);

  //읽지 않은 알림은 전체 알림 개수에서 읽은 알림만큼 제외
  const read = noticeList.filter((notice) => notice.isRead !== 0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const label = {
    0: `전체 ${noticeList.length}`,
    1: `읽은 알림 ${read.length}`,
    2: `읽지 않은 알림 ${unRead.length} `,
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (e, newValue) => {
    setSelectedTab(newValue);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const tabContent = () => {
    switch (selectedTab) {
      case 0:
        return noticeList;
      case 1:
        return read;

      case 2:
        return unRead;
    }
  };
  return (
    <div>
      <Badge
        variant="contained"
        color="info"
        badgeContent={unRead.length} //알림 개수
        max={99}
        style={{ fontSize: "10px" }}
        showZero //알림 개수가 0일때 숫자 0이 보이도록 설정
        onClick={handleClick}
        overlap="circular"
      >
        <Notifications sx={{ color: "#3791F8", fontSize: "30px" }} />
      </Badge>
      {noticeList.length > 0 ? (
        <Box>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ height: "600px" }}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  onChange={handleChange}
                  value={selectedTab}
                  sx={{ margin: "0 auto", justifyContent: "center" }}
                >
                  {/* label이라는 객체의 값만으로 map을 돌림 */}
                  {Object.values(label).map((la, index) => {
                    return (
                      <Tab
                        label={la}
                        sx={{ fontSize: "1rem", textAlign: "center" }}
                        key={index}
                      />
                    );
                  })}
                </Tabs>
              </Box>
              {tabContent().length > 0 ? (
                tabContent().map((notice) => {
                  return (
                    <div key={notice.noticeNo}>
                      <Typography
                        sx={{ p: 3 }}
                        style={{ color: noticeColor[notice.isRead] }}
                        onClick={() => {
                          updateNotice(
                            notice.noticeNo,
                            notice.sender,
                            notice.receiver,
                            notice.content
                          );
                        }}
                      >
                        {notice.content}
                        <DeleteOutline
                          sx={{
                            margin: "0 auto",
                            color:
                              notice.isRead === 0 ? "#3791F8" : "lightgray",
                          }}
                          onClick={() => deleteNotice(notice.noticeNo)}
                        />
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
