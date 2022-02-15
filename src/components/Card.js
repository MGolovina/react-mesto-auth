import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, handleCardClick, handleCardLike, handleCardDelete}) {

const currentUser = useContext(CurrentUserContext);

const isOwn = card.owner._id === currentUser._id;
const cardDeleteButtonClassName = isOwn ? 'elements__card-button_trash elements__card-button_trash_visible'
:
'elements__card-button_trash elements__card-button_trash_hidden';

const isLiked = card.likes.some(i => i._id === currentUser._id)
const cardLikeButtonClassName = `elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`;

  return (
    <li className="elements__card">
      <img
        onClick={() =>{handleCardClick(card)}}
        src={card.link}
        className="elements__image"
        alt={card.name} />
      <button
        type="submit"
        className={cardDeleteButtonClassName}
        onClick={() => {handleCardDelete(card)}}
      ></button>
      <div className="elements__title-wrap">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-group">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={()=>{handleCardLike(card)}}
          ></button>
          <span className="elements__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card