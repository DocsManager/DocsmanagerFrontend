import { Button } from "@mui/material";
import { Container, height } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NotFound() {
  let navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/notfound.png`}
        alt="여기 이미지"
        height="400px"
      />
      <div>
        <h1 style={{ color: "#3791f8" }}>페이지를 찾을 수 없습니다.</h1>
      </div>
      <div>
        <h1>(404 not found)</h1>
      </div>
      <br />
      <p>
        <h6>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</h6>
      </p>
      <p>
        <h6>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다</h6>
      </p>
      <br />
      <div
        style={{ display: "flex", width: 500, justifyContent: "space-around" }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{ width: 165 }}
        >
          이전 화면
        </Button>
        <Link to="/">
          <Button size="large" variant="contained" sx={{ width: 165 }}>
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default NotFound;
