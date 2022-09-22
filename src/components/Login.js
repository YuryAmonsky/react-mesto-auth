import React from "react";
function Login({ title, name, onSubmit, buttonState, }) {

  return (
      <div className="form-container">
        
        <form
          className="dialog-form dialog-form_type_section"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="dialog-form__title dialog-form__title_type_section">
            {title}
          </h2>
          <input
            className="dialog-form__input dialog-form__input_type_section"
            name="name"
            id="login"
            type="text" 
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            autoComplete="off"
          />
          <span className="dialog-form__input-error">

          </span>
          <input
            className="dialog-form__input dialog-form__input_type_section"
            name="aboutMe"
            id="password"
            type="text" 
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            required
            autoComplete="off"
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
            Войти
          </button>
        </form>
      </div>
  );
}

export default Login;