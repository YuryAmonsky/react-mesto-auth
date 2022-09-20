import { useState, useEffect, useCallback } from 'react';
import PopupWithForm from './PopupWithForm';

function Login({ title, name, onSubmit, buttonState, children }){

  retrun (
        <form
          className={`dialog-form dialog-form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="dialog-form__title">
            {title}
          </h2>
          {children}
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

  );
}

export default Login;