import React, { useEffect, useState } from "react";
import { message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem("loginStatus");
  useEffect(() => {
    if (loginStatus === "login") {
      navigate("/");
    }
  }, [loginStatus, navigate]);
 const warning = (message) => {
    messageApi.open({
      type: 'warning',
      content: message,
    });
  };
  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };
  const error = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };
  const onLoginButtonClicked = (e) => {
    e.preventDefault();
    const localUsername = localStorage.getItem('Username');
    const localPassword = localStorage.getItem('Password');

    if (username !== "" && password !== "") {
      if (username === localUsername && password === localPassword) {
        localStorage.setItem('loginStatus', 'login');
        success("Login sccessfully");
        navigate("/");
      }
      else {
        error("User not found, please signup");
      }
    }
    else {
      warning("Username and Password if compulsory");
    }
  };
  return (
    <>
      {contextHolder}
      <div className="login-container">
        <div className="signup-container">
          <form className="signup-form-container">
            <div className="signup-form-header">
              <h1>Login</h1>
            </div>
            <div className="signup-input-container">
              <label>Username : </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="signup-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

            </div>
            <div className="signup-input-container">
              <label>Password : </label>
              <input
                type="text"
                placeholder="Enter Password "
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />

            </div>
            <div className="signup-input-container">
              <button className="signup-submit-button" onClick={onLoginButtonClicked}>Login</button>
            </div>
            <Link className="loginlabel" to={"/signup"}>signup</Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
