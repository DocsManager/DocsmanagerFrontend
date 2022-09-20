import axios from "axios";
import * as StompJs from "@stomp/stompjs";
import "react-toastify/dist/ReactToastify.css";
import "../page/Toast.css";

const baseUrl = "/api/";

export function getNoticeList(setNoticeList, user) {
  const url = baseUrl + "notice/receiver/" + user.userNo;
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
  noticeSendDate,
  updateModal
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
    .then(() => updateModal())
    .catch((err) => console.log(err));
}

//전체 알림 읽음 처리
export function updateAllNotce(noticeList, user) {
  const url = baseUrl + `notice/receiver/${user.userNo}/all`;
  let arr = [];
  const unRead = noticeList.filter((notice) => notice.isRead !== 1);
  // const read = noticeList.filter((notice) => notice.isRead === 1);
  unRead.map((notice) => {
    arr.push({
      noticeNo: notice.noticeNo,
      sender: notice.sender,
      receiver: notice.receiver,
      content: notice.content,
      isRead: 1,
      sendDate: notice.sendDate,
    });
    return notice;
  });
  axios.put(url, arr).catch((err) => console.log(err));
}

const socketUrl = "ws://3.39.187.48:8080/ws-dm/websocket";
// const socketUrl = "ws://localhost:8080/ws-dm/websocket"; //당장 통신 확인하려고 로컬로 서버 바꿈

// const client = new StompJs.Client();
const client = new StompJs.Client({
  brokerURL: socketUrl,
  connectHeaders: {
    login: "user",
    passcode: "password",
  },
  // debug: function(str) {
  //   console.log(str);
  // },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

export const wsDocsSubscribe = (
  setNewNotice,
  setNoticeList,
  noticeList,
  setCheck,
  count,
  user
) => {
  client.onConnect = () => {
    // console.log("연결됨");

    client.subscribe(`/queue/sharedocs/${user.id}`, ({ body }) => {
      const dataFromServer = JSON.parse(body);
      count += 1;
      setNewNotice(dataFromServer);
      setCheck(count % 2 === 1 ? true : false);
      getNoticeList(setNoticeList, user);
    });
    client.subscribe(`/queue/workspace/${user.id}`, ({ body }) => {
      const dataFromServer = JSON.parse(body);
      setNewNotice(dataFromServer);
      count += 1;
      setCheck(count % 2 === 1 ? true : false);
      // setNoticeList(
      //   noticeList.length === 0
      //     ? [dataFromServer]
      //     : [...noticeList, dataFromServer]
      // );
      getNoticeList(setNoticeList, user);
    });

    client.subscribe(`/queue/workspace/member/${user.id}`, ({ body }) => {
      const dataFromServer = JSON.parse(body);
      count += 1;
      setNewNotice(dataFromServer);
      // setNoticeList(
      //   noticeList.length === 0
      //     ? [dataFromServer]
      //     : [...noticeList, dataFromServer]
      // );
      setCheck(count % 2 === 1 ? true : false);
      getNoticeList(setNoticeList, user);
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

export const notipublish = (searchList, user, content, type, workspaceNo) => {
  if (!client.connected) {
    return;
  }
  searchList.map((element) => {
    return client.publish({
      destination: `/send/sharedocs`,
      body: JSON.stringify({
        sender: user,
        receiver: element,
        content: content,
        isRead: 0,
        urlParams: type ? null : "/main/share",
      }),
    });
  });
};
export const worksapcepublish = (searchList, newWorkspaceNo, user) => {
  if (!client.connected) {
    return;
  }
  searchList.map((element) => {
    return client.publish({
      destination: `/send/workspace`,
      body: JSON.stringify({
        sender: user,
        receiver: element,
        content: `${user.name}님이 워크스페이스에 초대했습니다`,
        isRead: 0,
        urlParams: `/main/document?room=${newWorkspaceNo}`,
      }),
      skipContentLengthHeader: true,
    });
  });
};

export const workspaceMemberAddPublish = (
  memberList,
  searchList,
  type,
  row,
  user
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
          sender: user,
          receiver: element,
          content: `${user.name}님이 공유 문서 멤버로 추가했습니다!`,
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
          sender: user,
          receiver: element,
          content: `${user.name}님이 워크스페이스 멤버로 추가했습니다!`,
          isRead: 0,
          urlParams: "/main/document?room=" + row.workspaceNo,
        }),
        skipContentLengthHeader: true,
      });
    }
    return element;
  });
};

export const deleteNotice = (noticeNo) => {
  const url = baseUrl + `notice/${noticeNo}`;
  axios.delete(url);
};

//전체 알림 삭제
export const deleteAllNotice = (setNoticeList, user) => {
  const url = baseUrl + `notice/receiver/${user.userNo}/all`;
  axios.delete(url).then((res) => setNoticeList([]));
};

// 읽지 않은 알림 전체 삭제
export const deleteAllUnreadNotice = (setNoticeList, user) => {
  const url = baseUrl + `notice/receiver/${user.userNo}/unread`;
  axios.delete(url).then((res) => setNoticeList(res.data));
};

//읽은 알림 전체 삭제
export const deleteAllReadNotice = (setNoticeList, user) => {
  const url = baseUrl + `notice/receiver/${user.userNo}/read`;
  axios.delete(url).then((res) => setNoticeList(res.data));
};
