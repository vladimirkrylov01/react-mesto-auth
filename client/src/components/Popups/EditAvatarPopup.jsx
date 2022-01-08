import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  //обнуляем input после закрытия popup
  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.active]);

  return (
    <PopupWithForm
      name="editAvatar"
      title="Редактировать аватар"
      buttonText={"Сохранить"}
      active={props.active}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field" htmlFor="avatar-input">
        <input
          required
          tabIndex="1"
          id="avatar-input"
          className="form__input form__input_type_avatar form__input_type_error"
          minLength="2"
          maxLength="200"
          type="url"
          ref={avatarRef}
          name="avatar"
          placeholder="Ссылка на аватар"
        />
        <span className="avatar-input-error form__input-error form__input-error_active" />
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
