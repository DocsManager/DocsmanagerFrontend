import {
  Button,
  TextField,
  Typography,
  Card,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  OutlinedInput,
  Checkbox,
  ThemeProvider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useRef, useState } from "react";
import { findMember, findUser } from "../../api/userApi";
import { getUser } from "../../component/getUser/getUser";
import AuthoritySelect from "./AuthoritySelect";
import { CheckBox, Label, Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import BadgeIcon from "@mui/icons-material/Badge";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { theme } from "../../Config";
import { ModalIcon } from "../workspace/AddWorkspace";

function ShareUser({ searchList, setSearchList, type, member }) {
  const [userList, setUserList] = useState([]);
  // const [memberList, setMemberList] = useState([]);
  console.log(searchList);
  if (!member) {
    member = [];
  }
  const headCells = [
    {
      id: "department",
      numeric: false,
      disablePadding: true,
      label: "부서",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "이름",
    },
  ];
  const user = getUser();
  useEffect(() => {
    if (type === "document") {
      headCells.push({
        id: "authority",
        numeric: false,
        disablePadding: true,
        label: "권한",
      });
    }
  }, []);
  useEffect(() => {
    if (member.length) {
      setSearchList(member);
    }
  }, [member.length]);
  console.log(searchList);
  console.log(member);
  function checkDuplication(arr, user) {
    let check = false;
    arr.map((element) => {
      if (element.userNo === user.userNo) {
        check = true;
      }
    });
    return check;
  }
  const deleteHandler = (userNo) => {
    console.log(searchList);
    setSearchList(searchList.filter((v) => v.userNo !== userNo));
  };

  const [checked, setChecked] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Typography component="h3" mt={1}>
          사원 검색
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TextField
            id="searchUserName"
            InputProps={{
              startAdornment: (
                <ModalIcon position="start">
                  <BadgeIcon />
                </ModalIcon>
              ),
            }}
            variant="outlined"
            label="사원 이름"
            margin="normal"
          />
          <IconButton
            size="large"
            onClick={() => {
              const userName = document.getElementById("searchUserName").value;
              userName && findUser(userName, setUserList);
            }}
          >
            <Search sx={{ fontSize: "1.2em" }} />
          </IconButton>
        </Box>

        <Typography component="h3" mt={1}>
          검색 결과
        </Typography>
        <Card variant="outlined" sx={{ minHeight: 275 }}>
          {userList.map((users, index) => {
            if (
              users.userNo !== user.userNo &&
              !checkDuplication(searchList, users)
            ) {
              return (
                <Typography key={users.userNo} sx={{ display: "flex" }}>
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSearchList(
                          searchList.length === 0
                            ? [users]
                            : [...searchList, users]
                        );
                      } else {
                        deleteHandler(users.userNo);
                      }
                      setChecked(e.target.value);
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "130px",
                      alignItems: "center",
                    }}
                  >
                    <span>{users.dept.deptName + "팀"}</span>
                    <span>{users.name}</span>
                  </Box>
                </Typography>
              );
            }
          })}
        </Card>
        <Typography component="h3" mt={1}>
          사원 목록
        </Typography>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  sx={{ fontSize: "1em" }}
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                >
                  {headCell.label}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {searchList.map((search, index) => (
              <TableRow
                key={search.userNo}
                sx={{ maxHeight: 70 }}
                hover
                role="checkbox"
              >
                {console.log(search)}
                <TableCell component="th">{search.dept.deptName}</TableCell>
                <TableCell component="th">{search.name}</TableCell>
                {type !== "workspace" ? (
                  <TableCell component="th">
                    <AuthoritySelect search={search} />
                  </TableCell>
                ) : (
                  <></>
                )}
                <TableCell component="th">
                  {checkDuplication(member, search) ? (
                    <IconButton disabled>
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => deleteHandler(search.userNo)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default ShareUser;
