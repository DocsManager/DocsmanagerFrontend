import React, { useState, useEffect, useReducer } from "react";
import { allUser, findUser } from "../../api/userApi";
import { getUser } from "../../component/getUser/getUser";

function removeItem(userGetList, user, setUserGetList) {
  var checkElem = document.getElementById(user.userNo);
  setUserGetList(userGetList.filter((list) => list.userNo !== user.userNo));
  if (checkElem) {
    checkElem.checked = false;
  }
}

function insertItem(userGetList, setUserGetList, user, userList, setUserList) {
  var checkElem = document.getElementById(user.userNo);
  if (checkElem.checked) {
    setUserGetList([...userGetList, user]);
    // setUserList(userList.filter((list) => list.userNo !== user.userNo));
  } else {
    setUserGetList(userGetList.filter((list) => list.userNo !== user.userNo));
  }
}

function ShareUser() {
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userGetList, setUserGetList] = useState([]);

  return (
    <React.Fragment>
      <h5>사원 검색</h5>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <button onClick={() => findUser(userName, setUserList)}>검색</button>

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
                      <input
                        type="checkbox"
                        id={user.userNo}
                        onChange={() => {
                          insertItem(
                            userGetList,
                            setUserGetList,
                            user,
                            userList,
                            setUserList
                          );
                        }}
                      />
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
            {userGetList.map((user) => {
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
                    <button
                      onClick={() =>
                        removeItem(userGetList, user, setUserGetList)
                      }
                    >
                      삭제
                    </button>
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
