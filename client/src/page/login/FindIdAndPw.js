import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function FindIdAndPw() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };

  function sendNewPw(findPw) {
    axios
      .get("http://localhost:8080/mail/findpw", findPw)
      .then((response) => console.log(response.data));
  }

  //   const SendTempPw = () => {
  //     axios
  //       .post("http://localhost:8080/mail/sendpw")
  //       .then((response) => console.log())
  //       .catch((err) => console.log(err));
  //   };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>비밀번호찾기</label>
      <label>Id</label>
      <input
        id="id"
        name="id"
        type="id"
        placeholder="id를 입력하세요"
        {...register("id", { required: true, maxLength: 10 })}
      />
      {errors.newId && errors.newId.type === "required" && (
        <p>id는 필수 값 입니다.</p>
      )}
      <br />
      <label>이메일</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email을 입력하세요"
        {...register("email", {
          required: true,
        })}
      />
      {errors.newEmail && errors.newEmail.type === "required" && (
        <p>이메일을 반드시 입력해 주세요</p>
      )}
      <button
        type="submit"
        onClick={() => {
          const findPw = {
            id: document.getElementById("id"),
            email: document.getElementById("email"),
          };
          sendNewPw(findPw);
        }}
      >
        비밀번호찾기
      </button>
    </form>
  );
}

export default FindIdAndPw;
