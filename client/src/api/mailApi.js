import axios from "axios";
import { useState, React } from "react";

const baseUrl = "/mail/";

export function sendMail(params, setConfirmVerifyCode) {
  const url = baseUrl + "send";
  axios
    .get("http://localhost:8080/mail/send", { params })
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
  axios
    .get("http://localhost:8080/mail/verify", { params })
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
  const url = baseUrl + "finduser";
  axios
    .get("http://localhost:8080/mail/finduser", { params })
    .then((response) => {
      const result = response.data[0];
      if (params.name && result.name == params.name) {
        alert("회원님의 아이디는" + result.id + "입니다");
      } else {
        alert("데이터를 입력해주세요");
      }
    })
    .catch((err) => alert("해당 데이터로 조회된 아이디가 없습니다"));
}

export function findPw(params) {
  axios
    .get("http://localhost:8080/mail/findpassword", { params })
    .then((response) => {
      if (response.data.check) {
        alert("해당 이메일 주소로 임시 비밀번호가 발송되었습니다.");
        axios
          .get("http://localhost:8080/mail/sendpw", { params })
          .then(alert("로그인 화면으로 이동합니다."))
          .then((window.location.href = "/"));
      } else {
        alert("일치하는 정보가 없습니다");
      }
    });
}
