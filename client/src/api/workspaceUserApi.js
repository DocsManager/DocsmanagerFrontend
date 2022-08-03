import React from "react";
import axios from "axios";

const baseUrl = "/api/workspace/user/";

export function getUserWorkspace(userNo, setWorkspace) {
  const url = baseUrl + userNo;
  axios
    .get(url)
    .then((res) => setWorkspace(res.data))
    .catch((err) => console.log(err));
}
