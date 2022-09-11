import React, { useState, useEffect, useRef } from "react";
import { w3cwebsocket } from "websocket";
import { cutByLen } from "../../component/byteLength/getByte";
import { getUser } from "../../component/getUser/getUser";
import QuillEditor from "./QuillEditor";
import { UncontrolledTooltip } from "reactstrap";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "../../App.css";
import { getTempContent, getWorkspace } from "../../api/workspaceApi";
import Header from "../main/Header";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Save, Send } from "@mui/icons-material";
import { theme } from "../../Config";
import { InputBox } from "../main/WriteModal";
import styled from "styled-components";

function Workspace() {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState({});
  const [myId, setMyId] = useState("");
  const [users, setUsers] = useState({});
  const [workspace, setWorkspace] = useState({});
  const URLSearch = new URLSearchParams(window.location.search);
  const workspaceNo = URLSearch.get("room");
  const user = getUser();

  const sendChat = (chat) => {
    client.send(
      JSON.stringify({
        type: "chat",
        user: user.name,
        chat: chat,
      })
    );
  };

  const onEditorStateChange = (text) => {
    const textList = cutByLen(text);
    textList.forEach((message, index) => {
      client.send(
        JSON.stringify({
          type: "contentchange",
          user: user.name,
          content: message,
          len: textList.length - index,
        })
      );
    });
  };
  const style = {
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    maxHeight: "78vh",
    minHeight: "78vh",
    overflowY: "scroll",
  };

  //inputBox style
  const inputStyle = {
    width: "80%",
    height: "40px !important",
    "& legend": {
      display: "none",
    },
    border: "none",
    marginLeft: "10px",
    "&:focus": {
      outline: "none !important",
    },
    "&:active": {
      outline: "none !important",
    },
    ":-webkit-autofill": {
      "-webkitBoxShadow": "0 0 0 1000px white inset",
      boxShadow: "0 0 0 1000px white inset",
    },
    padding: "0px !important",
  };

  useEffect(() => {
    getWorkspace(workspaceNo, setWorkspace);
    if (workspace.workspaceNo) {
      setClient(
        new w3cwebsocket(
          "ws://localhost:8000/document" + window.location.search
        ) /**소켓 통신 확인하려고 localhost로 변경했음 */
      );
    }
  }, [workspace.workspaceNo]);

  console.log(window.location.search);
  if (client) {
    client.onopen = () => {
      client.send(
        JSON.stringify({
          user: user.name,
          type: "userevent",
        })
      );
    };
    let text = "";
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer.userEvent === "contentchange") {
        if (dataFromServer.data.senderID !== myId) {
          text += dataFromServer.data.editorContent;
          if (dataFromServer.len === 1) {
            setMessage(text);
            text = "";
          }
        }
        // 유저 접속시
      } else if (dataFromServer.type === "open") {
        setMyId(dataFromServer.id);
        console.log(dataFromServer);
        if (dataFromServer.user.length === 0) {
          console.log(workspace);
          workspace.tempFile &&
            getTempContent(workspace.tempFile.fileNo, setMessage);
        } else {
          dataFromServer.prevData && setMessage(dataFromServer.prevData);
        }
      } else {
        setUsers({
          users: dataFromServer.data.users,
          userActivity: dataFromServer.data.userActivity,
          senderID: dataFromServer.data.senderID,
        });
      }
    };
  }
  //엔터만 쳐도 채팅창이 보내지도록
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      const chatMessage = document.getElementById("chat");
      chatMessage.value && sendChat(chatMessage.value);
      chatMessage.value = "";
      chatMessage.focus();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/**워크스페이스에 헤더만 나타나게 하려고 index.js에서 분리해서 Header 첨부함 */}
        <Header />
        {/* 프로필 그룹으로 띄워주도록 */}
        <div className="container-fluid" style={{ marginLeft: "20px" }}>
          <AvatarGroup
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            max={5}
          >
            {users.users &&
              users.users.map((user, index) => {
                let username = "";
                for (let key in user) {
                  username = user[key].user;
                }
                return (
                  <Box key={username + index}>
                    <Avatar
                      alt={username}
                      src="/static/images/avatar/1.jpg"
                      id={username}
                      className="userInfo"
                      key={username}
                      sizes="50px"
                      sx={{ marginLeft: "-8px" }}
                    />

                    <UncontrolledTooltip placement="top" target={username}>
                      {username}
                    </UncontrolledTooltip>
                  </Box>
                );
              })}
          </AvatarGroup>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "80% 20%",
              height: "100%",
            }}
          >
            <QuillEditor
              onEditorStateChange={onEditorStateChange}
              setMessage={setMessage}
              message={message}
              workspace={workspace}
            />
            <Box
              sx={{
                padding: "10px",
                marginLeft: "10px",
                height: "100vh",
              }}
            >
              <Box sx={style}>
                <Box sx={{ height: "90%", width: "100%" }}>
                  {users.userActivity &&
                    users.userActivity.map((activity, index) => {
                      // console.log(activity);
                      if (activity.username) {
                        // console.log(myId);
                        if (activity.sender === myId) {
                          return (
                            //내가 보낸 채팅
                            <Box>
                              <Box
                                key={`activity-${index}`}
                                className="myChat"
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <span>{activity.time}</span>
                                <Chip
                                  label={activity.message}
                                  variant="outlined"
                                  sx={{ marginLeft: "5px" }}
                                />
                              </Box>
                            </Box>
                          );
                        } else {
                          return (
                            //내가 아닌 유저의 채팅
                            <Box
                              key={`activity-${index}`}
                              className="userChat"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Avatar />
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginLeft: "15px",
                                }}
                              >
                                <Typography>{activity.username}</Typography>
                                <Box sx={{ display: "flex" }}>
                                  <Chip
                                    label={activity.message}
                                    color="primary"
                                    sx={{
                                      backGroundColor: "#3791f8",
                                      marginRight: "5px",
                                    }}
                                  />{" "}
                                  <span>{activity.time}</span>
                                </Box>
                              </Box>
                            </Box>
                          );
                        }
                      } else {
                        return (
                          //입장 퇴장 메시지
                          <Box
                            key={`activity-${index}`}
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Chip
                              label={activity.message + activity.time}
                              key={`activity-${index}`}
                              className="attend"
                              sx={{ marginBottom: "10px" }}
                            />
                          </Box>
                        );
                      }
                    })}
                </Box>
              </Box>
              {/* 대화 입력창 */}
              <div>
                <TextField
                  id="chat"
                  placeholder="메시지를 입력하세요"
                  onKeyPress={onKeyPress}
                  sx={inputStyle}
                />
                <Button
                  onClick={() => {
                    const chatMessage = document.getElementById("chat");
                    chatMessage.value && sendChat(chatMessage.value);
                    chatMessage.value = "";
                    chatMessage.focus();
                  }}
                >
                  <Send />
                </Button>
              </div>
            </Box>
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default Workspace;
