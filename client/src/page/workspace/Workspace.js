import React, { useState, useEffect } from "react";
import { w3cwebsocket } from "websocket";
import { cutByLen } from "../../component/byteLength/getByte";
import { getUser } from "../../component/getUser/getUser";
import QuillEditor from "./QuillEditor";
import Identicon from "react-identicons";
import { UncontrolledTooltip } from "reactstrap";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "../../App.css";
import { getTempContent, getWorkspace } from "../../api/workspaceApi";
import Header from "../main/Header";
import { Box, Button, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";

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
          // username: this.state.username,
          user: user.name,
          content: message,
          len: textList.length - index,
        })
      );
    });
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
  console.log(client);
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

  return (
    <React.Fragment>
      <Header />
      {/**워크스페이스에 헤더만 나타나게 하려고 index.js에서 분리해서 Header 첨부함 */}
      <div className="container-fluid">
        <div className="main-content">
          <div className="document-holder">
            <div className="currentusers">
              {users.users &&
                users.users.map((user, index) => {
                  let username = "";
                  for (let key in user) {
                    username = user[key].user;
                  }
                  return (
                    <React.Fragment key={username + index}>
                      <span id={username} className="userInfo" key={username}>
                        <Identicon
                          className="account__avatar"
                          // 프로필로 변경 예정
                          style={{ backgroundColor: user.randomcolor }}
                          size={40}
                          string={username}
                        />
                      </span>
                      <UncontrolledTooltip placement="top" target={username}>
                        {username}
                      </UncontrolledTooltip>
                    </React.Fragment>
                  );
                })}
            </div>
            <QuillEditor
              onEditorStateChange={onEditorStateChange}
              setMessage={setMessage}
              message={message}
              workspace={workspace}
            />
          </div>
          <div className="history-holder">
            <ul>
              {users.userActivity &&
                users.userActivity.map((activity, index) => {
                  console.log(activity);
                  if (activity.username) {
                    console.log(myId);
                    if (activity.sender === myId) {
                      return (
                        <li key={`activity-${index}`} className="myChat">
                          {activity.time}
                          {"    "}
                          {activity.message}
                        </li>
                      );
                    } else {
                      return (
                        <li key={`activity-${index}`} className="userChat">
                          {activity.username} : {activity.message}{" "}
                          {activity.time}
                        </li>
                      );
                    }
                  } else {
                    return (
                      <li key={`activity-${index}`} className="attend">
                        {activity.message} {activity.time}
                      </li>
                    );
                  }
                })}
            </ul>
            <div>
              <input id="chat" />
              <Button
                onClick={() => {
                  const chatMessage = document.getElementById("chat");
                  chatMessage.value && sendChat(chatMessage.value);
                  chatMessage.value = "";
                  chatMessage.focus();
                }}
              >
                전송
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Workspace;
