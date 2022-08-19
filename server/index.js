const webSocketsServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});

// 방 목록 생성
const rooms = new Map();
// 방에 유저 상태
const roomActivity = new Map();
// 유저 정보
const user = new Map();
// 클라이언트
const clients = {};
// 현재 방에 있는 채팅 내용
const roomContent = new Map();
// 메시지 content
let editorContent = null;

// 메시지 타입
const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange",
  OPEN_USER: "open",
  CHAT: "chat",
};

// uniqueID 생성
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

// 메시지 전송
const sendMessage = (json) => {
  // 자신과 같은 방에 있는 유저 검색
  const workspace = rooms.get(json.data.room);
  const message = JSON.stringify(json);
  // 자신과 같은 방에 있는 유저에게 메시지 전달
  workspace.map((client) => {
    for (let id in client) {
      client[id].sendUTF(message);
    }
  });
};
// 채팅 메시지 전송
const sendChat = (json, room) => {
  // 자신과 같은 방에 있는 유저 검색
  const workspace = rooms.get(room);
  const message = JSON.stringify(json);
  // 자신과 같은 방에 있는 유저에게 메시지 전달
  workspace.map((client) => {
    for (let id in client) {
      client[id].sendUTF(message);
    }
  });
};
// 연결되었을 때 아이디 전송
const sendMyId = (json, connection) => {
  connection.sendUTF(JSON.stringify(json));
};

// 채팅메시지를 전송
// const sendChat = (json, room) => {
//   const workspace = rooms.get(room);
//   console.log(client);
// };

wsServer.on("request", function (request) {
  // 유저에게 UniqueID 할당
  let userID = getUniqueID();
  // 요청받은 주소의 room번호를 가져옴
  const room = request.resourceURL.query.room;
  console.log(
    new Date() +
      " Recieved a new connection from origin " +
      request.origin +
      "."
  );

  const connection = request.accept(null, request.origin);

  // 자신의 ID 전송
  console.log(user.get(room));
  sendMyId(
    roomContent.get(room)
      ? {
          id: userID,
          room: room,
          type: typesDef.OPEN_USER,
          prevData: roomContent.get(room),
          user: user.get(room),
        }
      : {
          id: userID,
          room: room,
          type: typesDef.OPEN_USER,
          user: user.get(room) ? user.get(room) : [],
        },
    connection
  );

  console.log(
    "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );
  // 키값은 room번호로하여 해당 room에 들어온 유저 목록 추가
  rooms.set(
    room,
    rooms.get(room)
      ? [...rooms.get(room), { [userID]: connection }]
      : [{ [userID]: connection }]
  );

  // client가 메시지를 전송하였을때 실행
  connection.on("message", function (message) {
    msgSender(message, room, userID);
  });

  //유저가 방을 나갔을 때
  connection.on("close", function (message) {
    console.log(new Date() + " Peer " + userID + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    const roomUser = user.get(room);

    let sender = "";
    if (roomUser.length) {
      roomUser.map((exitUser, index) => {
        if (exitUser[userID]) {
          let today = new Date();
          sender = exitUser[userID].user;
          roomActivity.set(
            room,
            roomActivity.get(room)
              ? [
                  ...roomActivity.get(room),
                  {
                    message: `${sender}님이 퇴장하셨습니다.`,
                    sender: userID,
                    time: `${today.getHours()} : ${today.getMinutes()}`,
                  },
                ]
              : [
                  {
                    message: `${sender}님이 퇴장하셨습니다.`,
                    sender: userID,
                    time: `${today.getHours()} : ${today.getMinutes()}`,
                  },
                ]
          );
          const arr = user.get(room).filter((v) => v !== user.get(room)[index]);
          user.set(room, arr);

          // 유저가 퇴장 후 방에 유저가 아무도 없으면 방 삭제
          if (user.get(room).length === 0) {
            rooms.delete(room);
            roomActivity.delete(room);
            roomContent.delete(room);
            // 유저가 퇴장 후 방에 유저가 있으면 퇴장메시지 전송
          } else {
            userActivity = roomActivity.get(room);
            json.data = {
              users: user.get(room),
              senderID: userID,
              senderName: sender,
              userActivity: roomActivity.get(room),
              room,
            };
            sendMessage(json);
          }
        }
      });
    }
  });
});

function msgSender(message, room, userID) {
  return new Promise((resolve) => {
    for (let target of rooms.entries()) {
      // 같은방에 있는 사람인지 반복문으로 확인해 메시지 발송
      if (room == target[0]) {
        if (message.type === "utf8") {
          var dataFromClient = JSON.parse(message.utf8Data);
          dataFromClient.room = room;
          const json = { type: dataFromClient.type };
          // 유저가 접속했을 때
          let today = new Date();
          if (dataFromClient.type === typesDef.USER_EVENT) {
            //유저 목록에 유저 추가
            user.set(
              room,
              user.get(room)
                ? [...user.get(room), { [userID]: dataFromClient }]
                : [{ [userID]: dataFromClient }]
            );
            roomActivity.set(
              room,
              roomActivity.get(room)
                ? [
                    ...roomActivity.get(room),
                    {
                      message: `${dataFromClient.user}님이 입장하셨습니다.`,
                      sender: userID,
                      time: `${today.getHours()} : ${today.getMinutes()}`,
                    },
                  ]
                : [
                    {
                      message: `${dataFromClient.user}님이 입장하셨습니다.`,
                      sender: userID,
                      time: `${today.getHours()} : ${today.getMinutes()}`,
                    },
                  ]
            );
          } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
            editorContent = dataFromClient.content;
            roomContent.set(room, editorContent);
          } else if (dataFromClient.type === typesDef.CHAT) {
            roomActivity.get(room).push({
              message: dataFromClient.chat,
              sender: userID,
              username: dataFromClient.user,
              time: `${today.getHours()} : ${today.getMinutes()}`,
            });
            // roomActivity.set(room,)
          }
          // 전송 목록 (현재 유저목록, content, 유저 기록, 방 번호,senderID,메시지 길이)
          json.data = {
            users: user.get(room),
            editorContent,
            senderID: userID,
            senderName: dataFromClient.user,
            userActivity: roomActivity.get(room),
            prevData: roomContent.get(room) ? roomContent.get(room) : null,
            room,
            chat: dataFromClient.chat,
          };
          // console.log(json.data);
          json.userEvent = dataFromClient.type;
          json.len = dataFromClient.len;
          sendMessage(json);
        }
      }
    }
  });
}
