import { useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import useFormValidator from "../hooks/useFormValidator";

function AddPlacePopup({ isOpen, onAddPlace, onFormValidate, ...commonProps }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const { validity, cbResetValidator, cbFormValidate } = useFormValidator('edit-profile', onFormValidate);
  const handleNameChange = (evt) => {
    setName(evt.target.value);
    cbFormValidate(evt)
  }

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
    cbFormValidate(evt);
  }

  const handleNameBlur = (evt) => {
    cbFormValidate(evt)
  }

  const handleLinkBlur = (evt) => {
    cbFormValidate(evt)
  }

  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  /**Инициализация инпутов при закрытии попапа*/
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    } else {
      cbResetValidator(isOpen, false);
    }
  }, [isOpen, cbResetValidator]);

  return (
    <PopupWithForm
      title="Новое место"
      name="new-location"
      isOpen={isOpen}
      onSubmit={handleAddPlaceSubmit}
      {...commonProps}
    >
      <input
        className={validity.name?.shouldShowError ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="name"
        id="input-new-location-name"
        type="text"
        placeholder="Название"
        value={name}
        minLength="2"
        maxLength="30"
        required
        autoComplete="off"
        onInput={handleNameChange}
        onBlur={handleNameBlur}
      />
      <span
        className="dialog-form__input-error"
      >
        {validity.name?.shouldShowError ? validity.name?.error : ""}
      </span>
      <input
        className={validity.link?.shouldShowError ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="link"
        id="input-new-location-link"
        type="url"
        placeholder="Ссылка на картинку"
        value={link}
        required
        autoComplete="off"
        onInput={handleLinkChange}
        onBlur={handleLinkBlur}
      />
      <span
        className="dialog-form__input-error"
      >
        {validity.link?.shouldShowError ? validity.link?.error : ""}
      </span>
    </PopupWithForm>
  );

}

export default AddPlacePopup;