import { Box, Typography } from "@mui/material";
import React from "react";

export const NoSearchData = () => {
  return (
    <Box
      sx={{
        width: "70vw",
        height: "80%",
        display: "grid",
        gridTemplateRows: "1fr 1fr 2fr",
      }}
    >
      <Box />
      <Box sx={{ margin: "0 auto" }}>
        <img src={`${process.env.PUBLIC_URL}/016.png`} />
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
            <p style={{ fontSize: "1.3em" }}>검색 결과 없음</p>
            <p>일치하는 검색어가 없습니다.</p>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
