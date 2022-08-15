import React, { useState, useEffect } from "react";
import { allUser } from "../../api/userApi";
import { getUser } from "../../component/getUser/getUser";

function ShareUser() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    allUser(setUserList);
  }, []);
  return (
    <React.Fragment>
      <h5>사원 검색</h5>
      <input type="text" />
      <button>검색</button>

      <h5>검색 결과</h5>
      <table>
        <thead>
          <tr>
            <th />
            <th>부서</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <React.Fragment key={user.userNo}>
                {user.userNo === getUser().userNo ? (
                  <></>
                ) : (
                  <tr key={user.userNo}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{user.dept.deptName}</td>
                    <td>{user.name}</td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div>
        <h5>사원 목록</h5>
        <table>
          <thead>
            <tr>
              <th>부서</th>
              <th>이름</th>
              <th>권한</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => {
              return (
                <tr key={user.userNo}>
                  <td>{user.dept.deptName}</td>
                  <td>{user.name}</td>
                  <td>
                    <select name="auth">
                      <option value="">선택</option>
                      <option value="READ">읽기</option>
                      <option value="WRITE">쓰기</option>
                    </select>
                  </td>
                  <td>
                    <button>삭제</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default ShareUser;
