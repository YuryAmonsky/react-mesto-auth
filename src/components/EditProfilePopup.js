import { useContext, useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormValidator from "../hooks/useFormValidator";

function EditProfilePopup({ isOpen, onUpdateUser, onFormValidate, ...commonProps }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { validity, cbResetValidator, cbFormValidate } = useFormValidator('edit-profile', onFormValidate);
  const handleNameChange = (evt) => {
    setName(evt.target.value);
    cbFormValidate(evt);
  }

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
    cbFormValidate(evt);
  }

  const handleNameBlur = (evt) => {
    cbFormValidate(evt);
  }

  const handleDescriptionBlur = (evt) => {
    cbFormValidate(evt);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  /**Инициализация инпутов при закрытии попапа значениями из currentUser */
  useEffect(() => {
    if (!isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    } else {
      cbResetValidator(isOpen, true);
    }
  }, [isOpen, currentUser, cbResetValidator]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      {...commonProps}
    >
      <input
        className={validity.name?.shouldShowError ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="name"
        id="input-edit-profile-name"
        type="text" placeholder="Имя"
        value={name}
        minLength="2"
        maxLength="40"
        required
        autoComplete="off"
        onInput={handleNameChange}
        onBlur={handleNameBlur}
      />
      <span className="dialog-form__input-error input-edit-profile-name-error">
        {validity.name?.shouldShowError ? validity.name?.error : ""}
      </span>
      <input
        className={validity.aboutMe?.shouldShowError ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="aboutMe"
        id="input-edit-profile-about-me"
        type="text" placeholder="О себе"
        value={description}
        minLength="2"
        maxLength="200"
        required
        autoComplete="off"
        onInput={handleDescriptionChange}
        onBlur={handleDescriptionBlur}
      />
      <span className="dialog-form__input-error input-edit-profile-about-me-error">
        {validity.aboutMe?.shouldShowError ? validity.aboutMe?.error : ""}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;