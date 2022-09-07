import React, { useEffect, useState } from "react";
import { logout, mypage } from "../../api/userApi";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import { deleteUser } from "../../component/getUser/getUser";
import "./Mypage.css";
import Pwupdate from "./Pwupdate";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../main/Header";
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
  border: "2px solid #8bc7ff",
  boxShadow: 24,
  p: 4,
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
    <div style={{ background: "#f5f5f5", height: "100vh" }}>
      <Header />
      <Container className="mypagecontainer">
        <Box
          sx={{
            marginTop: "4%",
            maxWidth: "lg",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Card display="flex" flexDirection="column">
            <CardHeader title="마이페이지" />

            <CardContent sx={{ display: "flex" }}>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                badgeContent={
                  <EditIcon
                    onClick={() => {
                      logout();
                      deleteUser();
                    }}
                  />
                }
              >
                <ProfileAvatar alt="프로필" src={info.profile} />
              </Badge>

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
