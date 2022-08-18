import axios from "axios";
import { getUser } from "../component/getUser/getUser";
import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { Alert } from "@mui/material";
import { FolderShared } from "@mui/icons-material";

const baseUrl = "/api/";

console.log(getUser());

export function getNoticeList(setNoticeList) {
  const url = baseUrl + "notice/receiver/" + getUser().userNo;
  axios.get(url).then((res) => {
    setNoticeList(res.data);
  });
}

export function updateNotice(
  noticeNo,
  noticeSender,
  noticeReceiver,
  noticeContent
) {
  const url = baseUrl + `notice/${noticeNo}`;
  axios
    .put(
      url,
      //   {
      //   noticeNo: noticeNo,
      //   sender: noticeSender,
      //   receiver: noticeReceiver,
      //   content: noticeContent,
      //   isRead: 1,
      // }
      {
        noticeNo: noticeNo,
        sender: noticeSender.name,
        receiver: noticeReceiver.name,
        content: noticeContent,
        isRead: 1,
      }
    )
    .then((res) => {
      console.log(res.data);
    });
}

const socketUrl = "ws://localhost:8080/ws-dm/websocket";
const client = new StompJs.Client();

export const connect = () => {
  client.configure({
    brokerURL: socketUrl,
    connectHeaders: {
      "auth-token": "spring-notice-auth-token",
    },
    debug: function(str) {
      // console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log("연결됨");
      subscribe();
      workspaceSubscribe();
    },
    onStompError: (frame) => {
      console.error(frame);
    },
  });
  client.activate();
};

export const disconnect = () => {
  client.deactivate();
};

export const subscribe = (setNoticeList) => {
  client.subscribe(`/topic/notice`, ({ body }) => {
    setNoticeList((noticeList) => [...noticeList, JSON.parse(body)]);
  });
};
// export const showNotice = (setNewNotice, noticeList, newNotice) => {
//   // return (
//   setNewNotice(noticeList[noticeList.length - 1]);
//   return(<Alert severity="success" color="info" icon={<FolderShared />}>
//        {newNotice.content}
//      </Alert>)
//   // console.log(noticeList[noticeList.length - 1]);
//   //   <Alert severity="success" color="info" icon={<FolderShared />}>
//   //     {JSON.parse(body).content}
//   //   </Alert>
//   // );
// };

export const notipublish = () => {
  if (!client.connected) {
    return;
  }

  client.publish({
    destination: "/send/notice",
    body: JSON.stringify([
      {
        sender: getUser(),
        receiver: {
          userNo: 8,
          dept: {
            deptNo: 30,
            deptName: "영업",
          },
          id: "seongan0314",
          password:
            "$2a$10$VlUt3bWCJmEthfLcsDTgK.Tr7S/XeofwvygK7V0npjwKvDIgdLpES",
          name: "김성안",
          email: "seongankim",
          registerDate: "2022-08-18T00:00:00",
          profile: null,
        },

        content: `${getUser().name}님이 문서를 공유했습니다.`,
        isRead: 0,
      },
      {
        sender: getUser(),
        receiver: {
          userNo: 7,
          dept: {
            deptNo: 10,
            deptName: "회계",
          },
          id: "yeonggwang",
          password:
            "$2a$10$xBUBZCAqYvDR0G.83jG5meh4OcmK.MRsLtIqAQEDQnBfuwKjwplOS",
          name: "정영광",
          email: "gloryjeong",
          registerDate: "2022-08-17T00:00:00",
          profile: null,
        },
        content: `${getUser().name}님이 문서를 공유했습니다.`,
        isRead: 0,
      },
      {
        sender: getUser(),
        receiver: {
          userNo: 9,
          dept: {
            deptNo: 40,
            deptName: "개발",
          },
          id: "hayeong",
          password:
            "$2a$10$sJFYCNOWgVY7in5662fm0uHa8QWYpUtbaq/vCsj9hI4sVpvm27QSe",
          name: "곽하영",
          email: "hayeong09",
          registerDate: "2022-08-18T00:00:00",
          profile: null,
        },
        content: `${getUser().name}님이 문서를 공유했습니다.`,
        isRead: 0,
      },
    ]),
  });
};

export const workspaceSubscribe = (setNoticeList) => {
  client.subscribe(`/queue/workspace`, ({ body }) => {
    setNoticeList((noticeList) => [...noticeList, JSON.parse(body)]);
  });
};

export const worksapcepublish = () => {
  if (!client.connected) {
    return;
  }

  client.publish({
    destination: "/send/workspace",
    body: JSON.stringify([
      {
        sender: getUser(),
        receiver: {
          userNo: 8,
          dept: {
            deptNo: 30,
            deptName: "영업",
          },
          id: "seongan0314",
          password:
            "$2a$10$VlUt3bWCJmEthfLcsDTgK.Tr7S/XeofwvygK7V0npjwKvDIgdLpES",
          name: "김성안",
          email: "seongankim",
          registerDate: "2022-08-18T00:00:00",
          profile: null,
        },

        content: `${getUser().name}님이 워크스페이스에 초대했습니다.`,
        isRead: 0,
      },
      {
        sender: getUser(),
        receiver: {
          userNo: 9,
          dept: {
            deptNo: 40,
            deptName: "개발",
          },
          id: "hayeong",
          password:
            "$2a$10$sJFYCNOWgVY7in5662fm0uHa8QWYpUtbaq/vCsj9hI4sVpvm27QSe",
          name: "곽하영",
          email: "hayeong09",
          registerDate: "2022-08-18T00:00:00",
          profile: null,
        },
        content: `${getUser().name}님이 워크스페이스에 초대했습니다.`,
        isRead: 0,
      },
    ]),
  });
};

export const deleteNotice = (noticeNo) => {
  const url = baseUrl + `notice/${noticeNo}`;
  axios.delete(url).then((res) => console.log(res.data));
};
