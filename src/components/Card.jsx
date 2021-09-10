import React, {useContext} from 'react'
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({...props}) => {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = props.card.owner._id === currentUser._id
  const cardDeleteButtonClassName = (
    `card__delete-button ${
      isOwn ? 
        'card__delete-button_visible' : 
        'card__delete-button_hidden'
    }`
  )

  const isLiked = props.card.likes.some(i => i._id === currentUser._id)
  const cardLikeClassName = (
    `card__like ${
      isLiked ?
        'card__like_active' :
        'card__like'
    }`
  )

  function handleLikeClick(){
    props.onCardLike(props.card)
  }

  function handleCardClick () {
    props.onCardClick(props.card)
  }

  function handleCardDelete(){
    props.onCardDelete(props.card)
  }

  return (
    <article className="card" >
      {/*----- кнопка удаления -----*/}
      <button className={cardDeleteButtonClassName}
              onClick={handleCardDelete}
              type="button"
              aria-label="Удалить"/>
      <div className="card__image"
           onClick={handleCardClick}
           style={{backgroundImage: `url(${props.card.link})`}}
      />
      <div className="card__content">
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes-container">
          {/* ----- кнопка лайка ----- */}
          <button className={cardLikeClassName}
                  onClick={handleLikeClick}
                  type="button"
                  aria-label="Оценить"
          />
          <span className="card__likes-count">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;