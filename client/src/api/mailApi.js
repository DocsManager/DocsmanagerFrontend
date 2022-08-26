import axios from "axios";
import { useState } from "react";

const baseUrl = "/mail/";

export function sendMail(params, setConfirmVerifyCode) {
  //   const url = baseUrl + "send";
  console.log(params);
  axios
    .get("/api/mail/send", { params })

    // .get(url, { params })
    // .then(alert("메일이 전송중입니다. 잠시만 기다려주세요."))
    .then((response) => {
      if (response.data) {
        setConfirmVerifyCode(response.data);
      } else {
        alert("메일 전송에 실패하였습니다 다시 시도해주세요");
      }
    })
    .then(alert("메일이 전송되었습니다."))
    .catch((err) => console.log(err));
}

export function verifyMail(params, setVerifyResult) {
  //   const url = baseUrl + "verify";
  console.log(params);
  axios
    .get("/api/mail/verify", { params })
    .then(alert("검증중입니다."))
    .then((response) => {
      if (response.data) {
        setVerifyResult(response.data);
        console.log(setVerifyResult);
        alert("검증이 완료되었습니다.");
      } else {
        alert("인증코드를 다시 확인해주세요");
      }
    })
    .catch((err) => console.log(err));
}

export function findId(params) {
  console.log(params.data);
  axios.get("/api/mail/finduser", { params }).then((response) => {
    console.log(response.data);
    // .then(alert("회원님의 아이디는" + +"입니다"));
  });
}

export function findPw(params) {
  console.log(params.data);
  axios.get("/api/mail/findpassword", { params }).then((response) => {
    console.log(response.data);
  });
}
