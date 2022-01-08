import React from "react";
import Profile from "./Main/Profile";
import Card from "./Main/Card";

function Main(props) {
  // noinspection JSCheckFunctionSignatures
  return (
    <>
      <main className="main page__main">
        <Profile {...props} />
        <section className="cards-grid">
          {props.cards.map((card) => (
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
    </>
  );
}

export default Main;
