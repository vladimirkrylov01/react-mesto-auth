import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [data, setData] = useState({ email: "" });

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(data);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="sign-container">
        <h2 className="sign-container__title">Вход</h2>
        <label className="sign-container__field">
          <input
            id="email-input"
            className="sign-container__input"
            type="url"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <span className="email-input-error" />
        </label>
        <label className="sign-container__field">
          <input
            id="password-input"
            className="sign-container__input"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Пароль"
            required
          />
          <span className="password-input-error" />
        </label>
        <button className="sign-container__button" onClick={handleSubmit}>
          Войти
        </button>
        <p className="sign-container__paragraph">
          Ещё не зарегистрированы ?{" "}
          <Link className="sign-container__paragraph" to="sign-up">
            {props.subText}
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
