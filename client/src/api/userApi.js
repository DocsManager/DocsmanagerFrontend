import axios from "axios";
import { getUser, setSessionUser } from "../component/getUser/getUser";
import Swal from "sweetalert2";

const baseUrl = "/api/";
export function signUp(newUser, profile) {
  const url = baseUrl + "signup";
  const fd = new FormData();
  fd.append(
    "user",
    new Blob([JSON.stringify(newUser)], { type: "application/json" })
  );
  profile && fd.append("profile", profile);
  axios
    .post(url, fd, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) =>
      Swal.fire({
        text: "오류가 발생했습니다 다시 시도해주세요",
        icon: "error",
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
          icon: "warning",
          confirmButtonColor: "#3791f8",
        });
      }
    })
    .catch((err) =>
      Swal.file({
        title: "잘못된 접근시도",
        icon: "error",
        confirmButtonColor: "#3791f8",
      })
    );
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
      //바로 then(result)=> /로 보내면 세션, 쿠키 삭제 전에 실행되서 main으로 넘어감
      setTimeout(function() {
        window.location.href = "/";
      }, 1000)
    );
}

export const mypage = async (setInfo) => {
  const url = baseUrl + "mypage";
  await axios.get(url).then((response) => {
    console.log(response.data);
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

export const checkId = async (params) => {
  const url = baseUrl + "checkuser";
  if (params.id === "") {
    Swal.fire({
      text: "값입력하셈",
      icon: "error",
      confirmButtonColor: "#3791f8",
    });
  } else {
    await axios.get(url, { params }).then((response) => {
      if (response.data.check) {
        Swal.fire({
          title: "가입이 가능합니다",
          icon: "success",
          confirmButtonColor: "#3791f8",
        });
        console.log(params);
        // } else if (!response.data.check) {
      } else if ((params.value = undefined)) {
        Swal.fire({
          title: "이미 가입된 아이디가 있습니다",
          icon: "warning",
          confirmButtonColor: "#3791f8",
        });
      }
    });
  }
};

export function updateProfile(userNo, profile, check, setCheck) {
  const url = `${baseUrl}profile/${userNo}`;

  console.log(url);
  const fd = new FormData();
  fd.append("profile", profile);

  axios
    .post(url, fd, { headers: { "Content-Type": "multipart/form-data" } })
    .then(() => setCheck(!check));
}
