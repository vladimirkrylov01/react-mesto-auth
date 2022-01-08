import profilePen from "../../images/profile/edit.svg";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = (props) => {
  // noinspection JSCheckFunctionSignatures
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__content">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={`Название - ${currentUser.name}`}
          />
          <div className="profile__overlay" onClick={props.onEditAvatar}>
            <img className="profile__pen" src={profilePen} alt="Карандаш" />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button
            className="profile__button-edit"
            type="button"
            onClick={props.onEditProfile}
          />
        </div>
      </div>
      <button
        className="profile__button-add"
        type="button"
        onClick={props.onAddPlace}
      />
    </section>
  );
};

export default Profile;
