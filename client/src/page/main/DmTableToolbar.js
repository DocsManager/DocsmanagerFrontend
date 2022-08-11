import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Delete, FolderSpecial, Outbox, Warning } from "@mui/icons-material";
import { Button, Typography, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";

//문서 등록, 중요 문서 안내 버튼 styled 컴포넌트로
const EnrollBtn = styled(Button)({
  backgroundColor: "#3791f8",
  marginLeft: "10px",
  outline: "none !important",
});

const handleToolbarBtn = () => {
  switch (window.location.href.split("/main")[1]) {
    case "":
      return (
        <EnrollBtn variant="contained" endIcon={<Outbox />} onClick={() => {}}>
          문서 등록
        </EnrollBtn>
      );
    case "/share":
      return (
        <EnrollBtn variant="contained" endIcon={<Outbox />} onClick={() => {}}>
          문서 등록
        </EnrollBtn>
      );
    case "/important":
      return (
        <EnrollBtn variant="contained" endIcon={<FolderSpecial />}>
          중요한 문서를 관리해보세요!
        </EnrollBtn>
      );

    case "/trashcan":
      return (
        <EnrollBtn variant="contained" endIcon={<Warning />}>
          휴지통에서 삭제되면 복원할 수 없습니다!
        </EnrollBtn>
      );
  }
};

const handleTrashcanBtn = () => {
  if (window.location.href.split("/main")[1] === "/trashcan") {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <EnrollBtn
          variant="contained"
          endIcon={<Outbox />}
          onClick={() => {}}
          style={{ marginRight: "10px" }}
        >
          내 문서함으로 이동
        </EnrollBtn>
        <Button
          style={{}}
          variant="outlined"
          startIcon={<Delete />}
          onClick={() => {}}
        >
          영구 삭제
        </Button>
      </div>
    );
  } else {
    return (
      <Button
        style={{}}
        variant="outlined"
        startIcon={<Delete />}
        onClick={() => {}}
      >
        휴지통으로
      </Button>
    );
  }
};

const DmTableToolbar = ({ numSelected }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: " 1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {numSelected}개가 선택되었습니다
            {handleTrashcanBtn()}
            {/* <Button
              style={{}}
              variant="outlined"
              startIcon={<Delete />}
              onClick={() => {}}
            >
              휴지통으로
            </Button> */}
          </div>
        </Typography>
      ) : (
        <div>{handleToolbarBtn()}</div>
      )}
    </Toolbar>
  );
};

export default DmTableToolbar;
