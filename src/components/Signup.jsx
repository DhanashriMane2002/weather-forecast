import React, { useEffect, useState } from "react";
import { message } from 'antd';
import { Link, useNavigate } from "react-router-dom";


function Signup() {
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
  const onSubmitButtonClicked = (e) => {
    e.preventDefault();
    const localUsername = localStorage.getItem('Username');
    const localPassword = localStorage.getItem('Password');

    if (username !== "" && password !== "") {
      if (username === localUsername && password === localPassword) {
        error("User already exists")
      }
      else {
        localStorage.setItem('Username', username);
        localStorage.setItem('Password', password);
        setUsername("");
        setPassword("");
        success("Signup sccessfully");
        navigate("/login");
      }
    }
    else {
      warning("Username and Password if compulsory")
    }
  };
  return (
    <>      {contextHolder}
      <div className="signup-container">
        <form className="signup-form-container">
          <div className="signup-form-header">
            <h1>Registration form</h1>
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
            <button className="signup-submit-button" onClick={onSubmitButtonClicked}>Submit</button>
          </div>
          <Link className="loginlabel" to={"/login"}>login</Link>        </form>
      </div>
    </>
 );
}
export default Signup; 




