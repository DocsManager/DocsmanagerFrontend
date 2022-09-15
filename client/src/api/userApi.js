import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "/api/";
export function signUp(newUser, profile) {
  const url = baseUrl + "signup";
  const fd = new FormData();
  fd.append(
    "user",
    new Blob([JSON.stringify(newUser)], { type: "application/json" })
  );
  fd.append("profile", profile);
  fd.append("profile", profile ? profile : new Blob());
  axios
    .post(url, fd, { headers: { "Content-Type": "multipart/form-data" } })
    .catch((err) =>
      Swal.fire({
        text: "오류가 발생했습니다 다시 시도해주세요",
        icon: "error",
        confirmButtonColor: "#3791f8",
      })
    );
}

export function login(userInfo) {
  const url = baseUrl + "login";
  axios
    .post(url, userInfo)
    .then((res) => {
      if (res.data) {
        // setSessionUser(res.data);
        Swal.fire({
          title: "로그인 성공",
          icon: "success",
          showConfirmButton: false,
        }).then(
          setTimeout(function() {
            window.location.href = "main";
          }, 1000)
        );
      } else {
        Swal.fire({
          title: "로그인실패",
          text: "아이디 또는 비밀번호를 잘못 입력했습니다.",
          icon: "warning",
          confirmButtonColor: "#3791f8",
        });
      }
    })
    .catch(() =>
      Swal.fire({
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

export function findMember(memberList, setMemberList, setSearchList, user) {
  const url = baseUrl + "user/member";
  axios.post(url, memberList).then((res) => {
    let arr = res.data.filter((v) => v.userNo !== user.userNo);
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
        text: "로그아웃 하였습니다.",
        icon: "success",
        confirmButtonColor: "#3791f8",
      })
    )
    .then((window.location.href = "/"));
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
        text: "기존의 비밀번호를 다시 확인해주세요",
        icon: "warning",
        confirmButtonColor: "#3791f8",
      });
    }
  });
};

export const checkId = async (params, setVerifyId) => {
  const url = baseUrl + "checkuser";
  if (params.id === "") {
    Swal.fire({
      text: "값을 입력하세요",
      icon: "error",
      confirmButtonColor: "#3791f8",
    });
  } else {
    await axios.get(url, { params, setVerifyId }).then((response) => {
      setVerifyId(response.data.check);
      if (response.data.check) {
        Swal.fire({
          title: "가입이 가능합니다",
          icon: "success",
          confirmButtonColor: "#3791f8",
        });
        // setVerifyId = true;
      } else if (!response.data.check) {
        Swal.fire({
          title: "이미 가입된 아이디가 있습니다",
          icon: "warning",
          confirmButtonColor: "#3791f8",
        });
        // setVerifyId = false;
      }
    });
  }
};

export function updateProfile(userNo, profile, setUserInfo) {
  const url = `${baseUrl}profile/${userNo}`;

  const fd = new FormData();
  fd.append("profile", profile ? profile : new Blob());

  axios
    .post(url, fd, { headers: { "Content-Type": "multipart/form-data" } })
    .then(() => mypage(setUserInfo));
}
