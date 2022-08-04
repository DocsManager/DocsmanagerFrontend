import axios from "axios";

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

export function login(user, setUserHandler) {
  const url = baseUrl + "login";
  axios
    .post(url, user)
    .then((res) => {
      if (res.data) {
        setUserHandler(res.data);
      } else {
        alert("로그인 실패");
      }
    })
    .catch((err) => console.log(err));
}
