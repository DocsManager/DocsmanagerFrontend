import axios from "axios";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../../api/userApi";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { sendMail, verifyMail } from "../../api/mailApi";
import WestIcon from "@mui/icons-material/West";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SignUp() {
  const [confirmVerifyCode, setConfirmVerifyCode] = useState({});
  const [verifyResult, setVerifyResult] = useState(false);
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
    <div>
      <Link to="/">
        <WestIcon fontSize="large" className="westicon" />
        <br />
      </Link>
      <div className="signupcontainer">
        <div className="photocontainer">
          <img
            src={`${process.env.PUBLIC_URL}/dmlogo.png`}
            className="signuplogo"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="signupform">
          <p className="signuptitle">회원가입</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <TextField
              id="newId"
              label="아이디"
              size="small"
              fullWidth
              variant="standard"
              {...register("newId", { required: true, maxLength: 10 })}
            />
          </Box>
          {errors.newId && errors.newId.type === "required" && (
            <p className="ptag">id는 필수 값 입니다.</p>
          )}
          {errors.newId && errors.newId.type === "maxLength" && (
            <p>id는 최대 10자까지로 구성해주세요.</p>
          )}
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& > :not(style)": { m: 1 },
              }}
            >
              <TextField
                helperText="이름을 입력하세요"
                id="newName"
                label="이름"
                size="small"
                fullWidth
                variant="standard"
                {...register("newName", {
                  required: true,
                  minLength: 2,
                  pattern: /^[가-힣]+$/,
                })}
              />
            </Box>
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& > :not(style)": { m: 1 },
              }}
            >
              <TextField
                id="newEmail"
                label="이메일"
                size="small"
                fullWidth
                variant="standard"
                {...register("newEmail", {
                  required: true,
                  pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                })}
              />
            </Box>

            <div className="maildiv">
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
            {errors.newEmail && errors.newEmail.type === "required" && (
              <p className="ptag">이메일은 필수 입력 항목입니다.</p>
            )}
            {errors.newEmail && errors.newEmail.type === "pattern" && (
              <p className="ptag">잘못된 이메일 형식입니다.</p>
            )}
          </div>
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& > :not(style)": { m: 1 },
              }}
            >
              <TextField
                id="confirmEmail"
                label="이메일검증"
                size="small"
                fullWidth
                variant="standard"
                {...register("confirmEmail", { required: true })}
              />
            </Box>
            <div className="confirmdiv">
              <Button
                type="button"
                className="mailbtn"
                onClick={() => {
                  const params = {
                    verifyMail: confirmVerifyCode,
                    compareVerify: document.getElementById("confirmEmail")
                      .value,
                  };
                  verifyMail(params, setVerifyResult);
                }}
              >
                검증
              </Button>
            </div>
            {errors.confirmEmail && errors.confirmEmail.type === "required" && (
              <p className="ptag">이메일 검증을 실시해 주세요</p>
            )}
          </div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <TextField
              helperText="비밀번호는 대/소문자와 특수문자를 포함한 8~12자리로 구성해주세요 "
              id="newPwd"
              type="password"
              label="비밀번호"
              size="small"
              fullWidth
              variant="standard"
              {...register("newPwd", {
                required: true,
                minLength: 8,
                maxLength: 12,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣]).{8,12}/,
              })}
            />
          </Box>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <TextField
              id="confirmPwd"
              type="password"
              label="비밀번호"
              size="small"
              fullWidth
              variant="standard"
              {...register("confirmPwd", {
                required: true,
                validate: (value) => value === password.current,
              })}
            />
          </Box>
          {errors.confirmPwd && errors.confirmPwd.type === "required" && (
            <p className="ptag">비밀번호는 필수 입력 항목입니다.</p>
          )}
          {errors.confirmPwd && errors.confirmPwd.type === "validate" && (
            <p className="ptag">비밀번호 값이 일치하지 않습니다.</p>
          )}
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <FormControl
              variant="standard"
              fullWidth
              sx={{ m: 1, minWidth: 300 }}
              id="formcontrol"
            >
              <InputLabel id="demo-simple-select-standard-label">
                부서
              </InputLabel>
              <Select
                {...register("department", {
                  required: true,
                })}
                labelId="demo-simple-select-standard-label"
                id="department"
                value={value}
                onChange={handleChange}
                // label="department"
              >
                <MenuItem value="">
                  <em>부서를 선택하세요</em>
                </MenuItem>
                <MenuItem value={10}>개발</MenuItem>
                <MenuItem value={20}>인사</MenuItem>
                <MenuItem value={30}>전산</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {errors.department && errors.department.type === "required" && (
            <p className="ptag">부서선택은 필수선택사항입니다.</p>
          )}
          <br />
          <div>
            <Button
              type="submit"
              fullWidth
              className="signupbtn"
              onClick={() => {
                if (
                  verifyResult &&
                  document.getElementById("newPwd").value ==
                    document.getElementById("confirmPwd").value
                ) {
                  const newUser = {
                    id: document.getElementById("newId").value,
                    password: document.getElementById("newPwd").value,
                    name: document.getElementById("newName").value,
                    email: document.getElementById("newEmail").value,
                    dept: {
                      // deptNo: document.getElementById("department"),
                      deptNo: value,
                    },
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
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
