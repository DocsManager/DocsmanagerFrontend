import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../../api/userApi";
import "./SignUp.css";

function SignUp() {
  const [confirmVerifyCode, setConfirmVerifyCode] = useState({});
  const [verifyResult, setVerifyResult] = useState(false);

  const Options = [
    { key: 1, value: "부서를 선택하세요" },
    { key: 10, value: "개발" },
    { key: 20, value: "인사" },
    { key: 30, value: "전산" },
  ];

  const SendMail = () => {
    const mailAddress = document.getElementById("newEmail").value;
    const params = { email: mailAddress };
    axios
      // .get(`http://localhost:8080/mail/sendtest?email=${mailAddress}`)
      .get("http://localhost:8080/mail/send", { params })
      .then((response) => setConfirmVerifyCode(response.data))
      .catch((err) => console.log(err));
  };

  const VerifyMail = () => {
    const checkMail = document.getElementById("confirmEmail").value;
    console.log(checkMail);
    console.log(checkMail.data);
    const params = { verifyMail: confirmVerifyCode, compareVerify: checkMail };
    axios
      .get("http://localhost:8080/mail/verify", { params })
      .then((response) => setVerifyResult(response.data))
      .catch((err) => console.log(err))
      .then(console.log(verifyResult))
      .then(console.log(verifyResult.value));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef();
  password.current = watch("newPwd");

  const mailCode = useRef();
  mailCode.current = watch(confirmVerifyCode);

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Id</label>
      <input
        id="newId"
        name="newId"
        type="newId"
        placeholder="id를 입력하세요"
        {...register("newId", { required: true, maxLength: 10 })}
      />
      {errors.newId && errors.newId.type === "required" && (
        <p>id는 필수 값 입니다.</p>
      )}
      {errors.newId && errors.newId.type === "maxLength" && (
        <p>id는 최대 10자까지로 구성해주세요.</p>
      )}
      <br />
      <label>Name</label>
      <input
        id="newName"
        name="newName"
        {...register("newName", {
          required: true,
          minLength: 2,
          pattern: /^[가-힣]+$/,
        })}
      />
      {errors.newName && errors.newName.type === "required" && (
        <p>이름은 필수 값입니다.</p>
      )}
      {errors.newName && errors.newName.type === "minLength" && (
        <p>이름을 정확히 입력해주세요</p>
      )}
      {errors.newName && errors.newName.type === "pattern" && (
        <p>이름은 한글만 입력 가능합니다.</p>
      )}
      <br />

      <label>Email</label>
      <div>
        <input
          id="newEmail"
          name="newEmail"
          type="newEmail"
          placeholder="Email을 입력하세요"
          {...register("newEmail", {
            required: true,
            pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
          })}
        />
      </div>
      {errors.newEmail && errors.newEmail.type === "required" && (
        <p>이메일은 필수 입력 항목입니다.</p>
      )}
      {errors.newEmail && errors.newEmail.type === "pattern" && (
        <p>잘못된 이메일 형식입니다.</p>
      )}

      <br />
      <label>Email인증 메일 보내기</label>
      <div>
        <button type="button" onClick={SendMail}>
          인증메일 발송
        </button>
      </div>

      <br />
      <label>Email검증</label>
      <div>
        <input
          id="confirmEmail"
          placeholder="인증 코드를 입력하세요"
          {...register("confirmEmail", { required: true })}
        />
        <button type="button" onClick={VerifyMail}>
          검증
        </button>
        {errors.confirmEmail && errors.confirmEmail.type === "required" && (
          <p>이메일 검증을 실시해 주세요</p>
        )}
      </div>

      <label>Password : 대/소문자와 특수문자를 포함한 8~12자리</label>
      <input
        id="newPwd"
        name="newPwd"
        // type="password"
        placeholder="비밀번호를 입력하세요"
        {...register("newPwd", {
          required: true,
          minLength: 8,
          maxLength: 12,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣]).{8,12}/,
        })}
      />
      {errors.newPwd && errors.newPwd.type === "required" && (
        <p> 비밀번호는 필수입력 항목 입니다.</p>
      )}
      {errors.newPwd && errors.newPwd.type === "minLength" && (
        <p> 비밀번호는 최소 8자에서 12자로 구성해주세요</p>
      )}
      {errors.newPwd && errors.newPwd.type === "maxLength" && (
        <p> 비밀번호는 최소 8자에서 12자로 구성해주세요</p>
      )}
      {errors.newPwd && errors.newPwd.type === "pattern" && (
        <p>올바른 비밀번호 형식이 아닙니다.</p>
      )}
      <br />

      <label>passwordConfirm</label>
      <input
        name="confirmPwd"
        // type="password"
        placeholder="한번더 비밀번호를 입력하세요"
        {...register("confirmPwd", {
          required: true,
          validate: (value) => value === password.current,
        })}
      />
      {errors.confirmPwd && errors.confirmPwd.type === "required" && (
        <p>비밀번호는 필수 입력 항목입니다.</p>
      )}
      {errors.confirmPwd && errors.confirmPwd.type === "validate" && (
        <p>비밀번호 값이 일치하지 않습니다.</p>
      )}
      <label>부서</label>
      <select id="department">
        {Options.map((deptname, index) => (
          <option key={deptname.key} value={deptname.key}>
            {deptname.value}
          </option>
        ))}
      </select>
      <br />

      <button
        type="submit"
        onClick={() => {
          if (verifyResult) {
            const newUser = {
              id: document.getElementById("newId").value,
              password: document.getElementById("newPwd").value,
              name: document.getElementById("newName").value,
              email: document.getElementById("newEmail").value,
              dept: { deptNo: document.getElementById("department").value },
            };
            console.log(newUser);
            signUp(newUser);
          } else {
            alert("가입에 실패하였습니다. 다시 확인해주세요");
          }
        }}
      >
        회원가입
      </button>
    </form>
  );
}
export default SignUp;
