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
  Avatar,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { findUser } from "../../api/userApi";
import AuthoritySelect from "./AuthoritySelect";
import { Search } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import { Box } from "@mui/system";
import { ModalIcon } from "../workspace/AddWorkspace";
import { MyContext } from "../Main";

function ShareUser({ searchList, setSearchList, type, member }) {
  const [userList, setUserList] = useState([]);
  const { userInfo } = useContext(MyContext);
  if (!member) {
    member = [];
  }
  const headCells = [
    {
      id: "profile",
      numeric: false,
      disablePadding: true,
      label: "프로필",
    },
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
  const checkDuplication = (arr, userInfo) => {
    let check = false;
    arr.map((element) => {
      if (element.userNo === userInfo.userNo) {
        check = true;
      }
      return element;
    });
    return check;
  };
  const deleteHandler = (userNo) => {
    setSearchList(searchList.filter((v) => v.userNo !== userNo));
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    const userName = document.getElementById("searchUserName").value;
    userName && findUser(userName, setUserList);
  };

  return (
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
          onKeyPress={handleKeyPress}
        />
        <Button
          sx={{ fontSize: "1.1em", marginLeft: "10px" }}
          onClick={() => {
            const userName = document.getElementById("searchUserName").value;
            userName && findUser(userName, setUserList);
          }}
          endIcon={<Search sx={{ fontSize: "1.1em" }} />}
        >
          검색
        </Button>
      </Box>
      <Typography component="h3" mt={1}>
        검색 결과
      </Typography>
      <Card variant="outlined" sx={{ minHeight: 275 }}>
        {userList.map((users, index) => {
          if (
            users.userNo !== userInfo.userNo &&
            !checkDuplication(searchList, users)
          ) {
            return (
              <Box
                key={users.userNo}
                sx={{
                  display: "flex",
                  padding: "10px 0px 10px 0px",
                  "&:hover": {
                    backgroundColor: "#d0e8FF",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "800px",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSearchList(
                      searchList.length === 0 ? [users] : [...searchList, users]
                    );
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: "#3791F8" }}
                    src={users.profile}
                    height={3}
                  />
                  <span>{users.dept.deptName}</span>
                  <span>{users.name}</span>
                  <span>{users.email}</span>
                </Box>
              </Box>
            );
          } else {
            return <Fragment key={index} />;
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
              <TableCell component="th">
                <Avatar
                  sx={{ bgcolor: "#3791F8" }}
                  src={search.profile}
                  height={3}
                />
              </TableCell>
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
              {type === "workspace" ? <TableCell /> : <></>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default ShareUser;
