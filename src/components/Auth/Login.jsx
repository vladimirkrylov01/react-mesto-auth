import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });

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
    <div className="sign-container">
      <h2 className="sign-container__title">Вход</h2>
      <form
        className={`form form__${props.name}`}
        name={props.name}
        onSubmit={handleSubmit}
      >
        <label className="sign-container__field">
          <input
            id="email-input"
            className="sign-container__input"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <span className="email-input-error" />
        </label>
        <label className="sign-container__field">
          <input
            id="password-input"
            className="sign-container__input"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Пароль"
          />
          <span className="password-input-error" />
        </label>
        <button className="sign-container__button" type="submit">
          Войти
        </button>
      </form>
      <p className="sign-container__paragraph">
        Ещё не зарегистрированы ?{" "}
        <Link className="sign-container__paragraph" to="sign-up">
          {props.subText}
        </Link>
      </p>
    </div>
  );
};

export default Login;
