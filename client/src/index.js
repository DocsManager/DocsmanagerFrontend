import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/login/Login";
import SignUp from "./page/login/SignUp";
import Main from "./page/Main";
import NotFound from "./page/notfound/NotFound";
import WorkspaceList from "./page/workspace/WorkspaceList";
import Workspace from "./page/workspace/Workspace";
import TrashCan from "./page/main/TrashCan";
import MyBox from "./page/main/MyBox";
import ShareBox from "./page/main/ShareBox";
import Important from "./page/main/Important";
import Mypage from "./page/login/MyPage";
import FindIdAndPw from "./page/login/FindIdAndPw";
import SuccessSignup from "./page/login/SuccessSignup";
import PrivateRoutes from "./page/login/PrivateRoute";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/mypage" element={<Mypage />} />
      </Route>
      <Route path="/findidpw" element={<FindIdAndPw />} />
      <Route path="/successsignup" element={<SuccessSignup />} />
      <Route path="/main" element={<Main />}>
        <Route index element={<MyBox />} />
        <Route path="share" element={<ShareBox />} />
        <Route path="important" element={<Important />} />
        <Route path="workspace" element={<WorkspaceList />} />
        <Route path="document" element={<Workspace />} />
        <Route path="trashcan" element={<TrashCan />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
