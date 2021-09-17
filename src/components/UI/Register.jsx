// noinspection HtmlUnknownTarget

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as MestoAuth from "../../utils/MestoAuth.js";

const Register = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    let { email, password } = data;
    MestoAuth.register(email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          props.onClick(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        props.onClick(false);
        console.log(err);
      });
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
        <h2 className="sign-container__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
        <p className="sign-container__paragraph">
          Уже зарегистрированы ?{" "}
          <Link className="sign-container__paragraph" to="signin">
            {props.subText}
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
