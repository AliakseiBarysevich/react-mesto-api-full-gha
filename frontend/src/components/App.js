import { useEffect, useState, useCallback } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { authorize, register, checkToken } from "./../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen;
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const [isInfoTooltipOpen, setIsInfotooltipOpen] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");


  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.loadUserInfoFromServer(), api.getCards()])
        .then((data) => {
          const [userData, cardData] = data;
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfotooltipOpen(false);
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleCardClick(selectedCard) {
    setIsImagePopupOpen(true);
    setSelectedCard(selectedCard);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .updateUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
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
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Вось такая вось памылка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(placeData) {
    setIsLoading(true);
    api
      .addNewCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleInfoTooltipOpen() {
    setIsInfotooltipOpen(!isInfoTooltipOpen);
  }

  const handleRegister = (email, password) => {
    setIsLoading(true);
    register(email, password)
      .then((data) => {
        setIsSignupSuccessful(true);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        handleInfoTooltipOpen();
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsSignupSuccessful(false);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltipOpen();
      })
      .finally(() => {
        setIsLoading(false);
        console.log("finally");
      });
  };

  const handleAuthorize = (email, password) => {
    setIsLoading(true);
    authorize(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        console.log(data.token);
        handleCheckToken();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("finally");
      });
  };

  const handleCheckToken = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    checkToken(token)
      .then((data) => {
        console.log(data);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsLoading(false);
        console.log("finally");
      });
  }, [history]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  const signOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onSignOut={signOut}
      />

      <Switch>
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>

        <Route path="/sign-in">
          <Login onLogin={handleAuthorize} />
        </Route>

        <ProtectedRoute
          exact
          path="/"
          isLoggedIn={isLoggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
      </Switch>

      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccessful={isSignupSuccessful}
        infoTooltipText={infoTooltipText}
      />

      <Route>
        {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
      </Route>
    </CurrentUserContext.Provider>
  );
}

export default App;
