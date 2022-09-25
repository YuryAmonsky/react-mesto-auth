import { useState, useEffect, useCallback } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { api } from '../utils/Api';
import { register, authorize, validateToken } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Footer from './Footer';


function App() {
  //const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [currentUserAccount, setCurrentUserAccount] =
    useState({
      'loggedIn': false,
      'email': ''
    });
  const [currentUser, setCurrentUser] =
    useState({
      'name': '',
      'about': '',
      'avatar': '',
      '_id': '',
      'cohort': '',
    });

  const [cards, setCards] = useState([]);
  const [regInfo, setRegInfo] = useState({ isOpen: false, success: false, message: '' });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [deletePlaceConfirm, setDeletePlaceConfirm] = useState({
    isOpen: false, card: {}
  });
  const [selectedCard, setSelectedCard] = useState(null);

  /**стейт кнопок сабмита форм
   *  Активность кнопки изменяется при выполнении запросов к серверу и валидации форм.
   * Текст неактивной кнопки разный при выполнении запроса и валидации, 
   * поэтому добавляю в стейт текст отдельным полем.
 */
  const [submitButtonState, setSubmitButtonState] = useState({ text: '', disabled: false });

  const handleRegister = (email, password) => {
    setSubmitButtonState({ text: 'Регистрация', disabled: true });
    register(email, password)
      .then((res) => {
        //setCurrentUserAccount(old=>({...old, email: res.email}));
        console.log(`Электронная почта ${res.data.email} зарегистрирована`);
        setRegInfo({ isOpen: true, success: true, message: "Вы успешно\n зарегистрировались" });
        //history.push('/sign-in');
      })
      .catch((err) => {
        console.log(`${err.status}\nНе удалось зарегистрировать электронную почту ${email}\n Попробуйте ещё раз`);
        setRegInfo({ isOpen: true, success: false, message: "Что-то пошло не так!\n Попробуйте еще раз." });
      })
      .finally(() => {
        setSubmitButtonState({ text: 'Зарегистрироваться', disabled: false });
      });
  };
  const handleLogin = () => {

  };

  const handleRegisterOpen = () => {
    setSubmitButtonState({ text: 'Зарегистрироваться', disabled: true });
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setSubmitButtonState({ text: 'Сохранить', disabled: false });
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setSubmitButtonState({ text: 'Сохранить', disabled: true });
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setSubmitButtonState({ text: 'Создать', disabled: true });
  };

  const handleDeleteClick = (card) => {
    setDeletePlaceConfirm({ isOpen: true, card: card });
    setSubmitButtonState({ text: 'Да', disabled: false });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletePlaceConfirm({ isOpen: false, card: {} });
    setSelectedCard(null);
    if (regInfo.success) {
      history.push('/sign-in');
    }
    setRegInfo({ isOpen: false, success: false, message: '' });  
  };

  /*обработчик закрытия попапа по нажатию на фон*/
  const handlePopupBGClick = (evt) => {
    if (evt.target.classList.contains('popup__container')) {
      closeAllPopups();
    }
  };
  /*обработчик закрытия попапа по нажатию Esc*/
  const handleKeyDown = useCallback((evt) => {
    if (evt.keyCode === 27) {
      closeAllPopups();
    }
  }, []);

  const handleUpdateUser = (objUserInfo) => {
    setSubmitButtonState({ text: 'Сохранение', disabled: true });
    api.setUserInfo(objUserInfo)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка обновления данных пользователя:\n ${err.status}\n ${err.statusText}`)
      })
      .finally(() => {
        setSubmitButtonState({ text: 'Сохранить', disabled: false });
      });
  };
  const handleUpdateAvatar = (link) => {
    setSubmitButtonState({ text: 'Загрузка', disabled: true });
    api.setAvatar(link)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка обновления аватара пользователя:\n ${err.status}\n ${err.statusText}`)
      })
      .finally(() => {
        setSubmitButtonState({ text: 'Сохранить', disabled: false });
      });
  };

  const handleAddPlace = (objNewCard) => {
    setSubmitButtonState({ text: 'Добавление', disabled: true });
    api.addNewLocation(objNewCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка добавления карточки:\n ${err.status}\n ${err.statusText}`);
      })
      .finally(() => {
        setSubmitButtonState({ text: 'Создать', disabled: false });
      });
  };

  const handleCardDelete = (card) => {
    setSubmitButtonState({ text: 'Удаление', disabled: true });
    api.deleteLocation(card._id)
      .then(res => {
        console.log(res);
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка удаления карточки:\n ${err.status}\n ${err.statusText}`);
      })
      .finally(() => {
        setSubmitButtonState({ text: 'Да', disabled: false });
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка загрузки данных карточки:\n ${err.status}\n ${err.statusText}`);
      });
  };

  const handleFormValidate = useCallback((isValid, formName) => {

    switch (formName) {
      case 'edit-profile':
        setSubmitButtonState({ disabled: !isValid, text: 'Сохранить' });
        break;
      case 'edit-avatar':
        setSubmitButtonState({ disabled: !isValid, text: 'Сохранить' });
        break;
      case 'new-location':
        setSubmitButtonState({ disabled: !isValid, text: 'Создать' });
        break;
      case 'login':
        setSubmitButtonState({ disabled: !isValid, text: 'Войти' });
        break;
      case 'register':
        setSubmitButtonState({ disabled: !isValid, text: 'Зарегистрироваться' });
        break;
      default:
        break;
    }
  }, []);


  /**получение данных пользователя, загрузка карточек, проверка jwt */
  useEffect(() => {
    const checkLoggedIn = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        validateToken(jwt)
          .then(data => {
            if (data) {
              setCurrentUserAccount({ loggedIn: true, email: data.email });
              history.push('/');
            }
          })
          .catch(err => {
            switch (err.status) {
              case 400:
                console.log('Токен не передан или передан не в том формате');
                break;
              case 401:
                console.log('Переданный токен некорректен');
                break;
              default:
            };
            history.push('/sign-in');
          });
      }
    };
    Promise.all([
      api.getUserInfo(),
      api.loadLocations()
    ])
      .then((values) => {
        setCurrentUser(values[0]);
        setCards([...values[1]]);
      }).catch(err => {
        console.log(err.status);
        alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.statusText}`);
      });
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (currentUserAccount.loggedIn) history.push('/');
  }, [currentUserAccount.loggedIn, history]);

  useEffect(() => {
    if (regInfo.isOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || deletePlaceConfirm.isOpen || selectedCard) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [regInfo.isOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, deletePlaceConfirm.isOpen, selectedCard, handleKeyDown]);

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-in" >
            <Header>
              <Link to="/sign-up" className="nav-bar__link">
                Регистрация
              </Link>
            </Header>
            <Login
              name="login"
              title="Вход"
              onSubmit={handleLogin}
              buttonState={submitButtonState}
            />
          </Route>
          <Route path="/sign-up">
            <Header>
              <Link to="/sign-in" className="nav-bar__link">
                Войти
              </Link>
            </Header>
            <Register
              name="register"
              title="Регистрация"
              onOpen={handleRegisterOpen}
              onSubmit={handleRegister}
              onFormValidate={handleFormValidate}
              buttonState={submitButtonState}
            >
              <Link to="/sign-in" className="dialog-form__link">
                Войти
              </Link>
            </Register>
          </Route>
          <ProtectedRoute path="/" loggedIn={currentUserAccount.loggedIn}>
            <Header>
              <Link to="/sign-in" className="nav-bar__link">
                Войти
              </Link>
            </Header>
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onNewLocation={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onDeleteClick={handleDeleteClick}
            />
            <Footer />
          </ProtectedRoute>
        </Switch>
        <InfoTooltip
          isOpen={regInfo.isOpen}
          success={regInfo.success}
          message={regInfo.message}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
          onUpdateUser={handleUpdateUser}
          onFormValidate={handleFormValidate}
          buttonState={submitButtonState}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
          onUpdateAvatar={handleUpdateAvatar}
          onFormValidate={handleFormValidate}
          buttonState={submitButtonState}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
          onAddPlace={handleAddPlace}
          onFormValidate={handleFormValidate}
          buttonState={submitButtonState}
        />
        <DeletePlacePopup
          isOpen={deletePlaceConfirm.isOpen}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
          card={deletePlaceConfirm.card}
          onCardDelete={handleCardDelete}
          buttonState={submitButtonState}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onBGClick={handlePopupBGClick}
          onKeyDown={handleKeyDown}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;