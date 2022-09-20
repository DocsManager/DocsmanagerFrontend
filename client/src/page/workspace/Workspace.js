import React, { useState, useEffect, useRef, useContext } from "react";
import { w3cwebsocket } from "websocket";
import { cutByLen } from "../../component/byteLength/getByte";
import QuillEditor from "./QuillEditor";
import { UncontrolledTooltip } from "reactstrap";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "../../App.css";
import { getTempContent, getWorkspace } from "../../api/workspaceApi";
// import { workspaceMember } from "../../api/workspaceUserApi";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { InputBox } from "../main/WriteModal";
import { MyContext } from "../Main";
import { checkMember } from "../../api/workspaceUserApi";

function Workspace() {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState({});
  const [myId, setMyId] = useState("");
  const [users, setUsers] = useState({});
  const [workspace, setWorkspace] = useState({});
  const [memberCheck, setMemberCheck] = useState(false);
  // const [userList, setUserList] = useState([]);
  const URLSearch = new URLSearchParams(window.location.search);
  const workspaceNo = URLSearch.get("room");
  const scrollRef = useRef();
  const { userInfo } = useContext(MyContext);
  // useEffect(() => {
  //   workspaceMember(workspaceNo, setUserList);
  // }, []);

  useEffect(() => {
    !memberCheck && checkMember(workspaceNo, userInfo.userNo, setMemberCheck);
    if (memberCheck) {
      getWorkspace(workspaceNo, setWorkspace);
      if (workspace.workspaceNo) {
        setClient(
          new w3cwebsocket(
            "ws://43.201.22.120:8000/document" + window.location.search
          ) /**소켓 통신 확인하려고 localhost로 변경했음 */
        );
      }
    }
  }, [workspace.workspaceNo, memberCheck]);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  const sendChat = (chat) => {
    client.send(
      JSON.stringify({
        type: "chat",
        user: userInfo,
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
          user: userInfo,
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
    maxHeight: "82vh",
    minHeight: "82vh",
    overflowY: "scroll",
    marginTop: "50px",
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
      webkitBoxShadow: "0 0 0 1000px white inset",
      boxShadow: "0 0 0 1000px white inset",
    },
    padding: "0px !important",
  };

  if (client) {
    client.onopen = () => {
      client.send(
        JSON.stringify({
          user: userInfo,
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
        if (dataFromServer.user.length === 0) {
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
    <Box>
      {/**워크스페이스에 헤더만 나타나게 하려고 index.js에서 분리해서 Header 첨부함 */}
      {/* <Header /> */}
      {/* 프로필 그룹으로 띄워주도록 */}
      <div
        className="container-fluid"
        style={{
          marginLeft: "20px",
          display: "grid",
          gridTemplateColumns: "80% 20%",
        }}
      >
        <Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LaptopMacOutlinedIcon
                sx={{ marginRight: "10px", fontSize: "70px", color: "#3791f8" }}
              />{" "}
              <Typography>{workspace.title}</Typography>
            </Box>
            <AvatarGroup
              sx={{
                marginLeft: "30px",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              max={5}
            >
              {users.users &&
                users.users.map((user, index) => {
                  for (let key in user) {
                    user = user[key].user;
                  }
                  return (
                    <Box key={user.userNo}>
                      <Avatar
                        alt={user.name}
                        src={
                          user.profile
                            ? user.profile
                            : "/static/images/avatar/1.jpg"
                        }
                        id={user.name}
                        className="userInfo"
                        key={user.name}
                        sizes="50px"
                        sx={{ marginLeft: "-8px !important" }}
                      />

                      <UncontrolledTooltip placement="top" target={user.name}>
                        {user.name}
                      </UncontrolledTooltip>
                    </Box>
                  );
                })}
            </AvatarGroup>
          </Box>
          <QuillEditor
            onEditorStateChange={onEditorStateChange}
            setMessage={setMessage}
            message={message}
            workspace={workspace}
          />
        </Box>
        <Box
          sx={{
            padding: "10px",
            marginLeft: "10px",
            height: "100vh",
          }}
        >
          <Box sx={style} id="chatBox" ref={scrollRef}>
            <Box sx={{ height: "90%", width: "100%" }} id="chatRoom">
              {users.userActivity &&
                users.userActivity.map((activity, index) => {
                  if (activity.username) {
                    if (activity.sender.userNo === userInfo.userNo) {
                      return (
                        //내가 보낸 채팅
                        <Box key={`activity-${index}`}>
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
                            marginLeft: "10px",
                          }}
                        >
                          <Avatar src={activity.sender.profile} />
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: "10px",
            }}
          >
            <InputBox
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
      </div>
    </Box>
  );
}

export default Workspace;
