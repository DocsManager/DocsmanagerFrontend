import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/login/Login";
import SignUp from "./page/login/SignUp";
import Main from "./page/Main";
import MyBox from "./page/main/MyBox";
import NotFound from "./page/notfound/NotFound";
import WorkspaceList from "./page/workspace/WorkspaceList";
import DocumentWrite from "./page/workspace/DocumentWriter";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<Main />}>
        <Route index element={<MyBox />} />
        <Route path="workspace" element={<WorkspaceList />} />
        <Route path="document" element={<DocumentWrite />} />
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
