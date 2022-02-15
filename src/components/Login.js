import React from "react";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";

function Login({ onLogin }) {
  const [authorizationUserEmail, setAuthorizationUserEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(ev) {
    setAuthorizationUserEmail(ev.target.value);
  }

  function handlePasswordChange(ev) {
    setPassword(ev.target.value);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    onLogin(authorizationUserEmail, password);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login__input"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          autoFocus
          autoComplete="off"
          name="name"
          value={authorizationUserEmail || ""}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          className="login__input"
          placeholder="Password"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
          name="password"
          value={password || ""}
          onChange={handlePasswordChange}
        />
        <button className="login__button login__button-enter" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default withRouter(Login);
