import React, { useState, useEffect, useContext } from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  Pagination,
} from "@mui/material";
import { Box, TableRow, Table, Paper, Checkbox } from "@mui/material";
import { StarBorderOutlined, StarOutlined } from "@mui/icons-material";
import DmTableHead from "./DmTableHead";
import DmTableToolbar from "./DmTableToolbar";
import { MyContext } from "../Main";
import { getList, importantFile } from "../../api/documentApi";
import { NoneData } from "./NoneData";
import DocumentModal from "./DocumentModal";
import { searchDocument } from "../../api/documentApi";
import { NoSearchData } from "./NoSearchData";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0].documentNo, b[0].documentNo);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function fileCategoryIcon(fileCategory) {
  switch (true) {
    case fileCategory.includes("jpeg"):
    case fileCategory.includes("png"):
    case fileCategory.includes("jpg"):
      return (
        <img
          src="https://img.icons8.com/fluency/30/000000/image.png"
          alt="img"
        />
      );
    case fileCategory.includes("pdf"):
      return (
        <img
          src="https://img.icons8.com/ios-filled/30/ff0000/pdf--v1.png"
          alt="pdf"
        />
      );
    case fileCategory.includes("ppt"):
    case fileCategory.includes("powerpoint"):
    case fileCategory.includes("show"):
      return (
        <img
          src="https://img.icons8.com/color/30/000000/powerpoint.png"
          alt="ppt"
        />
      );
    case fileCategory.includes("excel"):
    case fileCategory.includes("xls"):
    case fileCategory.includes("cell"):
      return (
        <img src="https://img.icons8.com/color/30/000000/xls.png" alt="excel" />
      );
    case fileCategory.includes("docx"):
    case fileCategory.includes("hwp"):
    case fileCategory.includes("word"):
    case fileCategory.includes("hwdt"):
      return (
        <img
          src="https://img.icons8.com/color/30/000000/google-docs--v1.png"
          alt="hwp"
        />
      );
    case fileCategory.includes("zip"):
      return (
        <img
          src="https://img.icons8.com/color/30/000000/archive.png"
          alt="zip"
        />
      );
    default:
      return (
        <img
          src="https://img.icons8.com/color/30/000000/file.png"
          alt="default"
        />
      );
  }
}

export default function DmTable(props) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  // const [selectStar, setSelectStar] = useState([]);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [documentInfo, setDocumentInfo] = useState("");
  const [searchCategory, setSearchCategory] = useState("originalName");
  // const [searchData, setSearchData] = useState("");
  const {
    check,
    setCheckHandler,
    userInfo,
    searchData,
    setSearchDataHandler,
  } = useContext(MyContext);
  const rowsPerPage = 10;

  useEffect(() => {
    searchData
      ? searchDocument(
          userInfo.userNo,
          searchData,
          props.documentUrl ? props.documentUrl : "",
          setList,
          page ? page : page + 1,
          searchCategory
        )
      : getList(
          setList,
          page ? page : page + 1,
          props.documentUrl ? props.documentUrl : "",
          userInfo
        );
  }, [check, page]);
  if (list.dtoList) {
    if (page !== 0 && list.totalPage === page - 1) {
      setPage(page - 1);
    }
  }
  let newSelected = [];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      //체크 표시할 시, 모든 documentNo를 담음
      newSelected = list.dtoList;
      // .slice(
      //   page * rowsPerPage,
      //   (page + 1) * rowsPerPage
      // );
      setSelected(newSelected);
    } else {
      setSelected([]); //아닐 경우 selected에는 빈값
    }
  };

  //각 table row에 걸려있는 클릭 이벤트
  const handleClick = (event, li) => {
    if (event.target.checked) {
      setSelected(selected.length === 0 ? [li] : [...selected, li]);
    } else {
      setSelected(
        selected.filter(
          (v) => v.documentNo.documentNo !== li.documentNo.documentNo
        )
      );
    }
  };
  const handleChange = (event, value) => {
    setSelected([]);
    setPage(value);
  };

  //행마다 별 클릭하는 이벤트
  const handleStarClick = (event, li) => {
    importantFile(
      li.documentNo.documentNo,
      li.important ? 0 : 1,
      userInfo,
      setCheckHandler,
      check
    );
    // check ? setCheckHandler(false) : setCheckHandler(true);
  };

  const isSelected = (documentNo) => {
    let check = false;
    selected.map((select) => {
      if (select.documentNo.documentNo === documentNo) {
        check = true;
      }
      return select;
    });
    return check;
  };
  const isStarClicked = () => {
    let check = false;
    list.dtoList.map((v) => {
      if (v.documentNo.important === 1) {
        check = true;
      }
      return v;
    });
    return check;
  };
  const emptyRows = //emptyRows 수정 09.14
    page >= 0
      ? Math.max(0, rowsPerPage - (list.dtoList && list.dtoList.length))
      : 0;
  return (
    <React.Fragment>
      {list.dtoList ? (
        list.dtoList.length === 0 && !searchData ? (
          <NoneData />
        ) : list.dtoList.length === 0 ? (
          // 검색하는 창 살리려고 NoSearchData를 테이블 틀로 감쌌음!
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "98%", mb: 2, margin: "0 auto" }}>
              <DmTableToolbar
                numSelected={selected.length}
                newSelected={selected}
                setSelected={setSelected}
                documentUrl={props.documentUrl}
                setList={setList}
                setSearchData={setSearchDataHandler}
                searchData={searchData}
                page={page}
                setPage={setPage}
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
              />
              <NoSearchData />
            </Paper>
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "98%", mb: 2, margin: "0 auto" }}>
              <DmTableToolbar
                numSelected={selected.length}
                newSelected={selected}
                setSelected={setSelected}
                documentUrl={props.documentUrl}
                setList={setList}
                setSearchData={setSearchDataHandler}
                searchData={searchData}
                page={page}
                setPage={setPage}
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
              />
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <DmTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={list.dtoList && list.dtoList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                  />
                  <TableBody>
                    {stableSort(list.dtoList, getComparator(order, orderBy))
                      // .slice(
                      //   page * rowsPerPage,
                      //   page * rowsPerPage + rowsPerPage
                      // )
                      .map((li, index) => {
                        const isItemSelected = isSelected(
                          li.documentNo.documentNo
                        );
                        const isStarSelected = isStarClicked();
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1} //탭 순서 임의로 컨트롤
                            key={li.documentNo.documentNo}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                // onClick={(event) => handleClick(event, li)}
                                onChange={(event) => handleClick(event, li)}
                              />
                            </TableCell>
                            <TableCell>
                              {li.important ? (
                                <Checkbox
                                  icon={
                                    <StarOutlined sx={{ color: "#F4E029" }} />
                                  }
                                  checked={isStarSelected}
                                  checkedIcon={<StarBorderOutlined />}
                                  onClick={(event) =>
                                    handleStarClick(event, li)
                                  }
                                />
                              ) : (
                                <Checkbox
                                  icon={<StarBorderOutlined />}
                                  checked={isStarSelected}
                                  checkedIcon={
                                    <StarOutlined sx={{ color: "#F4E029" }} />
                                  }
                                  onClick={(event) =>
                                    handleStarClick(event, li)
                                  }
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {fileCategoryIcon(li.documentNo.fileCategory)}
                              </Box>
                            </TableCell>

                            <TableCell
                              sx={{ cursor: "pointer" }}
                              component="th"
                              id={labelId}
                              scope="row"
                              align="center"
                              onClick={() => {
                                setInfoModalOpen(true);
                                setDocumentInfo(li);
                                setSelected([]);
                              }}
                            >
                              {li.documentNo.originalName}
                            </TableCell>
                            <TableCell align="center">
                              {li.documentNo.user.name}
                            </TableCell>

                            {li.documentNo.fileSize < 1024 ? (
                              <TableCell align="center">
                                {li.documentNo.fileSize.toFixed(2)} KB
                              </TableCell>
                            ) : (
                              <TableCell align="center">
                                {(li.documentNo.fileSize / 1024).toFixed(2)} MB
                              </TableCell>
                            )}
                            <TableCell align="center">
                              {li.documentNo.registerDate
                                .replace("T", " ")
                                .slice(0, 16)}
                            </TableCell>
                            <TableCell align="center">
                              {li.documentNo.modifyDate
                                .replace("T", " ")
                                .slice(0, 16)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows >
                      0 /**>=0이면 애매하게 칸이 생겨서 >0으로 바꿈 */ && (
                      <TableRow
                        style={{
                          height: 77.422 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={10} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Pagination
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              count={list.totalPage}
              page={page ? page : page + 1}
              onChange={handleChange}
              color="primary"
              shape="rounded"
              variant="outlined"
              size="large"
              sx={{ margin: 2 }}
            />
            {documentInfo && (
              <DocumentModal
                open={infoModalOpen}
                document={documentInfo}
                infoModalOpen={setInfoModalOpen}
              />
            )}
          </Box>
        )
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
