import axios from "axios";
import { setUser } from "../component/getUser/getUser";

const baseUrl = "/api/";
export function signUp(newUser) {
  const url = baseUrl + "signup";
  axios
    .post(url, newUser)
    .then(() => {
      console.log("성공");
    })
    .catch(() => {
      console.log("실패");
    });
}

export function login(user) {
  const url = baseUrl + "login";
  axios
    .post(url, user)
    .then((res) => {
      console.log(res);
      if (res.data) {
        setUser(res.data);
      } else {
        alert("로그인 실패");
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
