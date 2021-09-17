import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: place,
      link: link,
    });
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  //обнуляем input после закрытия popup
  useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.active]);

  return (
    <PopupWithForm
      name="addPlace"
      title="Новое место"
      buttonText={"Создать"}
      active={props.active}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field" htmlFor="place-input">
        <input
          id="place-input"
          name="name"
          required
          autoFocus
          className="form__input form__input_type_place"
          type="text"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          value={place}
          onChange={handleChangePlace}
        />
        <span className="place-input-error form__input-error form__input-error_active" />
      </label>
      <label className="form__field" htmlFor="link-input">
        <input
          id="link-input"
          required
          className="form__input form__input_type_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleChangeLink}
        />
        <span className="link-input-error form__input-error form__input-error_active" />
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
