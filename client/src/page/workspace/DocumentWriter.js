import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Identicon from "react-identicons";
import { UncontrolledTooltip } from "reactstrap";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import "../../App.css";
import "react-quill/dist/quill.snow.css";
import BoardWriter from "../../component/editor/QuillEditor";

var client = null;
var contentDefaultMessage = null;
if (window.location.href.includes("main/document")) {
  client = new W3CWebSocket("ws://127.0.0.1:8000");
  contentDefaultMessage = "Start writing your document here";
}
class DocumentWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsers: [],
      userActivity: [],
      username: null,
      text: "",
    };
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };
  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];
  logInUser = () => {
    const username = this.username.value;
    if (username.trim()) {
      const data = {
        username,
      };
      this.setState(
        {
          ...data,
        },
        () => {
          client.send(
            JSON.stringify({
              ...data,
              type: "userevent",
            })
          );
        }
      );
    }
  };

  /* When content changes, we send the
current content of the editor to the server. */
  onEditorStateChange = (text, a) => {
    client.send(
      JSON.stringify({
        type: "contentchange",
        username: this.state.username,
        content: text,
      })
    );
  };

  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const stateToChange = {};
      if (dataFromServer.type === "userevent") {
        stateToChange.currentUsers = Object.values(dataFromServer.data.users);
      } else if (dataFromServer.type === "contentchange") {
        console.log(dataFromServer.data.editorContent);
        stateToChange.text =
          dataFromServer.data.editorContent || contentDefaultMessage;
      }
      stateToChange.userActivity = dataFromServer.data.userActivity;
      this.setState({
        ...stateToChange,
      });
    };
  }

  showLoginSection = () => (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <Identicon
              className="account__avatar"
              size={64}
              string="randomness"
            />
            <p className="account__name">Hello, user!</p>
            <p className="account__sub">Join to edit the document</p>
          </div>
          <input
            name="username"
            ref={(input) => {
              this.username = input;
            }}
            className="form-control"
          />
          <button
            type="button"
            onClick={() => this.logInUser()}
            className="btn btn-primary account__btn"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );

  showEditorSection = () => {
    return (
      <div className="main-content">
        <div className="document-holder">
          <div className="currentusers">
            {this.state.currentUsers.map((user) => (
              <React.Fragment>
                <span
                  id={user.username}
                  className="userInfo"
                  key={user.username}
                >
                  <Identicon
                    className="account__avatar"
                    style={{ backgroundColor: user.randomcolor }}
                    size={40}
                    string={user.username}
                  />
                </span>
                <UncontrolledTooltip placement="top" target={user.username}>
                  {user.username}
                </UncontrolledTooltip>
              </React.Fragment>
            ))}
            <button>임시 저장</button>
            <button>저장</button>
          </div>

          <BoardWriter props={this} />
        </div>
        <div className="history-holder">
          <ul>
            {this.state.userActivity.map((activity, index) => (
              <li key={`activity-${index}`}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  render() {
    const { username } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          {username ? this.showEditorSection() : this.showLoginSection()}
        </div>
      </React.Fragment>
    );
  }
}

export default DocumentWriter;
