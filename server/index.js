const webSocketsServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});

// Generates unique ID for every new connection
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
let users = {};
const user = new Map();

// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];
const roomActivity = new Map();

const sendMessage = (json, room) => {
  // We are sending the current data to all connected clients
  rooms.get(room).map((client) => {
    var clientID = Object.keys(client)[0];
    client[clientID].sendUTF(JSON.stringify(json));
  });
};

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange",
};

const rooms = new Map();
wsServer.on("request", function (request) {
  var userID = getUniqueID();
  const room = request.resourceURL.query.room;
  console.log(
    new Date() +
      " Recieved a new connection from origin " +
      request.origin +
      "."
  );
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  if (rooms.get(room)) {
    rooms.set(room, [...rooms.get(room), { [userID]: connection }]);
  } else {
    rooms.set(room, [{ [userID]: connection }]);
  }
  console.log(rooms);
  console.log(
    "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );
  connection.on("message", function (message) {
    msgSender(rooms.get(room), message, userID, room);
  });
  // user disconnected
  connection.on("close", function (connection) {
    console.log(new Date() + " Peer " + userID + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    users = user.get(room);
    if (roomActivity.get(room)) {
      roomActivity.set(room, [
        ...roomActivity.get(room),
        `${users[userID].username} 님이 퇴장하셨습니다.`,
      ]);
    } else {
      roomActivity.set(room, [
        `${users[userID].username} 님이 퇴장하셨습니다.`,
      ]);
    }
    userActivity = roomActivity.get(room);
    users = user.get(room);
    json.data = { users, userActivity };
    delete rooms.get(room)[userID];
    delete clients[userID];
    delete users[userID];
    sendMessage(json, room);
  });
});
function msgSender(identify, message, userID, room) {
  return new Promise((resolve, reject) => {
    for (let target of rooms.entries()) {
      //방 목록 객체를 반복문을 활용해 발송
      if (room == target[0]) {
        //같은방에 있는 사람이면 전송
        //타입별 전송 구간(최초접속,메시지전송,방나감)
        if (message.type === "utf8") {
          var dataFromClient = JSON.parse(message.utf8Data);
          dataFromClient.room = room;
          const json = { type: dataFromClient.type };
          if (dataFromClient.type === typesDef.USER_EVENT) {
            if (user.get(room)) {
              user.set(room, { ...user.get(room), [userID]: dataFromClient });
            } else {
              user.set(room, { [userID]: dataFromClient });
            }
            users = user.get(room);
            console.log(users);
            if (roomActivity.get(room)) {
              roomActivity.set(room, [
                ...roomActivity.get(room),
                `${users[userID].username} 님이 입장하셨습니다.`,
              ]);
            } else {
              roomActivity.set(room, [
                `${users[userID].username} 님이 입장하셨습니다.`,
              ]);
            }
            userActivity = roomActivity.get(room);
            users = user.get(room);
            json.data = { users, userActivity };
          } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
            editorContent = dataFromClient.content;
            json.data = { editorContent, userActivity };
          }
          sendMessage(json, room);
        }
      }
    }
    resolve("succ");
  });
}
