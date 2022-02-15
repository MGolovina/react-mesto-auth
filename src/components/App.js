import React from "react";
import { useEffect, useState } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import auth from "../utils/Auth";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoToolTip from "./InfoToolTip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [authorizationUserEmail, setAuthorizationUserEmail] = useState('');

  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    function closeByEsc(ev) {
      if (ev.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, []);

  useEffect(() => {
    function closeByOverlay(ev) {
      if (ev.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }
    document.addEventListener("click", closeByOverlay);
    return () => {
      document.removeEventListener("click", closeByOverlay);
    };
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setAuthorizationUserEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  function handleCardClick(elem) {
    setSelectedCard(elem);
  }

  function handleEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data.name, data.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setIsInfoToolTipPopupOpen(true);
        setIsLoggedIn(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoToolTipPopupOpen(true);
        setIsLoggedIn(false);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setAuthorizationUserEmail(email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(true);
        setIsInfoToolTipPopupOpen(true);
        setIsLoggedIn(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setAuthorizationUserEmail("");
    history.push("/sign-in");
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header email={authorizationUserEmail} onSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatar}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfile}
              onAddPlace={handleAddPlace}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-in">
              <Login
                history={history}
                loggedIn={setIsLoggedIn}
                onLogin={handleLoginSubmit}
              />
            </Route>
            <Route path="/sign-up">
              <Register history={history} onRegister={handleRegisterSubmit} />
            </Route>
          </Switch>
          {loggedIn && <Footer />}
          <EditAvatarPopup
            buttonText={"Изменить"}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            postAvatarInfo={handleUpdateAvatar}
          />

          <EditProfilePopup
            buttonText={"Сохранить"}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            addProfileInfo={handleUpdateUser}
          />

          <AddPlacePopup
            buttonText={"Создать"}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            addNewCard={handleAddPlaceSubmit}
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <InfoToolTip
            isSuccess={loggedIn}
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
