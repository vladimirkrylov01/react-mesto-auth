import React, {useContext} from 'react';
import Profile from "./Profile";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext)
  return (
     <main className='content'>
        <Profile {...props}
                 title={currentUser.name}
                 profession={currentUser.about}
                 avatar={currentUser.avatar}
        />
        <section className="cards-grid">
          {props.cards.map(card => (
            <Card
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
            />
          ))}
        </section>
      </main>
  )
}

export default Main;