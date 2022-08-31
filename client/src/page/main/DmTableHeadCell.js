import React from "react";
import { TableCell, TableSortLabel, Box, ThemeProvider } from "@mui/material";
import { theme } from "../../Config";
function DmTableHeadCell({
  headCell,
  orderBy,
  createSortHandler,
  visuallyHidden,
  order,
}) {
  return (
    // <ThemeProvider theme={theme}>
    <TableCell
      key={headCell.id}
      align="center"
      padding={headCell.disablePadding ? "none" : "normal"}
      sortDirection={orderBy === headCell.id ? order : false} //orderBy가 headCell의 id와 일치하면 오름차순 아니면 정렬되지 않은 상태
      //sortDirection은 aria-sort 속성 값임(aria-sort=>표나 그리드에서 오름차순 또는 내림차순으로 정렬할 수 있는지 알려주는 값)
    >
      <TableSortLabel
        active={orderBy === headCell.id} //orderBy와 headCell의 id가 일치해야 활성화됨
        direction={orderBy === headCell.id ? order : "asc"} //현재 정렬 방식은 orderBy와 headCell의 id가 일치하면 order(setOrder로 값은 계속 바뀜) 일치하지 않으면 오름차순 정렬
        onClick={createSortHandler(headCell.id)}
        style={{ fontSize: "1.1em" }}
      >
        {headCell.label}

        {orderBy === headCell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
    // </ThemeProvider>
  );
}
export default DmTableHeadCell;
