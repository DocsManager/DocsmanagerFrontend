import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { signUp } from "../../api/userApi";
import { Link } from "react-router-dom";
import "./SignUp.css";
import { checkMail, verifyMail } from "../../api/mailApi";
import { checkId } from "../../api/userApi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Swal from "sweetalert2";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";

function SignUp() {
  const [verifyId, setVerifyId] = useState(false);
  const [confirmVerifyCode, setConfirmVerifyCode] = useState({});
  const [verifyResult, setVerifyResult] = useState(false);
  const [value, setValue] = useState("");
  const [profile, setProfile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const imgRef = useRef();
  const [OptionList, SetOptionList] = useState([]);

  const baseUrl = "/api/";
  const showDepartment = () => {
    const url = baseUrl + "alldepartment";
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        SetOptionList(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    showDepartment();
  }, []);

  const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 300,
    height: 300,
    marginTop: 30,
  }));

  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    if (file) {
      if (file.type.split("/")[0] === "image") {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImageUrl(reader.result);
          setProfile(file);
        };
      } else {
        Swal.fire({
          title: "이미지 파일이 아닙니다.",
          icon: "error",
          confirmButtonColor: "#3791f8",
        });
        imgRef.current.value = "";
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const password = useRef(null);
  password.current = watch("newPwd");

  const onSubmit = (data) => {
    if (verifyId) {
      if (verifyResult) {
        if (
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
          Swal.fire({
            title: "회원가입 성공",
            confirmButtonColor: "#3791f8",
            imageUrl: `${process.env.PUBLIC_URL}/congrats~.gif`,
            imageAlt: "congrats",
            imageWidth: 400,
            imageHeight: 300,
          }).then((result) => {
            window.location.href = "/";
          });
        } else {
          Swal.fire({
            text: "비밀번호값이 동일하지 않습니다",
            icon: "warning",
            confirmButtonColor: "#3791f8",
          });
        }
      } else {
        Swal.fire({
          text: "E-mail중복검사 및 검증을 완료해주세요",
          icon: "warning",
          confirmButtonColor: "#3791f8",
        });
      }
    } else {
      Swal.fire({
        text: "ID중복검사를 완료해주세요",
        icon: "warning",
        confirmButtonColor: "#3791f8",
      });
    }
  };

  return (
    <div className="maincontainer">
      <div className="signupcontainer">
        <div className="photocontainer">
          <img
            src={`${process.env.PUBLIC_URL}/signupadd2.png`}
            className="signuplogo"
            alt="회원가입사진"
          />
          <Link to="/">
            <ButtonBase
              className="homebtn"
              fontSize="large"
              sx={{
                backgroundColor: "#3791f8",
                color: "white",
                marginLeft: "20px",
                marginBottom: "20px",
              }}
            >
              <HomeOutlinedIcon size="large" />
              HOME
            </ButtonBase>
          </Link>
        </div>
        <div className="formcontainer">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            width="150"
            className="logo"
            alt="로고사진"
          />
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
                    src={imageUrl ? imageUrl : "/img"}
                  />
                  <input
                    id="newUserProfile"
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    ref={imgRef}
                    onChange={onChangeImage}
                  />
                </Button>
              </div>
              <IconButton sx={{ float: "right" }}>
                <HighlightOffIcon fontSize="large" />
              </IconButton>
              <div />
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
                name="idbtn"
                onClick={async () => {
                  const result = await trigger("newId");
                  if (!result) {
                    Swal.fire({
                      text: "아이디 입력 양식을 준수해주세요.",
                      confirmButtonColor: "#3791f8",
                    });
                    console.log(verifyId);
                  } else {
                    const params = {
                      id: document.getElementById("newId").value,
                    };
                    checkId(params, setVerifyId);
                    console.log(verifyId);
                  }
                  console.log(verifyId);
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
                name="mailbtn"
                className="mailbtn"
                onClick={async () => {
                  const result = await trigger("newEmail");
                  if (!result) {
                    Swal.fire({
                      text: "이메일 입력 양식을 준수해주세요",
                      confirmButtonColor: "#3791f8",
                    });
                  } else {
                    const params = {
                      email: document.getElementById("newEmail").value,
                    };
                    checkMail(params, setConfirmVerifyCode);
                  }
                }}
                variant="contained"
              >
                메일 중복 검사
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
                  {OptionList &&
                    OptionList.map((item) => {
                      return (
                        <MenuItem value={item.deptNo} key={item.deptNo}>
                          {item.deptName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {errors.department && errors.department.type === "required" && (
                <p className="signupptag">부서선택은 필수선택사항입니다.</p>
              )}
              <Box
                textAlign="center"
                sx={{
                  margin: "40px 0px 50px 0px !important",
                }}
              >
                <Button
                  sx={{ width: "80%", class: "signupbtn" }}
                  type="submit"
                  name="signupbtn"
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
