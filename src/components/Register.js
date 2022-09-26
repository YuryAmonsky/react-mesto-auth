import React, { useEffect, useState } from 'react';
import useFormValidator from "../hooks/useFormValidator";

function Register({ title, name, onOpen, onSubmit, onFormValidate, buttonState, children }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { validity, cbResetValidator, cbFormValidate } = useFormValidator('register', onFormValidate);

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
    cbFormValidate(evt);
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
    cbFormValidate(evt);
  }

  const handleEmailBlur = (evt) => {
    cbFormValidate(evt);
  }

  const handlePasswordBlur = (evt) => {
    cbFormValidate(evt);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(
      email,
      password
    );
  }

  useEffect(() => {
    cbResetValidator(true, false);
    onOpen();
  }, [cbResetValidator, onOpen]);

  return (
    <div className="form-container">

      <form
        className="dialog-form dialog-form_type_section"
        name={name}
        id="register"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="dialog-form__title dialog-form__title_type_section">
          {title}
        </h2>
        <input
          className={validity.email?.shouldShowError ? "dialog-form__input dialog-form__input_type_section dialog-form__input_invalid"
            : "dialog-form__input dialog-form__input_type_section"}
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          minLength="9"
          maxLength="50"
          required
          autoComplete="off"
          onInput={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        <span className="dialog-form__input-error">
          {validity.email?.shouldShowError ? validity.email?.error : ""}
        </span>
        <input
          className={validity.password?.shouldShowError ? "dialog-form__input dialog-form__input_type_section dialog-form__input_invalid"
            : "dialog-form__input dialog-form__input_type_section"}
          name="password"
          id="password"
          type="password"
          placeholder="Пароль"
          value={password}
          minLength="8"
          maxLength="200"
          required
          autoComplete="off"
          onInput={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />
        <span className="dialog-form__input-error">
          {validity.password?.shouldShowError ? validity.password?.error : ""}
        </span>
        <button
          className={buttonState.disabled ? "dialog-form__submit-button dialog-form__submit-button_type_section dialog-form__submit-button_disabled"
            : "dialog-form__submit-button dialog-form__submit-button_type_section"}
          type="submit"
          name="submitButton"
          formMethod="post"
          disabled={buttonState.disabled}
        >
          {buttonState.text}
        </button>
        <div className="dialog-form__redirect">
          <p>Уже зарегистрированы?</p>
          {children}
        </div>
      </form>
    </div>
  );
}

export default Register;