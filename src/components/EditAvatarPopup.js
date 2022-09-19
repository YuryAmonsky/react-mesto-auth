import { useRef, useEffect } from "react";
import PopupWithForm from './PopupWithForm';
import useFormValidator from "../hooks/useFormValidator";

function EditAvatarPopup({ isOpen, onUpdateAvatar, onFormValidate, ...commonProps }) {
  const avatarLink = useRef();
  const { validity, cbResetValidator, cbFormValidate } = useFormValidator('edit-profile', onFormValidate);

  const handleLinkChange = (evt) => {
    cbFormValidate(evt);
  }

  const handleLinkBlur = (evt) => {
    cbFormValidate(evt);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  }

  /**Инициализация инпутов при закрытии попапа значениями из currentUser */
  useEffect(() => {
    if (!isOpen) {
      avatarLink.current.value = '';
    } else {
      cbResetValidator(isOpen, false);
    }
  }, [isOpen, cbResetValidator]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      {...commonProps}
    >
      <input
        ref={avatarLink}
        className={validity.avatar?.shouldShowError ? "dialog-form__input dialog-form__input_invalid" : "dialog-form__input"}
        name="avatar"
        id="input-edit-avatar"
        type="url"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
        onInput={handleLinkChange}
        onBlur={handleLinkBlur}
      />
      <span
        className="dialog-form__input-error input-edit-avatar-error"
      >
        {validity.avatar?.shouldShowError ? validity.avatar?.error : ""}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;