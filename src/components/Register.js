import React from 'react';

function Register({ title, name, onSubmit, buttonState, children }){

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
          name="userName"
          id="userName"
          type="text" 
          placeholder="Имя пользователя"
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
          name="password"
          id="password"
          type="text" 
          placeholder="Пароль"
          value=""
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
        />
        <span className="dialog-form__input-error">

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

export default Register;

// <form
//           className={`dialog-form dialog-form_type_${name}`}
//           name={name}
//           onSubmit={onSubmit}
//           noValidate
//         >
//           <h2 className="dialog-form__title">
//             {title}
//           </h2>
//           {children}
//           <button
//             className={buttonState.disabled ? "dialog-form__submit-button dialog-form__submit-button_disabled" : "dialog-form__submit-button"}
//             type="submit"
//             name="submitButton"
//             formMethod="post"
//             disabled={buttonState.disabled}
//           >
//             {buttonState.text}
//           </button>
//         </form>    