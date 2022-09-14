import { Avatar, Box, Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { signUp } from "../../api/userApi";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { sendMail, verifyMail } from "../../api/mailApi";
import { checkId } from "../../api/userApi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Swal from "sweetalert2";

function SignUp() {
  const [confirmVerifyCode, setConfirmVerifyCode] = useState({});
  const [verifyResult, setVerifyResult] = useState(false);
  const [value, setValue] = useState("");
  const [profile, setProfile] = useState();
  const [imageSrc, setImageSrc] = useState("");

  const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 300,
    height: 300,
    marginTop: 30,
  }));

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = useRef(null);
  password.current = watch("newPwd");

  const onSubmit = (data) => {
    if (
      // verifyResult &&
      document.getElementById("newPwd").value ===
      document.getElementById("confirmPwd").value
    ) {
      const newUser = {
        id: document.getElementById("newId").value,
        password: document.getElementById("newPwd").value,
        name: document.getElementById("newName").value,
        email: document.getElementById("newEmail").value,
        dept: {
          deptNo: value,
        },
      };
      signUp(newUser, profile);
      console.log(newUser);
      console.log(data.password);
      Swal.fire({
        title: "회원가입 성공",
        icon: "success",
        confirmButtonColor: "#3791f8",
      }).then((result) => {
        window.location.href = "/successsignup";
      });
    } else {
      Swal.fire({
        title: "회원가입 실패",
        text: "이메일검증을 확인해주세요",
        icon: "error",
        confirmButtonColor: "#3791f8",
      });
    }
  };
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  console.log(profile);

  return (
    <div className="maincontainer">
      <div className="signupcontainer">
        <div className="photocontainer">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            width="150"
            className="logo"
          />
          <img
            src={`${process.env.PUBLIC_URL}/signup.png`}
            className="signuplogo"
          />
          <Link to="/">
            <button className="homebtn" fontSize="large">
              <HomeOutlinedIcon size="large" />
              HOME
            </button>
          </Link>
        </div>
        <div className="formcontainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              className="signupform"
              sx={{
                flexDirection: "column",
                alignItems: "center",
                "& > :not(style)": { m: 1 },
              }}
            >
              <div className="profilediv">
                <Button component="label" sx={{ background: "#ffffff" }}>
                  <ProfileAvatar
                    sx={{ background: "#3791f8" }}
                    src={imageSrc}
                  />
                  <input
                    id="newUserProfile"
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setProfile(e.target.files[0]);
                        encodeFileToBase64(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
              </div>
              <TextField
                style={{ marginLeft: 0 }}
                id="newId"
                label="아이디"
                size="small"
                fullWidth
                variant="standard"
                {...register("newId", { required: true, maxLength: 10 })}
              />
              {errors.newId && errors.newId.type === "required" && (
                <p className="signupptag">id는 필수 값 입니다.</p>
              )}
              {errors.newId && errors.newId.type === "maxLength" && (
                <p className="signupptag">id는 최대 10자까지로 구성해주세요.</p>
              )}
              <Button
                style={{ margin: 0 }}
                className="mailbtn"
                type="button"
                // disabled={isSubmitting}
                name="idbtn"
                onClick={() => {
                  const params = {
                    id: document.getElementById("newId").value,
                  };
                  checkId(params);
                }}
                variant="contained"
              >
                ID 중복 검사
              </Button>
              <TextField
                style={{ marginLeft: 0 }}
                helperText="이름을 입력하세요"
                id="newName"
                label="이름"
                fullWidth
                size="small"
                variant="standard"
                {...register("newName", {
                  required: true,
                  minLength: 2,
                  pattern: /^[가-힣]+$/,
                })}
              />
              {errors.newName && errors.newName.type === "required" && (
                <div className="signupptag">이름은 필수 값입니다.</div>
              )}
              {errors.newName && errors.newName.type === "minLength" && (
                <p className="signupptag">이름을 정확히 입력해주세요</p>
              )}
              {errors.newName && errors.newName.type === "pattern" && (
                <p className="signupptag">이름은 한글만 입력 가능합니다.</p>
              )}
              <TextField
                style={{ marginLeft: 0 }}
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
              <Button
                style={{ margin: 0 }}
                type="button"
                // disabled={isSubmitting}
                name="mailbtn"
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
              {errors.newEmail && errors.newEmail.type === "required" && (
                <p className="signupptag">이메일은 필수 입력 항목입니다.</p>
              )}
              {errors.newEmail && errors.newEmail.type === "pattern" && (
                <p className="signupptag">잘못된 이메일 형식입니다.</p>
              )}
              <TextField
                style={{ marginLeft: 0 }}
                helperText="이메일로 전송받은 인증코드를 입력하고 검증을 눌러주세요"
                id="confirmEmail"
                label="인증코드검증"
                size="small"
                fullWidth
                variant="standard"
                {...register("confirmEmail", { required: true })}
              />
              <Button
                style={{ margin: 0 }}
                type="button"
                className="mailbtn"
                variant="contained"
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
              {errors.confirmEmail &&
                errors.confirmEmail.type === "required" && (
                  <p className="signupptag">이메일 검증을 실시해 주세요</p>
                )}
              <TextField
                style={{ marginLeft: 0 }}
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
              {errors.newPwd && errors.newPwd.type === "required" && (
                <p className="signupptag"> 비밀번호는 필수입력 항목 입니다.</p>
              )}
              {errors.newPwd && errors.newPwd.type === "minLength" && (
                <p className="signupptag">
                  비밀번호는 최소 8자에서 12자로 구성해주세요
                </p>
              )}
              {errors.newPwd && errors.newPwd.type === "maxLength" && (
                <p className="signupptag">
                  비밀번호는 최소 8자에서 12자로 구성해주세요
                </p>
              )}
              {errors.newPwd && errors.newPwd.type === "pattern" && (
                <p className="signupptag">올바른 비밀번호 형식이 아닙니다.</p>
              )}
              <TextField
                style={{ marginLeft: 0 }}
                id="confirmPwd"
                type="password"
                label="비밀번호확인"
                size="small"
                fullWidth
                variant="standard"
                {...register("confirmPwd", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
              />
              {errors.confirmPwd && errors.confirmPwd.type === "required" && (
                <p className="signupptag">
                  비밀번호 확인은 필수 입력 항목입니다.
                </p>
              )}
              {errors.confirmPwd && errors.confirmPwd.type === "validate" && (
                <p className="signupptag">비밀번호와 값이 일치하지 않습니다.</p>
              )}
              <FormControl
                style={{ marginLeft: 0 }}
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
                >
                  <MenuItem value="" style={{ margin: 0 }}>
                    <em>부서를 선택하세요</em>
                  </MenuItem>
                  <MenuItem value={10}>개발</MenuItem>
                  <MenuItem value={20}>인사</MenuItem>
                  <MenuItem value={30}>전산</MenuItem>
                </Select>
              </FormControl>
              {errors.department && errors.department.type === "required" && (
                <p className="signupptag">부서선택은 필수선택사항입니다.</p>
              )}
              <Box textAlign="center">
                <Button
                  style={{
                    width: "80%",
                    magin: "20px 0px 20px 0px",
                    marginTop: "20px",
                  }}
                  type="submit"
                  className="signupbtn"
                  variant="contained"
                >
                  회원가입
                </Button>
              </Box>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
