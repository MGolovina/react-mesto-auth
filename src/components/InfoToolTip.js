import React from "react";

import successSignUpImage from "../images/success-sign-up.svg";
import notSuccessSignUpImage from "../images/not-success-sign-up.svg";

function InfoTooltip({isOpen, isSuccess, onClose}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__overlay">
        {isSuccess ? (
          <>
            <img
              className="popup__icon"
              src={successSignUpImage}
              alt="Вы успешно зарегистрировались!"
            />
            <p className="popup__title_login">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img
              className="popup__icon"
              src={notSuccessSignUpImage}
              alt="Регистрация не выполнена"
            />
            <p className="popup__title_login">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </>
        )}
        <button
          className={`popup__close popup__close_edit"`}
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
