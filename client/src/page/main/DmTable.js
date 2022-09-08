import React, { useState, useEffect, createContext, useContext } from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  Typography,
  ThemeProvider,
  Pagination,
} from "@mui/material";
import { Box, TablePagination, TableRow, LinearProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Table, Button } from "@mui/material";
import { StarBorderOutlined, StarOutlined } from "@mui/icons-material";
import DmTableHead from "./DmTableHead";
import DmTableToolbar from "./DmTableToolbar";
import { getUser } from "../../component/getUser/getUser";
import { MyContext } from "../Main";
import {
  fileSize,
  getList,
  importantFile,
  searchDocument,
  removeImportantFile,
} from "../../api/documentApi";
import { NoneData } from "./NoneData";
import DocumentModal from "./DocumentModal";
import Sidebar from "./Sidebar";
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

function fileCategoryIcon(fileCategory) {
  switch (true) {
    case fileCategory.includes("jpeg"):
    case fileCategory.includes("png"):
      return (
        <TableCell>
          <img src="https://img.icons8.com/fluency/30/000000/image.png" />
        </TableCell>
      );
    case fileCategory.includes("pdf"):
      return (
        <TableCell>
          <img src="https://img.icons8.com/ios-filled/30/ff0000/pdf--v1.png" />{" "}
        </TableCell>
      );
    case fileCategory.includes("ppt"):
    case fileCategory.includes("powerpoint"):
      return (
        <TableCell>
          <img src="https://img.icons8.com/color/30/000000/powerpoint.png" />{" "}
        </TableCell>
      );
    case fileCategory.includes("excel"):
    case fileCategory.includes("xls"):
      return (
        <TableCell>
          <img src="https://img.icons8.com/color/30/000000/xls.png" />{" "}
        </TableCell>
      );
    case fileCategory.includes("docx"):
    case fileCategory.includes("hwp"):
    case fileCategory.includes("word"):
      return (
        <TableCell>
          <img src="https://img.icons8.com/color/30/000000/google-docs--v1.png" />{" "}
        </TableCell>
      );
    case fileCategory.includes("zip"):
      return (
        <TableCell>
          <img src="https://img.icons8.com/color/30/000000/archive.png" />{" "}
        </TableCell>
      );
    default:
      return (
        <TableCell>
          <img src="https://img.icons8.com/color/30/000000/file.png" />{" "}
        </TableCell>
      );
  }
}

// export const MyContext = createContext({
//   check: "",
//   setCheckHandler: (check) => {},
// });

export default function DmTable(props) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectStar, setSelectStar] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [documentInfo, setDocumentInfo] = useState("");

  // const [pageList, setPageList] = useState({});

  // const [pageNum, setPageNum] = useState(1);

  // const [check, setCheck] = useState(false);
  const [searchData, setSearchData] = useState("");
  // const [size, setSize] = useState(0);
  const { check, setCheckHandler } = useContext(MyContext);

  // const setCheckHandler = (check) => setCheck(check);

  useEffect(() => {
    getList(
      setList,
      page ? page : page + 1,
      props.documentUrl ? props.documentUrl : ""
    );
    // fileSize(getUser().userNo, setSize);
    // setPage(0);
  }, [check, page]);
  console.log(page);
  // {
  //   console.log(pageList.dtoList && pageList.dtoList.length);
  // }
  if (list.dtoList) {
    if (page !== 0 && list.dtoList.length === 0) {
      setPage(page - 1);
    }
  }
  let newSelected = [];
  const handleRequestSort = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      console.log("--------------");
      //체크 표시할 시, 모든 documentNo를 담음
      console.log(page);
      console.log(rowsPerPage);
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
    console.log(page);
    console.log(rowsPerPage);
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
    setPage(value);
    setSelected([]);
  };

  //행마다 별 클릭하는 이벤트
  const handleStarClick = (event, li) => {
    const selectedIndex = selectStar.indexOf(li.documentNo); //selected라는 빈 배열에 documentNo 값을 찾았을 때 검색된 문자열이 첫번째로 나타나는 위치를 알려줌
    // console.log(selectedIndex);
    let newSelected = [];
    if (selectedIndex === -1) {
      //-1이면 찾는 문자열이 배열에 없다는 뜻
      newSelected = newSelected.concat(selectStar, li.documentNo); //newSelected라는 빈 배열에 이미 선택된 값을 담은 selected 배열과 documentNo를 합쳐 담기
    } else if (selectedIndex === 0) {
      //이미 선택한 row 인덱스가 제일 처음부터 배열에 존재한다면? => 선택된 값이 담겨있는 selected 배열에서 다음 값(slice 함수 사용)을 합쳐 newSelected 배열에 담아야 함
      newSelected = newSelected.concat(selectStar.slice(1));
    } else if (selectedIndex === selectStar.length - 1) {
      newSelected = newSelected.concat(selectStar.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectStar.slice(0, selectedIndex),
        selectStar.slice(selectedIndex + 1)
      );
    }
    setSelectStar(newSelected);
    if (li.important) {
      importantFile(li.documentNo.documentNo, 0);
      check ? setCheckHandler(false) : setCheckHandler(true);
    } else {
      importantFile(li.documentNo.documentNo, 1);
    }

    //렌더링 - 별 씹힘
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value, parseInt(event.target.value, 10));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (documentNo) => {
    let check = false;
    selected.map((select) => {
      if (select.documentNo.documentNo === documentNo) {
        check = true;
      }
    });
    return check;
  };
  const isStarClicked = (documentNo) => selectStar.indexOf(documentNo) !== -1;

  const emptyRows =
    page >= 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  return (
    <React.Fragment>
      {list.dtoList ? (
        list.dtoList.length === 0 && !searchData ? (
          <NoneData />
        ) : list.dtoList.length === 0 ? (
          // 검색하는 창 살리려고 NoSearchData를 테이블 틀로 감쌌음!
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "98%", mb: 2, margin: "0 auto" }}>
              <MyContext.Provider value={{ check, setCheckHandler }}>
                <DmTableToolbar
                  numSelected={selected.length}
                  newSelected={selected}
                  setSelected={setSelected}
                  documentUrl={props.documentUrl}
                  setList={setList}
                  setSearchData={setSearchData}
                />
              </MyContext.Provider>
              <NoSearchData />
            </Paper>
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            {console.log(list.dtoList)}
            <Paper sx={{ width: "98%", mb: 2, margin: "0 auto" }}>
              <DmTableToolbar
                numSelected={selected.length}
                newSelected={selected}
                setSelected={setSelected}
                documentUrl={props.documentUrl}
                setList={setList}
                setSearchData={setSearchData}
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
                    totalPage={list.totalPage}
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
                        const isStarSelected = isStarClicked(li.documentNo);
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
                            {fileCategoryIcon(li.documentNo.fileCategory)}

                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              align="center"
                              onClick={() => {
                                setInfoModalOpen(true);
                                setDocumentInfo(li);
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
                          height: 45 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={10} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={list.length * 2}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
              <Pagination
                count={list.totalPage}
                page={page}
                onChange={handleChange}
              />
            </Paper>
            {documentInfo && (
              <DocumentModal
                open={infoModalOpen}
                document={documentInfo}
                infoModalOpen={setInfoModalOpen}
                page={page}
                setPage={setPage}
                dtoList={list.dtoList.length}
              />
            )}
            {/* <div>
            <button
              className="pageButton"
              onClick={() =>
                setPages(
                  pageList.start - pageList.size >= 1
                    ? pageList.start - pageList.size
                    : pages
                )
              }
            >
              이전
            </button>

            {pageList &&
              pageList.pageList.map((page) => {
                return (
                  <span
                    className={pages === page ? "pageNum" : "pageOut"}
                    onClick={() => {
                      setPages(page);
                    }}
                    key={page}
                  >
                    {page}
                  </span>
                );
              })}
            <button
              className="pageButton"
              onClick={() =>
                setPages(
                  pageList.start + pageList.size > pageList.totalPage
                    ? pages
                    : pageList.start + pageList.size
                )
              }
            >
              다음
            </button>
          </div> */}
          </Box>
        )
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
