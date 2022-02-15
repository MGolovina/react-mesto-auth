import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, addProfileInfo, buttonText }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleUpdateName(event) {
    setName(event.target.value);
  }

  function handleUpdateDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addProfileInfo({ name: name, about: description });
  }

  return (
    <PopupWithForm
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="popupProfileForm"
    >
      <input
        onChange={handleUpdateName}
        value={name || ""}
        id="profile-name"
        name="name"
        minLength="2"
        maxLength="40"
        required
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_type_name"
      />
      <span id="profile-name-error" className="popup__input-error"></span>
      <input
        onChange={handleUpdateDescription}
        value={description || ""}
        id="profile-caption"
        name="about"
        minLength="2"
        maxLength="200"
        required
        type="text"
        placeholder="Описание"
        className="popup__input popup__input_type_about"
      />
      <span id="profile-caption-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
