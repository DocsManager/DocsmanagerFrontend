import axios from "axios";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../../api/userApi";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { sendMail, verifyMail } from "../../api/mailApi";

function SignUp() {
  const [confirmVerifyCode, setConfirmVerifyCode] = useState({});
  const [verifyResult, setVerifyResult] = useState(false);

  const Options = [
    { key: 1, value: "부서를 선택하세요" },
    { key: 10, value: "개발" },
    { key: 20, value: "인사" },
    { key: 30, value: "전산" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef(null);
  password.current = watch("newPwd");

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <div className="signupcontainer">
      <div className="photocontainer">
        <p>여기에 사진넣을거임</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="signupform">
        <p className="signuptitle">회원가입</p>
        <label>Id</label>
        <br />
        <input
          id="newId"
          name="newId"
          type="newId"
          placeholder="id를 입력하세요"
          {...register("newId", { required: true, maxLength: 10 })}
        />
        {errors.newId && errors.newId.type === "required" && (
          <p className="ptag">id는 필수 값 입니다.</p>
        )}
        {errors.newId && errors.newId.type === "maxLength" && (
          <p>id는 최대 10자까지로 구성해주세요.</p>
        )}
        <br />
        <label>Name</label>
        <br />
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
          <p className="ptag">이름은 필수 값입니다.</p>
        )}
        {errors.newName && errors.newName.type === "minLength" && (
          <p className="ptag">이름을 정확히 입력해주세요</p>
        )}
        {errors.newName && errors.newName.type === "pattern" && (
          <p className="ptag">이름은 한글만 입력 가능합니다.</p>
        )}
        <br />

        <label>Email</label>
        <br />
        <div className="email">
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
          {errors.newEmail && errors.newEmail.type === "required" && (
            <p className="ptag">이메일은 필수 입력 항목입니다.</p>
          )}
          {errors.newEmail && errors.newEmail.type === "pattern" && (
            <p className="ptag">잘못된 이메일 형식입니다.</p>
          )}
          {/* <label>Email인증 메일 보내기</label> */}

          <Button
            type="button"
            className="mailbtn"
            onClick={() => {
              const params = {
                email: document.getElementById("newEmail").value,
              };
              sendMail(params, setConfirmVerifyCode);
            }}
            variant="contained"
          >
            인증메일 발송
          </Button>
        </div>
        <br />

        <label>Email검증</label>
        <br />
        <div className="email">
          <input
            id="confirmEmail"
            placeholder="인증 코드를 입력하세요"
            {...register("confirmEmail", { required: true })}
          />
          <Button
            type="button"
            className="mailbtn"
            onClick={() => {
              const params = {
                verifyMail: confirmVerifyCode,
                compareVerify: document.getElementById("confirmEmail").value,
              };
              verifyMail(params, setVerifyResult);
            }}
          >
            검증
          </Button>
          {errors.confirmEmail && errors.confirmEmail.type === "required" && (
            <p className="ptag">이메일 검증을 실시해 주세요</p>
          )}
        </div>
        <br />
        <label>Password : 대/소문자와 특수문자를 포함한 8~12자리</label>
        <br />
        <input
          id="newPwd"
          name="newPwd"
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...register("newPwd", {
            required: true,
            minLength: 8,
            maxLength: 12,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣]).{8,12}/,
          })}
        />
        {errors.newPwd && errors.newPwd.type === "required" && (
          <p className="ptag"> 비밀번호는 필수입력 항목 입니다.</p>
        )}
        {errors.newPwd && errors.newPwd.type === "minLength" && (
          <p className="ptag"> 비밀번호는 최소 8자에서 12자로 구성해주세요</p>
        )}
        {errors.newPwd && errors.newPwd.type === "maxLength" && (
          <p className="ptag"> 비밀번호는 최소 8자에서 12자로 구성해주세요</p>
        )}
        {errors.newPwd && errors.newPwd.type === "pattern" && (
          <p className="ptag">올바른 비밀번호 형식이 아닙니다.</p>
        )}
        <br />

        <label>passwordConfirm</label>
        <br />
        <input
          name="confirmPwd"
          type="password"
          placeholder="한번더 비밀번호를 입력하세요"
          {...register("confirmPwd", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.confirmPwd && errors.confirmPwd.type === "required" && (
          <p className="ptag">비밀번호는 필수 입력 항목입니다.</p>
        )}
        {errors.confirmPwd && errors.confirmPwd.type === "validate" && (
          <p className="ptag">비밀번호 값이 일치하지 않습니다.</p>
        )}
        <br />
        <label>부서</label>
        <br />
        <select id="department">
          {Options.map((deptname, index) => (
            <option key={deptname.key} value={deptname.key}>
              {deptname.value}
            </option>
          ))}
        </select>
        <br />
        <div>
          <Button
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
          </Button>
          <Link to="/">
            <Button>홈으로</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
