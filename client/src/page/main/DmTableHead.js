import React from "react";
import {
  TableHead,
  TableCell,
  Checkbox,
  TableRow,
  IconButton,
} from "@mui/material";
import { StarOutlined } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import DmTableHeadCell from "./DmTableHeadCell";

const headCells = [
  {
    id: "fileCategory",
    numeric: false,
    disablePadding: true,
    label: "유형",
  },
  {
    id: "originalName",
    numeric: false,
    disablePadding: true,
    label: "제목",
  },
  {
    id: "user.name",
    numeric: true,
    disablePadding: false,
    label: "작성자",
  },
  {
    id: "fileSize",
    numeric: true,
    disablePadding: false,
    label: "용량",
  },
  {
    id: "registerDate",
    numeric: true,
    disablePadding: false,
    label: "등록일",
  },
  {
    id: "modifyDate",
    numeric: true,
    disablePadding: false,
    label: "수정일",
  },
];

function DmTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    rowsPerPage,
    page,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const checkAll = (rowCount, page, rowsPerPage, numSelected) => {
    if (numSelected === rowCount) {
      return true;
    } else {
      return false;
    }
    // if (
    //   page === totalPage &&
    //   numSelected < rowsPerPage &&
    //   numSelected === (rowCount % (page * rowsPerPage)) % 10 &&
    //   numSelected !== 0
    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            //선택된 행의 개수가 0보다 크지만 전체 리스트의 총 길이보다는 작은 상태
            checked={
              //페이징 처리 수정 09.02
              checkAll(rowCount, page, rowsPerPage, numSelected)
            }
            //리스트의 총 길이가 0보다 크고 선택된 행의 개수가 리스트 총 길이와 같으면 전체 체크
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton disabled>
            <StarOutlined sx={{ color: "#F4E029", margin: " 0.0390625vw" }} />
          </IconButton>
        </TableCell>
        {headCells.map((headCell) => (
          <DmTableHeadCell
            key={headCell.label}
            headCell={headCell}
            orderBy={orderBy}
            order={order}
            createSortHandler={createSortHandler}
            visuallyHidden={visuallyHidden}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}

export default DmTableHead;
