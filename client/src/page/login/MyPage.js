import React, { useEffect, useState } from "react";
import { mypage } from "../../api/userApi";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Box, Button, Card, CardContent } from "@mui/material";
import "./Mypage.css";
import Pwupdate from "./Pwupdate";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { Container } from "@mui/system";

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
  height: 450,
  bgcolor: "background.paper",
  // border: "2px solid #3791f8",
  boxShadow: 24,
  p: 4,
  margin: "0 auto",
};

function MyPage() {
  const [info, setInfo] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    mypage(setInfo);
  }, [setInfo]);

  const showDept = info.dept;
  const showRegdate = info.registerDate;

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
          {info && info.name}님의 정보
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
                <Button component="label">
                  프로필 이미지 수정
                  <EditIcon sx={{ float: "left", margin: "5px" }} />
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
                <ProfileAvatar
                  alt="프로필"
                  src={info.profile}
                  className="mypageavatar"
                />
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
                    <TableCell>{info && info.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="nameCell" align="center">
                      아이디
                    </TableCell>
                    <TableCell>{info && info.id}</TableCell>
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
                    <TableCell>{info && info.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="nameCell" align="center">
                      부서
                    </TableCell>
                    <TableCell>{showDept && showDept.deptName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="nameCell" align="center">
                      가입일
                    </TableCell>
                    <TableCell>
                      {showRegdate &&
                        showRegdate.replace("T", " ").slice(0, 10)}
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
