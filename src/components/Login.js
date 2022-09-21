import React from "react";
function Login({ title, name, onSubmit, buttonState, }) {

  return (
      <div class="form-container">
        
        <form
          className="dialog-form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="dialog-form__title">
            {title}
          </h2>
          <input
            className="dialog-form__input"
            name="name"
            id="login"
            type="text" placeholder="Имя пользователя"
            value=""
            minLength="2"
            maxLength="40"
            required
            autoComplete="off"
          />
          <span className="dialog-form__input-error">

          </span>
          <input
            className="dialog-form__input"
            name="aboutMe"
            id="password"
            type="text" placeholder="Пароль"
            value=""
            minLength="2"
            maxLength="200"
            required
            autoComplete="off"
          />
          <span className="dialog-form__input-error input-edit-profile-about-me-error">

          </span>
          <button
            className={buttonState.disabled ? "dialog-form__submit-button dialog-form__submit-button_disabled" : "dialog-form__submit-button"}
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