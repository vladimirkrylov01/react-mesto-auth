import React from "react";
import successIcon from "../../images/toolkit/success.svg";
import errorIcon from "../../images/toolkit/wrong.svg";

const InfoToolkit = (props) => {
  return (
    <section
      className={
        props.active
          ? `popup popup_type_${props.name}`
          : `popup popup_type_${props.name} popup_opened`
      }
      onClick={props.onClose}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />

        <img
          className="popup__image-auth"
          src={props.isRegistered ? successIcon : errorIcon}
          alt={props.isRegistered ? "Успех" : "Что-то не так"}
        />

        <p className="popup__warning">
          {props.isRegistered
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </section>
  );
};

export default InfoToolkit;
