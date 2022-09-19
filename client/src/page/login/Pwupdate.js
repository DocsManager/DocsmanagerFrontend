import React, { useRef } from "react";
import { changepw } from "../../api/userApi";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./Mypage.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Pwupdate({ open, style, setOpen }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const checkPassword = useRef(null);
  checkPassword.current = watch("newPassword");

  const checkOldPassword = useRef(null);
  checkOldPassword.current = watch("oldPassword");

  const onValid = (data) => {
    if (
      data &&
      document.getElementById("newPassword").value ===
        document.getElementById("confirmNewPassword").value
    ) {
      const params = {
        oldpw: document.getElementById("oldPassword").value,
        pw: document.getElementById("newPassword").value,
      };
      changepw(params);
      setOpen(false);
    }
  };

  const onInvalid = (data) => {
    Swal.fire({
      text: "비밀번호를 다시 확인하여주세요",
      icon: "warning",
      confirmButtonColor: "#3791f8",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      // hideBackdrop moadl활성화시 주변 검은색으로되는거 막음
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <Box sx={style}>
          <h4 id="child-modal-title">비밀번호 변경</h4>
          <p id="child-modal-description">
            계속하려면 먼저 본인임을 인증하세요.
          </p>
          <Box style={{ marginTop: "40px" }}>
            <TextField
              id="oldPassword"
              name="oldPassword"
              placeholder="현재 비밀번호"
              type="password"
              size="small"
              fullWidth
              variant="outlined"
              sx={{
                marginBottom: "10px",
              }}
              {...register("oldPassword", { required: true })}
            />
            {errors.oldPassword && errors.oldPassword.type === "required" && (
              <p className="mypageptag">
                기존의 비밀번호는 필수 입력 항목입니다.
              </p>
            )}
            <TextField
              id="newPassword"
              name="newPassword"
              placeholder="새 비밀번호"
              type="password"
              size="small"
              fullWidth
              variant="outlined"
              sx={{
                marginBottom: "10px",
              }}
              {...register("newPassword", {
                required: true,
                minLength: 8,
                maxLength: 12,
                validate: (value) => !(value === checkOldPassword.current),
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣]).{8,12}/,
              })}
            />
            {errors.newPassword && errors.newPassword.type === "required" && (
              <p className="mypageptag"> 비밀번호는 필수입력 항목 입니다.</p>
            )}
            {errors.newPassword && errors.newPassword.type === "minLength" && (
              <p className="mypageptag">
                비밀번호는 최소 8자에서 12자로 구성해주세요
              </p>
            )}
            {errors.newPasword && errors.newPasword.type === "maxLength" && (
              <p className="mypageptag">
                비밀번호는 최소 8자에서 12자로 구성해주세요
              </p>
            )}
            {errors.newPassword && errors.newPassword.type === "pattern" && (
              <p className="mypageptag">올바른 비밀번호 형식이 아닙니다.</p>
            )}
            {errors.newPassword && errors.newPassword.type === "validate" && (
              <p className="mypageptag">기존의 비밀번호와 같습니다.</p>
            )}

            <TextField
              id="confirmNewPassword"
              // helperText="비밀번호는 대/소문자와 특수문자를 포함한 8~12자리로 구성해주세요 "
              placeholder="새 비밀번호 확인"
              name="confirmNewPassword"
              type="password"
              size="small"
              fullWidth
              variant="outlined"
              {...register("confirmNewPassword", {
                required: true,
                validate: (value) => value === checkPassword.current,
              })}
              sx={{
                marginBottom: "10px",
              }}
            />

            {errors.confirmNewPassword &&
              errors.confirmNewPassword.type === "required" && (
                <p className="mypageptag">
                  비밀번호 확인은 필수 입력 항목입니다.
                </p>
              )}
            {errors.confirmNewPassword &&
              errors.confirmNewPassword.type === "validate" && (
                <p className="mypageptag">비밀번호와 값이 일치하지 않습니다.</p>
              )}
          </Box>
          <div className="buttondiv">
            <Button type="submit">다음</Button>
            <Button onClick={handleClose}>닫기</Button>
          </div>
        </Box>
      </form>
    </Modal>
  );
}

export default Pwupdate;
