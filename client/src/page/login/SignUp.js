import React from "react";
import { signUp } from "../../api/userApi";

function SignUp() {
  return (
    <>
      <div>signup</div>
      <div>
        <input id="newId" placeholder="id" />
      </div>
      <div>
        <input id="newpwd" placeholder="password" />
      </div>
      <div>
        <input id="pwdConfirm" placeholder="password" />
      </div>
      <div>
        <input id="newName" placeholder="name" />
      </div>
      <div>
        <input id="department" placeholder="부서" />
      </div>
      <div>
        <input id="newEmail" placeholder="이메일" /> @<input />
      </div>
      <button
        onClick={() => {
          const newUser = {
            id: document.getElementById("newId").value,
            password: document.getElementById("newpwd").value,
            name: document.getElementById("newName").value,
            email: document.getElementById("newEmail").value,
            dept: { deptNo: document.getElementById("department").value },
          };
          signUp(newUser);
        }}
      >
        완료
      </button>
    </>
  );
}
export default SignUp;
