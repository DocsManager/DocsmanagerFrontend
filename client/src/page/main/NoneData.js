import React, { useState } from "react";
import { Box } from "@mui/system";

import WriteModal from "./WriteModal";
import { EnrollBtn } from "./DmTableToolbar";

// const Enrollbtn = styled(ButtonUnstyled)({
//   backgroundColor: "#3791f8",
//   width: "200px",
//   color: "white",
//   border: "none",
//   padding: "10px",
//   borderRadius: "5px",
//   outline: "none !important",
//   cursor: "pointer",
// });

const whichPageisNone = (open, setOpen, writeModalOpen, setWriteModalOpen) => {
  switch (window.location.href.split("/main")[1]) {
    case "/share":
      return (
        <Box
          sx={{
            width: "80vw",
            height: "80%",
            display: "grid",
            gridTemplateRows: "1fr 1fr 2fr",
          }}
        >
          <Box />
          <Box sx={{ margin: "0 auto" }}>
            <img src={`${process.env.PUBLIC_URL}/012.png`} />
          </Box>
          <Box sx={{ margin: "0 auto" }}>
            <Box>
              <div
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                <p style={{ fontSize: "1.3em" }}>공유받은 문서가 없습니다!</p>
                <p>공유받은 문서를 관리해보세요!</p>
                <EnrollBtn
                  variant="contained"
                  onClick={() => {
                    setWriteModalOpen(true);
                    console.log(open);
                  }}
                >
                  공유할 문서 등록하기
                </EnrollBtn>
              </div>
              <WriteModal
                open={writeModalOpen}
                setWriteModal={setWriteModalOpen}
                close={() => wirteOpen(writeModalOpen, setWriteModalOpen)}
              />
            </Box>
          </Box>
        </Box>
      );
    case "/important":
      return (
        <Box
          sx={{
            width: "80vw",
            height: "80%",
            display: "grid",
            gridTemplateRows: "1fr 1fr 2fr",
          }}
        >
          <Box />
          <Box sx={{ margin: "0 auto" }}>
            <img src={`${process.env.PUBLIC_URL}/015.png`} />
          </Box>
          <Box sx={{ margin: "0 auto" }}>
            <Box>
              <div
                style={{
                  margin: "0 auto",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "1.3em" }}>
                  중요 문서함으로 이동된 문서가 없습니다
                </p>
                <p>중요 문서를 관리해보세요!</p>
              </div>
            </Box>
          </Box>
        </Box>
      );
    case "/trashcan":
      return (
        <Box
          sx={{
            width: "80vw",
            height: "80%",
            display: "grid",
            gridTemplateRows: "1fr 1fr 2fr",
          }}
        >
          <Box />
          <Box sx={{ margin: "0 auto" }}>
            <img src={`${process.env.PUBLIC_URL}/005.png`} />
          </Box>
          <Box sx={{ margin: "0 auto" }}>
            <Box>
              <div
                style={{
                  margin: "0 auto",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "1.3em" }}>항목 없음</p>
                <p>휴지통으로 이동된 항목이 없습니다.</p>
              </div>
            </Box>
          </Box>
        </Box>
      );

    case "/workspace":
      return (
        <Box
          sx={{
            width: "80vw",
            height: "80%",
            display: "grid",
            gridTemplateRows: "1fr 1fr 2fr",
          }}
        >
          <Box />
          <Box sx={{ margin: "0 auto" }}>
            <img src={`${process.env.PUBLIC_URL}/014.png`} />
          </Box>
          <Box sx={{ margin: "0 auto" }}>
            <Box>
              <div
                style={{
                  margin: "0 auto",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "1.3em" }}>워크스페이스가 없습니다.</p>
                <p>생성된 워크스페이스가 없습니다.</p>
              </div>
            </Box>
          </Box>
        </Box>
      );

    default:
      return (
        <Box
          sx={{
            width: "80vw",
            height: "80%",
            display: "grid",
            gridTemplateRows: "1fr 1fr 2fr",
          }}
        >
          <Box />
          <Box sx={{ margin: "0 auto" }}>
            <img src={`${process.env.PUBLIC_URL}/011.png`} />
          </Box>
          <Box sx={{ margin: "0 auto" }}>
            <Box>
              <div
                style={{
                  margin: "0 auto",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "1.3em" }}>내 문서함이 비어있습니다!</p>
                <p>내 문서함에 등록된 문서가 없습니다.</p>
                <EnrollBtn
                  variant="contained"
                  onClick={() => {
                    setWriteModalOpen(!open);
                    console.log(open);
                  }}
                >
                  문서 등록하기
                </EnrollBtn>
              </div>
            </Box>
          </Box>
          <WriteModal
            open={writeModalOpen}
            close={() => wirteOpen(writeModalOpen, setWriteModalOpen)}
            setWriteModal={setWriteModalOpen}
          />
          {/* {open ? <WriteModal /> : <React.Fragment />} */}
        </Box>
      );
  }
};

const wirteOpen = (writeModalOpen, setWriteModalOpen) => {
  writeModalOpen ? setWriteModalOpen(false) : setWriteModalOpen(true);
};

export const NoneData = () => {
  const [open, setOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  return (
    <React.Fragment>
      {whichPageisNone(open, setOpen, writeModalOpen, setWriteModalOpen)}
    </React.Fragment>
  );
};
