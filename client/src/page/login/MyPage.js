import React, { useContext, useRef, useState } from "react";
import { updateProfile } from "../../api/userApi";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box, Button, Card, CardContent } from "@mui/material";
import "./Mypage.css";
import Pwupdate from "./Pwupdate";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { MyContext } from "../Main";
import Swal from "sweetalert2";

//아바타 프로필
const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 400,
  height: 400,
  border: `2px solid ${theme.palette.background.paper}`,
  marginTop: 30,
  marginRight: 15,
}));

//modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  // border: "2px solid #3791f8",
  boxShadow: 24,
  p: 4,
  margin: "0 auto",
};

function MyPage() {
  const { userInfo, setUserInfoHandler } = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(userInfo.profile);
  const [imageUrl, setImageUrl] = useState("");
  const imgRef = useRef();

  const handleOpen = () => {
    setOpen(true);
  };

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

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ display: "grid", gridTemplateRows: "0.2fr  1fr" }}>
        <h2
          style={{
            textAlign: "left",
            padding: "15px",
            borderBottom: "1px solid #d9d9d9",
            paddingLeft: "30px",
          }}
        >
          {userInfo.name}님의 정보
        </h2>
      </div>
      <Container>
        <Box
          sx={{
            marginTop: "1%",
            maxWidth: "lg",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Card>
            <CardContent sx={{ display: "flex" }}>
              <div>
                <CheckIcon
                  fontSize="medium"
                  sx={{ float: "right", marginTop: "10px", mr: "30px" }}
                  onClick={() =>
                    profile !== userInfo.profile &&
                    updateProfile(userInfo.userNo, profile, setUserInfoHandler)
                  }
                />
                <ClearIcon
                  fontSize="medium"
                  sx={{
                    float: "right",
                    marginTop: "10px",
                    marginRight: "20px",
                  }}
                  onClick={() => {
                    setProfile();
                    setImageUrl("");
                    imgRef.current.value = "";
                  }}
                />
                <Button component="label" sx={{ background: "#ffffff" }}>
                  <ProfileAvatar
                    alt="프로필"
                    src={imageUrl || profile}
                    className="mypageavatar"
                    sx={{ background: "#3791f8" }}
                  />
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    ref={imgRef}
                    onChange={onChangeImage}
                  />
                </Button>
              </div>
              <Table sx={{ minWidth: 500 }}>
                <TableBody
                  sx={{
                    borderTop: "1px solid rgba(224,224,224,1)",
                  }}
                >
                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      이름
                    </TableCell>
                    <TableCell>{userInfo.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="nameCell" align="center">
                      아이디
                    </TableCell>
                    <TableCell>{userInfo.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="nameCell" align="center">
                      비밀번호
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={handleOpen}
                        variant="outlined"
                        sx={{ float: "right" }}
                      >
                        재설정
                      </Button>
                      {open && (
                        <Pwupdate open={open} style={style} setOpen={setOpen} />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="nameCell" align="center">
                      이메일
                    </TableCell>
                    <TableCell>{userInfo.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="nameCell" align="center">
                      부서
                    </TableCell>
                    <TableCell>{userInfo.dept.deptName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="nameCell" align="center">
                      가입일
                    </TableCell>
                    <TableCell>
                      {userInfo.registerDate.replace("T", " ").slice(0, 10)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}
export default MyPage;
