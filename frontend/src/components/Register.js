import React from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";

function Register({ onRegister, ...props }) {
  const { values, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = values;
    onRegister(email, password);
  };

  return (
    <div className="register">
      <h3 className="register__heading">Регистрация</h3>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__input-container">
          <input
            className="register__input"
            id="place-name-input"
            type="email"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="register__input-container">
          <input
            className="register__input"
            id="place-link-input"
            type="password"
            placeholder="Пароль"
            name="password"
            value={values.password || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button className="register__submit-button">Зарегистрироваться</button>
      </form>
      <p className="register__paragraph">
        Уже зарегистрированы?{" "}
        <Link className="register__paragraph-link" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
