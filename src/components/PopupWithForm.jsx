import React from "react";
import Button from "./Button";

const PopupWithForm = (props) => {
  return (
    <section
      className={
        props.active
          ? `popup popup_type_${props.name}`
          : `popup popup_type_${props.name} popup_opened`
      }
      onClick={props.onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`form ${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <fieldset className="form__set">{props.children}</fieldset>
          <Button name={props.name} buttonText={props.buttonText}/>
        </form>
      </div>
    </section>
  );
};

export default PopupWithForm;
