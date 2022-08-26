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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useRef, useState } from "react";
import { findMember, findUser } from "../../api/userApi";
import { getUser } from "../../component/getUser/getUser";
import AuthoritySelect from "./AuthoritySelect";

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
  return (
    <React.Fragment>
      <Typography component="h3">사원 검색</Typography>
      <TextField id="searchUserName" label="사원이름" variant="outlined" />
      <Button
        onClick={() => {
          const userName = document.getElementById("searchUserName").value;
          userName && findUser(userName, setUserList);
        }}
      >
        검색
      </Button>

      <Typography component="h3">검색 결과</Typography>
      <Card variant="outlined" sx={{ minHeight: 275 }}>
        {userList.map((users, index) => {
          if (
            users.userNo !== user.userNo &&
            !checkDuplication(searchList, users)
          ) {
            return (
              <Typography key={users.userNo}>
                <input
                  type="checkbox"
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
                  }}
                />
                <span>{users.dept.deptName}</span>
                <span>{users.name}</span>
              </Typography>
            );
          }
        })}
      </Card>
      <Typography component="h3">사원 목록</Typography>
      <Table aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
              >
                {headCell.label}
              </TableCell>
            ))}
            <TableCell />
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
  );
}

export default ShareUser;
