import axios from "axios";
import { getUser, setSessionUser } from "../component/getUser/getUser";
import Swal from "sweetalert2";

const baseUrl = "/api/";
export function signUp(newUser) {
  const url = baseUrl + "signup";
  axios
    .post(url, newUser)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) =>
      Swal.fire({
        text: "오류가 발생했습니다 다시 시도해주세요",
        icon: "warning",
        confirmButtonColor: "#3791f8",
      })
    );
}

export function login(userInfo, setUser) {
  const url = baseUrl + "login";
  axios
    .post(url, userInfo)
    .then((res) => {
      if (res.data) {
        setUser(res.data);
        setSessionUser(res.data);
      } else {
        Swal.fire({
          title: "로그인실패",
          text: "아이디 또는 비밀번호를 잘못 입력했습니다.",
          icon: "error",
          confirmButtonColor: "#3791f8",
        });
      }
    })
    .catch((err) => console.log(err));
}

export function allUser(setUserList) {
  const url = baseUrl + "alluser";
  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
      setUserList(res.data);
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
      setUserList(res.data);
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

export function logout() {
  const url = baseUrl + "logout";
  axios
    .get(url)
    .then(
      Swal.fire({
        title: "로그아웃",
        text: "로그아웃이 되었습니다.",
        icon: "success",
        confirmButtonColor: "#3791f8",
      })
    )
    .then(
      setTimeout(function() {
        window.location.href = "/";
      }, 1000)
    );
}

export const mypage = async (setInfo) => {
  const url = baseUrl + "mypage";
  await axios.get(url).then((response) => {
    setInfo(response.data);
  });
};

export const changepw = async (params) => {
  const url = baseUrl + "checkpassword";
  await axios.get(url, { params }).then((response) => {
    if (response.data.check) {
      Swal.fire({
        title: "비밀번호 변경 성공",
        text: "비밀번호가 변경되었습니다.",
        icon: "success",
        confirmButtonColor: "#3791f8",
      });
    } else {
      Swal.fire({
        title: "비밀번호 변경 실패",
        text: "잘못된 요청입니다",
        icon: "warning",
        confirmButtonColor: "#3791f8",
      });
    }
  });
};
