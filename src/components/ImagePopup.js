function ImagePopup ({ card, onClose }) {
  const { name, link } = card || []
  return (
    <div className={`popup popup_${name} ${card ? 'popup_opened' : ''}`}>
      <div className="popup__figure-container popup__overlay">
        <figure className="popup__figure">
          <img
            src={link}
            alt={name}
            className="popup__image" />            
          <div className="popup__figure-caption">{name}</div>
        </figure>
        <button
          type="button"
          className={`popup__close popup__close_${name}`}
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}  

export default ImagePopup
