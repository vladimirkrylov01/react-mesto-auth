import React from "react";

const Button = ({ ...props }) => {
  return (
    <button
      className={`form__submit popup__button-submit popup__button-${props.name}`}
      type="submit"
    >
      {props.buttonText}
    </button>
  );
};

export default Button;