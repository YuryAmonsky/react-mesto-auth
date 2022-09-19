import React from 'react';
function PopupWithForm({ title, name, isOpen, onClose, onSubmit, onBGClick, buttonState, children }) {
  return (
    <div
      className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}
    >
      <div
        className="popup__container"
        onClick={onBGClick}
      >
        <button
          className="popup__close-icon"
          type="button"
          onClick={onClose}>

        </button>
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
      </div>
    </div>
  );
}

export default PopupWithForm;