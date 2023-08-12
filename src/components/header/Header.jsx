import "./header.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const loginStatus = localStorage.getItem("loginStatus");
  const navigate = useNavigate();
  function onMenuClick() {
    setShowMenu(!showMenu);
  }
  function getHidden() {
    return showMenu ? "" : "hidden";
  }
  function onLogoutButtonClicked() {
    localStorage.setItem('loginStatus', "logout");
    navigate("/login");
  }
  return (
    <div className="headers-container">
      <Link className="logo" to={"/"}>
        Wheather
      </Link>
      <div className="header-img-wrapper">
        <img
          src="images/menu.png"
          alt=""
          className="header-menu-img"
          onClick={onMenuClick}
        />
      </div>
      <div className="header-label-container-wrapper">
        <Link className="headers-container-label" to={"contact"}>
          contact
        </Link>
        {
          loginStatus === "login" ? <label className="headers-container-label" onClick={onLogoutButtonClicked}>
            logout
          </label> : <></>
        }
      </div>
      <div className={`menu-items ${getHidden()}`}>
        <Link className="headers-container-label" to={"contact"}>
          contact
        </Link>
        {
          loginStatus === "login" ? <label className="headers-container-label" onClick={onLogoutButtonClicked}>
            logout
          </label> : <></>
        }
      </div>
    </div>
  );
}

export default Header;
