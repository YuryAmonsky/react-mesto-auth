import React, { useEffect, useState } from 'react';
import useFormValidator from "../hooks/useFormValidator";

function Login({ title, name, onOpen, onSubmit, onFormValidate, buttonState }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { validity, cbResetValidator, cbFormValidate } = useFormValidator('login', onFormValidate);

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
          type="text"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
          onInput={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        <span className="dialog-form__input-error">

        </span>
        <input
          className={validity.password?.shouldShowError ? "dialog-form__input dialog-form__input_type_section dialog-form__input_invalid"
            : "dialog-form__input dialog-form__input_type_section"}
          name="password"
          id="password"
          type="password"
          placeholder="Пароль"
          minLength="8"
          maxLength="200"
          required
          autoComplete="off"
          onInput={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />
        <span className="dialog-form__input-error input-edit-profile-about-me-error">

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
      </form>
    </div>
  );
}

export default Login;