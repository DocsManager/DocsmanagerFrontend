import React, { useContext, useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { SvgIcon, TextField, ThemeProvider } from "@mui/material";
import ShareUser from "../main/ShareUser";
import { addWorkspace } from "../../api/workspaceApi";
import { getUser } from "../../component/getUser/getUser";
import { worksapcepublish } from "../../api/noticeApi";
import { styled } from "@mui/material/styles";
import {
  LaptopChromebook,
  AddBoxOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import { theme } from "../../Config";
import { MyContext } from "../Main";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none !important",
  overflow: "auto",
  height: "700px",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
};

export const ModalIcon = styled(SvgIcon)({
  color: "#3791f8",
});

export const WorkspaceButton = styled(Button)({
  backgroundColor: "#3791f8",
  fontSize: "1em",
});

export default function AddWorkspace({ open, setOpen }) {
  const [searchList, setSearchList] = useState([]);
  const handleClose = () => {
    setOpen(false);
    setSearchList([]);
  };
  //워크스페이스 번호를 알림 파라미터로 넘겨주기 위해 생성
  // const [newWorkspace, setNewWorkspace] = useState();
  const [loading, setLoading] = useState(false);
  // const newWorkspaceNo = newWorkspace && newWorkspace.workspaceNo.workspaceNo;
  const [title, setTitle] = useState("");
  const [clickHandler, setClickHandler] = useState(false);
  const { check, setCheckHandler } = useContext(MyContext);
  // 제목 없을 때 뜨는 textinput
  const fillTitle = () => {
    if (clickHandler === false || title) {
      return (
        <TextField
          id="workspaceTitle"
          InputProps={{
            startAdornment: (
              <ModalIcon position="start">
                <LaptopChromebook />
              </ModalIcon>
            ),
          }}
          variant="outlined"
          label="워크스페이스명"
          margin="normal"
        />
      );
    }
    if (clickHandler === true && !title) {
      return (
        <TextField
          id="workspaceTitle"
          InputProps={{
            startAdornment: (
              <ModalIcon
                position="start"
                sx={{ color: title ? "#3791f8" : "#d32f2f" }}
              >
                <LaptopChromebook />
              </ModalIcon>
            ),
          }}
          variant="outlined"
          label="워크스페이스명"
          margin="normal"
          error
          helperText="워크스페이스명은 필수 입력 사항입니다!"
        />
      );
    }
  };

  const closeHandler = () => {
    setOpen(false);
    setCheckHandler(!check);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6" //텍스트의 크기 뿐만 아니라 HTML 태그 결정, <h6/>로 마크업 됨
            component="h2" //variant prop과 상이한 HTML 태그를 사용해야 할 때는 component prop으로 태그명을 명시
            align="center"
            mb={2}
          >
            새로운 워크스페이스 {/**모달 이름 변경 */}
          </Typography>
          <React.Fragment>
            <Typography component="h3" mt={1}>
              워크스페이스명
            </Typography>
            {fillTitle()}
          </React.Fragment>

          <ShareUser
            searchList={searchList}
            setSearchList={setSearchList}
            type={"workspace"}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
            mt={2}
          >
            <WorkspaceButton
              variant="contained"
              onClick={() => {
                const title = document.getElementById("workspaceTitle").value;
                setTitle(title);
                if (title) {
                  const workspace = {
                    title: title,
                    master: getUser(),
                    userList: searchList,
                  };
                  addWorkspace(
                    workspace,
                    searchList,
                    setLoading,
                    closeHandler
                  );
                  // console.log(newWorkspace);
                  // newWorkspace &&
                  // worksapcepublish(searchList, newWorkspaceNo, setLoading);
                  setSearchList([]);
                  setTitle();
                }
                title ? setClickHandler(false) : setClickHandler(true);
                setCheckHandler(!check);
              }}
            >
              생성
              <AddBoxOutlined />
            </WorkspaceButton>
            <WorkspaceButton variant="contained" onClick={handleClose}>
              취소
              <CloseOutlined />
            </WorkspaceButton>
            </Box>
          </Box>
      </Modal>
    </div>
  );
}
