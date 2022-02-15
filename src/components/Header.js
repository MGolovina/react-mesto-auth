import logo from "../images/logo.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Switch>
        <Route path="/sign-in">
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{email}</p>
            <button className="header__action-button" onClick={onSignOut}>
              Выйти
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}
export default Header;
