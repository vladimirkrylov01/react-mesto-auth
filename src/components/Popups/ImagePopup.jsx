import React, { useRef } from "react";

const ImagePopup = (props) => {
  const imageFallbackContainer = useRef(null);

  return (
    <section
      className={
        props.active
          ? `popup popup-type-image`
          : `popup popup-type-image popup_opened`
      }
      onClick={props.onClose}
    >
      <div
        className="popup__preview"
        onClick={(e) => e.stopPropagation()}
        ref={imageFallbackContainer}
      >
        <button
          className="popup__button-close popup-type-image__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <figure className="popup__figure">
          {props.card.link && (
            <img
              className="popup__image"
              src={props.card.link}
              alt={props.card.name}
              onLoad={(e) => {
                imageFallbackContainer.current.style.width = `${e.target.offsetWidth}px`;
                imageFallbackContainer.current.style.height = `${e.target.offsetHeight}px`;
              }}
            />
          )}
          <figcaption className="popup__image-caption">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default ImagePopup;
