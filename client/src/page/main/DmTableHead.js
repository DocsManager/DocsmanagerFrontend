import React from "react";
import { TableHead, TableCell, Checkbox, TableRow } from "@mui/material";
import {
  StarBorderOutlined,
  StarOutlined,
  WindowSharp,
} from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import DmTableHeadCell from "./DmTableHeadCell";

const headCells = [
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

const headCell2 = [
  {
    id: "originalName",
    numeric: false,
    disablePadding: true,
    label: "제목",
  },
  {
    id: "content",
    numeric: true,
    disablePadding: false,
    label: "내용",
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

const contentOrTitle = () => {
  switch (window.location.href.split("/main")[1]) {
    case "":
      return headCell2;
    case "/share":
      return headCells;
    case "/important":
      return headCell2;
    case "/trashcan":
      return headCell2;
  }
};

function DmTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    onSelectAllStar,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const arr = [headCell2, headCells];
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            //선택된 행의 개수가 0보다 크지만 전체 리스트의 총 길이보다는 작은 상태
            checked={rowCount > 0 && numSelected === rowCount}
            //리스트의 총 길이가 0보다 크고 선택된 행의 개수가 리스트 총 길이와 같으면 전체 체크
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell>
          <Checkbox
            onChange={onSelectAllStar}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            icon={<StarBorderOutlined />}
            checkedIcon={<StarOutlined sx={{ color: "#F4E029" }} />}
          />
        </TableCell>
        {contentOrTitle().map((headCell) => (
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
