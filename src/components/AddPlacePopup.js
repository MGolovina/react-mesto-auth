import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, addNewCard, buttonText }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    addNewCard({ name, link });
  }

  function handleUpdatePlace(event) {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "link") {
      setLink(event.target.value);
    }
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="place"
      buttonText={buttonText}
    >
      <input
        value={name}
        onChange={handleUpdatePlace}
        id="placeName-input"
        name="name"
        minLength="2"
        maxLength="40"
        required
        type="text"
        placeholder="Название"
        className="popup__input popup__input_place_name"
      />
      <span className="popup__input-error" id="placeName-input-error"></span>
      <input
        value={link}
        onChange={handleUpdatePlace}
        id="placeUrl-input"
        name="link"
        type="url"
        required
        className="popup__input popup__input_place_url"
        placeholder="Ссылка на картинку"
      />
      <span id="placeUrl-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
