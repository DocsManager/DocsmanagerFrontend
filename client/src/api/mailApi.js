import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = "/mail/";

export function sendMail(params, setConfirmVerifyCode) {
  const url = baseUrl + "send";

  if (params.email === "") {
    Swal.fire({
      text: "메일주소를 입력하여주세요.",
      icon: "question",
      confirmButtonColor: "#3791f8",
    });
  } else {
    axios
      .get("/api/mail/send", { params })
      .then((response) => {
        if (response.data) {
          setConfirmVerifyCode(response.data);
        }
      })
      .then(
        Swal.fire({
          text: "메일이 전송되었습니다.",
          icon: "success",
          confirmButtonColor: "#3791f8",
        })
      );
  }
}

export function verifyMail(params, setVerifyResult) {
  axios
    .get("/api/mail/verify", { params })
    .then((response) => {
      if (response.data) {
        setVerifyResult(response.data);
        Swal.fire({
          text: "검증이 완료되었습니다. 로그인을 계속 진행하여주세요",
          icon: "success",
          confirmButtonColor: "#3791f8",
        });
      } else {
        Swal.fire({
          text: "인증코드를 다시 확인하여주세요",
          icon: "warning",
          confirmButtonColor: "#3791f8",
        });
      }
    })
    .catch((err) => console.log(err));
}

export function findId(params) {
  const url = baseUrl + "finduser";
  axios
    .get("api/mail/finduser", { params })
    .then((response) => {
      const result = response.data[0];
      if (params.name && result.name == params.name) {
        Swal.fire({
          text: "회원님의 아이디는" + result.id + "입니다",
          icon: "info",
          confirmButtonColor: "#3791f8",
        });
      } else {
        Swal.fire({
          text: "데이터를 입력해주세요",
          icon: "question",
          confirmButtonColor: "#3791f8",
        });
      }
    })
    .catch((err) =>
      Swal.fire({
        text: "해당 데이터로 조회된 아이디가 없습니다",
        icon: "error",
        confirmButtonColor: "#3791f8",
      })
    );
}

export function findPw(params) {
  axios.get("api/mail/findpassword", { params }).then((response) => {
    if (response.data.check) {
      axios
        .get("api/mail/sendpw", { params })
        .then(
          Swal.fire({
            title: "비밀번호 변경 성공",
            text: "해당 이메일 주소로 임시 비밀번호가 발송되었습니다.",
            icon: "info",
            confirmButtonColor: "#3791f8",
          })
        )
        .then((result) => {
          window.location.href = "/";
        });
    } else {
      Swal.fire({
        text: "일치하는 정보가 없습니다",
        icon: "warning",
        confirmButtonColor: "#3791f8",
      });
    }
  });
}

export function checkMail(params, setConfirmVerifyCode) {
  axios
    .get("api/mail/checkmail", { params, setConfirmVerifyCode })
    .then((response) => {
      if (response.data.check) {
        Swal.fire({
          title: "사용 가능한 이메일주소",
          text:
            "해당 이메일로 가입이 가능합니다. 해당 주소로 메일을 전송하시겠습니까?",
          confirmButtonColor: "#3791f8",
          showCancelButton: true,
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            sendMail(params, setConfirmVerifyCode);
          } else if (result.isDismissed) {
            Swal.fire({
              title: "취소되었습니다",
              confirmButtonColor: "#3791f8",
            });
          }
        });
      } else {
        Swal.fire({
          title: "이미 가입되어 있는 이메일 주소입니다.",
          text: "다른 이메일 주소로 시도해주세요",
          confirmButtonColor: "#3791f8",
        });
      }
    })
    .catch((err) =>
      Swal.fire({
        title: "잘못된 접근 시도",
        icon: "error",
        cancelButtonColor: "3791f8",
      })
    );
}
