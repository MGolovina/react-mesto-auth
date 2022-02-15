import React from "react";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar profile__new-avatar"
          />
          <button
            type="button"
            onClick={onEditAvatar}
            className="profile__avatar-edit-button"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <h2 className="profile__about">{currentUser.about}</h2>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {cards.map((elem) => {
            return (
              <Card
                card={elem}
                key={elem._id}
                handleCardClick={onCardClick}
                handleCardLike={onCardLike}
                handleCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
