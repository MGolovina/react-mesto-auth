import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function Register({onRegister}) {
  const [authorizationUserEmail, setAuthorizationUserEmail] = useState("");
  const [password, setPassword] = useState("");

 useEffect(() => {
   setAuthorizationUserEmail("");
   setPassword("");
 }, []);

 function handleEmailChange(ev) {
   setAuthorizationUserEmail(ev.target.value);
 }

 function handlePasswordChange(ev) {
   setPassword(ev.target.value);
 }

 function handleSubmit(ev) {
   ev.preventDefault();
   onRegister(authorizationUserEmail, password);
 }

  return (
    <div>
      <div className="login">
        <form
          className="login__form"
          onSubmit={handleSubmit}
        >
          <h2 className="login__title">Регистрация</h2>
          <input
            required
            type="email"
            name="email"
            value={authorizationUserEmail || ""}
            onChange={handleEmailChange}
            placeholder="Email"
            id="email-input"
            className="login__input"
            minLength="2"
            maxLength="40"
          />
          <input
            required
            type="password"
            name="password"
            value={password || ""}
            onChange={handlePasswordChange}
            placeholder="Password"
            id="email-input"
            className="login__input"
            minLength="2"
            maxLength="200"
          />
          <button type="submit" className="login__button button">
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="login__link link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Register);