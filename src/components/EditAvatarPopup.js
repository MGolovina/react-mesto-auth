import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, postAvatarInfo, buttonText }) {
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState("");

  function updateAvatar(event) {
    setAvatar(event.target.value);
  }

  useEffect(() => {
    setAvatar("");
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    postAvatarInfo(avatar);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar"
      buttonText={buttonText}
    >
      <input
        value={avatar}
        onChange={updateAvatar}
        id="avatar-link"
        name="avatar"
        type="url"
        required
        placeholder="Ссылка на картинку"
        className="popup__input"
      />
      <span id="avatar-link-error" 
      className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
