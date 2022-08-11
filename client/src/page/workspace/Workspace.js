import React, { useState, useEffect } from "react";
import { w3cwebsocket } from "websocket";
import { cutByLen } from "../../component/byteLength/getByte";
import QuillEditor from "../../component/editor/QuillEditor";
import { getUser } from "../../component/getUser/getUser";
import Identicon from "react-identicons";
import { UncontrolledTooltip } from "reactstrap";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "../../App.css";

function Workspace() {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState({});
  const [myId, setMyId] = useState("");
  const [users, setUsers] = useState({});
  const user = getUser();

  const onEditorStateChange = (text) => {
    const textList = cutByLen(text);
    textList.forEach((message, index) => {
      client.send(
        JSON.stringify({
          type: "contentchange",
          // username: this.state.username,
          user: getUser().name,
          content: message,
          len: textList.length - index,
        })
      );
    });
  };

  useEffect(() => {
    setClient(new w3cwebsocket("ws://127.0.0.1:8000" + window.location.search));
  }, []);
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
            // dataFromServer.data.editorContent = text;
            setMessage(text);
            text = "";
            // dataFromServer.data.editorContent = "";
          }
        }
        // 유저 접속시
      } else if (dataFromServer.type === "open") {
        setMyId(dataFromServer.id);
        dataFromServer.prevData && setMessage(dataFromServer.prevData);
        console.log(dataFromServer.id);
      } else {
        // console. log({dataFromServer.data.users});
        setUsers({
          users: dataFromServer.data.users,
          userActivity: dataFromServer.data.userActivity,
        });
        // dataFromServer.preData && setMessage(dataFromServer.prevData);
      }
    };
  }
  return (
    <React.Fragment>
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
            />
          </div>
          <div className="history-holder">
            <ul>
              {users.userActivity &&
                users.userActivity.map((activity, index) => (
                  <li key={`activity-${index}`}>{activity}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Workspace;
