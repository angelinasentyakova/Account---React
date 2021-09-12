import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getAuthUserDataThunkCreator,
  logOutThunkCreator,
} from "../../Redux/authReducer";
import "./Header.css";

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo">Telecom</div>
      <div className="menu-links">
        <ul>
          <li>
            <NavLink to="/profile">Профиль</NavLink>
          </li>
          <li>
            <NavLink to="/transactions">Операции</NavLink>
          </li>
        </ul>
      </div>
      <div className="login-logout">
        {props.isAuth ? (
          <div className="logout">
            <span class="greetings-user"> Hello, {props.login} </span>
            <a className="logout-button" onClick={props.logout}>
              Logout
            </a>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, {
  logout: logOutThunkCreator,
  getAuthUserData: getAuthUserDataThunkCreator,
})(Header);
