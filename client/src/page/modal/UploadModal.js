import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import ConfirmModal from "../main/ConfirmModal";
import SucessModal from "../main/SucessModal";
function UploadModal(props) {
  const {
    sizeCheck,
    writeSuccessConfirm,
    successWrite,
    openSuccessWriteModal,
    loading,
    writeFile,
    writeConfirm,
    setWriteConfirm,
  } = props;
  return (
    <Fragment>
      <ConfirmModal
        open={writeConfirm}
        setOpen={setWriteConfirm}
        act={() => {
          {
            // writeFile(file, documentDTO, documentUser, setSizeCheck);
            openSuccessWriteModal(writeFile);
            // check ? setCheckHandler(false) : setCheckHandler(true);
          }
        }}
      >
        <Typography>등록 하시겠습니까?</Typography>
      </ConfirmModal>
      <SucessModal open={loading}>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
          <Typography>업로드 중입니다...</Typography>
        </Box>
      </SucessModal>
      {sizeCheck === 1 ? (
        <SucessModal open={writeSuccessConfirm} close={successWrite}>
          <Typography>작성 완료</Typography>
        </SucessModal>
      ) : sizeCheck === 0 ? (
        <SucessModal open={writeSuccessConfirm} close={successWrite}>
          <Typography>용량 초과</Typography>
        </SucessModal>
      ) : (
        <></>
      )}
    </Fragment>
  );
}
export default UploadModal;