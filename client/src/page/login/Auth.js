import React from "react";
import { useNavigate } from "react-router-dom";
const Auth = ({ authenticate }) => {
  const navigate = useNavigate();
  const onClick = () => {
    authenticate();
    navigate("/");
  };
  return (
    <div>
      <h2>11</h2>
      <button onClick={onClick}> authenticate</button>
    </div>
  );
};
export default Auth;
