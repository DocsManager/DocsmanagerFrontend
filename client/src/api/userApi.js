import axios from "axios";
import { getUser, setSessionUser } from "../component/getUser/getUser";

const baseUrl = "/api/";
export function signUp(newUser) {
  const url = baseUrl + "signup";
  axios
    .post(url, newUser)
    .then(() => {
      console.log("성공");
      window.location.href = "/successsignup";
    })
    // .catch(() => {
    //   console.log("실패"));
    .catch((err) => alert(err));
}

export function login(user, setUser) {
  const url = baseUrl + "login";
  axios
    .post(url, user)
    .then((res) => {
      console.log(res);
      if (res.data) {
        setUser(res.data);
        setSessionUser(res.data);
      } else {
        alert("로그인 실패하였습니다.");
      }
    })
    .catch((err) => console.log(err));
}

export function allUser(setUserList) {
  const url = baseUrl + "alluser";
  axios
    .get(url)
    .then((res) => {
      {
        console.log(res.data);
        setUserList(res.data);
      }
    })
    .catch(() => {
      console.log("실패");
    });
}

export function findUser(userName, setUserList) {
  const url = baseUrl + "user/name/" + userName;
  axios
    .get(url)
    .then((res) => {
      {
        setUserList(res.data);
      }
    })
    .catch(() => {
      console.log("실패");
    });
}

export function findMember(memberList, setMemberList, setSearchList) {
  const url = baseUrl + "user/member";
  axios.post(url, memberList).then((res) => {
    let arr = res.data.filter((v) => v.userNo !== getUser().userNo);
    setMemberList(arr);
    setSearchList(arr);
  });
}
