import axios from "axios";
import { getUser } from "../component/getUser/getUser";
import * as StompJs from "@stomp/stompjs";
import "react-toastify/dist/ReactToastify.css";
import "../page/Toast.css";

const baseUrl = "/api/";

export function getNoticeList(setNoticeList) {
  const url = baseUrl + "notice/receiver/" + getUser().userNo;
  axios.get(url).then((res) => {
    setNoticeList(res.data);
  });
}

//개별 알림 읽음 처리
export function updateNotice(
  noticeNo,
  noticeSender,
  noticeReceiver,
  noticeContent,
  noticeSendDate
) {
  const url = baseUrl + `notice/${noticeNo}`;
  axios
    .put(
      url,

      {
        noticeNo: noticeNo,
        sender: noticeSender,
        receiver: noticeReceiver,
        content: noticeContent,
        isRead: 1,
        sendDate: noticeSendDate,
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

//전체 알림 읽음 처리
export function updateAllNotce(noticeList, setNoticeList) {
  const url = baseUrl + `notice/receiver/${getUser().userNo}/all`;
  let arr = [];
  const unRead = noticeList.filter((notice) => notice.isRead != 1);
  const read = noticeList.filter((notice) => notice.isRead == 1);
  unRead.map((notice) => {
    arr.push({
      noticeNo: notice.noticeNo,
      sender: notice.sender,
      receiver: notice.receiver,
      content: notice.content,
      isRead: 1,
      sendDate: notice.sendDate,
    });
  });
  console.log(arr);
  axios.put(url, arr).catch((err) => console.log(err));
}

// const socketUrl = "ws://3.39.187.48:8080/ws-dm/websocket";
const socketUrl = "ws://localhost:8080/ws-dm/websocket"; //당장 통신 확인하려고 로컬로 서버 바꿈

// const client = new StompJs.Client();
const client = new StompJs.Client({
  brokerURL: socketUrl,
  connectHeaders: {
    login: "user",
    passcode: "password",
  },
  debug: function(str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

export const wsDocsSubscribe = (setNewNotice, setNoticeList, noticeList) => {
  client.onConnect = () => {
    console.log("연결됨");

    client.subscribe(`/queue/sharedocs/${getUser().id}`, ({ body }) => {
      const dataFromServer = JSON.parse(body);
      console.log(dataFromServer);
      setNewNotice(dataFromServer);
      setNoticeList((noticeList) => [...noticeList, dataFromServer]);
    });
    client.subscribe(`/queue/workspace/${getUser().id}`, ({ body }) => {
      const dataFromServer = JSON.parse(body);
      setNewNotice(dataFromServer);
      setNoticeList(
        noticeList.length === 0
          ? [dataFromServer]
          : [...noticeList, dataFromServer]
      );
    });

    client.subscribe(`/queue/workspace/member/${getUser().id}`, ({ body }) => {
      const dataFromServer = JSON.parse(body);
      console.log(dataFromServer);
      setNewNotice(dataFromServer);
      setNoticeList(
        noticeList.length === 0
          ? [dataFromServer]
          : [...noticeList, dataFromServer]
      );
    });
  };

  client.onStompError = (frame) => {
    console.error(frame);
  };

  client.activate();
};

export const wsDisconnect = () => {
  client.deactivate();
};

export const notipublish = (searchList) => {
  if (!client.connected) {
    return;
  }
  searchList.map((element) => {
    return client.publish({
      destination: `/send/sharedocs`,
      body: JSON.stringify({
        sender: getUser(),
        receiver: element,
        content: `${getUser().name}님이 문서를 공유했습니다`,
        isRead: 0,
        urlParams: "/main/share",
      }),
    });
  });
};

export const worksapcepublish = (searchList, newWorkspaceNo) => {
  if (!client.connected) {
    return;
  }

  searchList.map((element) => {
    return client.publish({
      destination: `/send/workspace`,
      body: JSON.stringify({
        sender: getUser(),
        receiver: element,
        content: `${getUser().name}님이 워크스페이스에 초대했습니다`,
        isRead: 0,
        urlParams: `/document?room=${newWorkspaceNo}`,
        // urlParams: `/document?room=${workspace.workspaceNo.workspaceNo}`,
      }),
      skipContentLengthHeader: true,
    });
  });
};

export const workspaceMemberAddPublish = (
  memberList,
  searchList,
  type,
  row
) => {
  if (!client.connected) {
    return;
  }
  const newNember =
    searchList && searchList.filter((search) => !memberList.includes(search));
  newNember.map((element) => {
    if (type === "document") {
      return client.publish({
        destination: `/send/workspace/add`,
        body: JSON.stringify({
          sender: getUser(),
          receiver: element,
          content: `${getUser().name}님이 공유 문서 멤버로 추가했습니다!`,
          isRead: 0,
          urlParams: "/main/share",
        }),
        skipContentLengthHeader: true,
      });
    }
    if (type === "workspace") {
      return client.publish({
        destination: `/send/workspace/add`,
        body: JSON.stringify({
          sender: getUser(),
          receiver: element,
          content: `${getUser().name}님이 워크스페이스 멤버로 추가했습니다!`,
          isRead: 0,
          urlParams: "/document?room=" + row.workspaceNo,
        }),
        skipContentLengthHeader: true,
      });
    }
  });
};

export const deleteNotice = (noticeNo) => {
  const url = baseUrl + `notice/${noticeNo}`;
  axios.delete(url).then((res) => console.log(res.data));
};

//전체 알림 삭제
export const deleteAllNotice = (setNoticeList) => {
  const url = baseUrl + `notice/receiver/${getUser().userNo}/all`;
  axios.delete(url).then((res) => setNoticeList([]));
};
