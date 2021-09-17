import React, { useCallback, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "../pages/index.css";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import ImagePopup from "./ImagePopup.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import * as MestoAuth from "../utils/MestoAuth.js";
import { api } from "../utils/Api.js";

import InfoToolkit from "./UI/InfoToolkit.jsx";
import Register from "./UI/Register.jsx";
import Login from "./UI/Login.jsx";
import Loader from "./UI/Loader.jsx";

export default function App() {
  const history = useHistory();
  // Popup hide/show
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); // пустой массив для карточек
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [success, setSuccess] = useState(false);

  // ------------------------------ SIGN CHECK ------------------------------
  const signCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MestoAuth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push("/main");
          }
        })
        .catch(() => history.push("/signin"));
    }
  }, [history]);

  useEffect(() => {
    signCheck();
  }, [signCheck]);
  // ------------------------------ SIGN CHECK------------------------------

  // const signUserCheck = useCallback(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     MestoAuth.checkToken(jwt)
  //       .then((res) => {
  //         if (res) {
  //           setLoggedIn(true);
  //           setUserEmail(res.data.email);
  //           history.push("/main");
  //         }
  //       })
  //       .catch(() => history.push("/sign-in"));
  //   }
  // }, [history]);

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     MestoAuth.checkToken(jwt)
  //       .then((res) => {
  //         if (res) {
  //           setLoggedIn(true);
  //           setUserEmail(res.data.email);
  //           history.push("/main");
  //         }
  //       })
  //       .catch(() => history.push("/sign-in"));
  //   }
  // }, [history]);

  // function signUserCheck() {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     MestoAuth.checkToken(jwt)
  //       .then((res) => {
  //         if (res) {
  //           setLoggedIn(true);
  //           setUserEmail(res.data.email);
  //           history.push("/main");
  //         }
  //       })
  //       .catch(() => history.push("/sign-in"));
  //   }
  // }
  //
  // useEffect(() => {
  //   signUserCheck();
  // }, [signUserCheck]);

  // ------------------------------ DEPS [loggedIn] ------------------------------

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [loggedIn]);
  // ------------------------------ DEPS [loggedIn] ------------------------------

  // ------------------------------ LOGIN FORM ------------------------------
  // через 1.5с после УСПЕШНОГО Логина кидаем пользователя на MAIN
  function handleLogin({ email, password }) {
    return MestoAuth.login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setUserEmail(email);
        setLoggedIn(true);
        history.push("/main");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // ------------------------------ LOGIN FORM ------------------------------

  // ------------------------------ REGISTER FORM ------------------------------
  // через 1.5с после УСПЕШНОЙ регистрации кидаем пользователя на ЛОГИН
  function handleRegister({ email, password }) {
    return MestoAuth.register(email, password)
      .then((res) => {
        setUserEmail(res.email);
        setSuccess(true);
        setInfoTooltipPopupOpen(true);
        history.push("/signin");
        return res;
      })
      .catch((err) => {
        setInfoTooltipPopupOpen(true);
        // setSuccess(false);
        console.log(err);
        setTimeout(() => {
          setInfoTooltipPopupOpen(false);
        }, 1500);
      });
    // .finally(() => {
    //   history.push("/main");
    // });
  }

  // ------------------------------ REGISTER FORM ------------------------------

  // Выход из аккаунта
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    history.push("/signin");
  }

  // ------------------------------ POPUP HANDLERs ------------------------------
  // закрываем все попапы
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPreviewPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  // при клике на фото - открываем popup preview
  function handleCardClick(card) {
    setIsPreviewPopupOpen(true);
    setSelectedCard(card);
  }

  // открываем edit avatar
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // открываем edit profile
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // открываем add place
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Обновляем данные Profile и закрываем Popup
  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((values) => {
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch(console.error);
  }

  // Обновляем данные Avatar и закрываем Popup
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((values) => {
        setCurrentUser(values);
        closeAllPopups();
      })
      .catch(console.error);
  }

  // Обновляем данные Add Place и закрываем Popup
  function handleAddCard(data) {
    api
      .addNewCard(data)
      .then((values) => {
        setCards([values, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  // обработчик кнопки LIKE
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // запросы на обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  //обработчик кнопки DELETE
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }

  if (loading) return <Loader />;

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Route path="/main">
            <Header
              email={userEmail}
              onClick={handleSignOut}
              text="Выйти"
              url="/"
              isLogged={loggedIn}
              onSignOut={handleSignOut}
            />
          </Route>
          <Switch>
            {/* ----------- Логин ----------- */}
            <Route path="/signin">
              <Header url="/signup" text="Регистрация" />
              <Login onLogin={handleLogin} subText="Регистрация" />
            </Route>

            {/* ----------- Регистрация ----------- */}
            <Route path="/signup">
              <Header url="/signin" text="Войти" />
              <Register onClick={handleRegister} subText="Войти" />
            </Route>

            {/* ----------- Для зарегистрированных пользователей ----------- */}
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Route>
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <Footer />

          <EditProfilePopup
            active={!isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            active={!isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddCard}
          />
          <EditAvatarPopup
            active={!isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            active={!isPreviewPopupOpen}
          />
          <InfoToolkit
            onclose={closeAllPopups}
            active={!isInfoTooltipPopupOpen}
            name="toolkit"
            success={success}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}
