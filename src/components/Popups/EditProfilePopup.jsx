import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // noinspection JSCheckFunctionSignatures
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.active]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"editProfile"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      active={props.active}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field" htmlFor="name-input">
        <input
          required
          autoFocus
          tabIndex="1"
          id="name-input"
          className="form__input form__input_type_name form__input_type_error"
          minLength="2"
          maxLength="40"
          type="text"
          name="name"
          placeholder="Имя"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="name-input-error form__input-error form__input-error_active" />
      </label>
      <label className="form__field" htmlFor="prof-input">
        <input
          required
          tabIndex="2"
          id="prof-input"
          className="form__input form__input_type_prof form__input_type_error"
          minLength="2"
          maxLength="200"
          type="text"
          value={description || ""}
          onChange={handleChangeDescription}
          name="profession"
          placeholder="Профессия"
        />
        <span className="prof-input-error form__input-error form__input-error_active" />
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
