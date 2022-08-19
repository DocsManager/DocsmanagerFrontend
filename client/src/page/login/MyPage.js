import { config } from "@fortawesome/fontawesome-svg-core";
import React, { Component } from "react";
import axios, { post } from "axios";

// const URL = "http://localhost:8080/api/upload";

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  fileUpload(file) {
    const url = "http://localhost:8080/api/upload";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  upload = (e) => {
    e.preventDefault();
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
    });
  };
  filechange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  render() {
    return (
      <div>
        <h1>이미지 업로드</h1>
        <form onSubmit={this.upload}>
          <h1>Ffile upload</h1>
          <input type="file" onChange={this.filechange} name="file" />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}
export default Mypage;
