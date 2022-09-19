import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  /** состояние для попапа подтверждения удаления карточки */
  const [deletePlaceConfirm, setDeletePlaceConfirm] = useState({
    isOpen: false, card: {}
  });
  const [selectedCard, setSelectedCard] = useState(null);

  /**стейт кнопок сабмита форм
   *  Активность кнопки изменяется при выполнении запросов к серверу и валидации форм.
   * Текст неактивной кнопки разный при выполнении запроса и валидации, 
   * поэтому добавляю в стейт текст отдельным полем.
 */
  const [submitButtonState, setSsubmitButtonState] = useState({ text: '', disabled: false });

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setSsubmitButtonState({ text: 'Сохранить', disabled: false });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setSsubmitButtonState({ text: 'Сохранить', disabled: true });
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setSsubmitButtonState({ text: 'Создать', disabled: true });
  }

  const handleDeleteClick = (card) => {
    setDeletePlaceConfirm({ isOpen: true, card: card });
    setSsubmitButtonState({ text: 'Да', disabled: false });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = (formName) => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletePlaceConfirm({ isOpen: false, card: {} });    
    setSelectedCard(null);    
  }

  /*обработчик закрытия попапа по нажатию на фон*/
  const handlePopupBGClick = (evt) => {
    if (evt.target.classList.contains('popup__container')) {
      closeAllPopups();
    }
  }
  /*обработчик закрытия попапа по нажатию Esc*/
  const handleKeyDown = useCallback((evt) => {
    if (evt.keyCode === 27) {
      closeAllPopups();
    }
  },[]);

  const handleUpdateUser = (objUserInfo) => {
    setSsubmitButtonState({ text: 'Сохранение', disabled: true });
    api.setUserInfo(objUserInfo)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка обновления данных пользователя:\n ${err.status}\n ${err.text}`)
      })
      .finally(() => {
        setSsubmitButtonState({ text: 'Сохранить', disabled: false });
      });
  }
  const handleUpdateAvatar = (link) => {
    setSsubmitButtonState({ text: 'Загрузка', disabled: true });
    api.setAvatar(link)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка обновления аватара пользователя:\n ${err.status}\n ${err.text}`)
      })
      .finally(() => {
        setSsubmitButtonState({ text: 'Сохранить', disabled: false });
      });
  }

  const handleAddPlace = (objNewCard) => {
    setSsubmitButtonState({ text: 'Добавление', disabled: true });
    api.addNewLocation(objNewCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка добавления карточки:\n ${err.status}\n ${err.text}`);
      })
      .finally(() => {
        setSsubmitButtonState({ text: 'Создать', disabled: false });
      });
  }

  const handleCardDelete = (card) => {
    setSsubmitButtonState({ text: 'Удаление', disabled: true });
    api.deleteLocation(card._id)
      .then(res => {
        console.log(res);
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка удаления карточки:\n ${err.status}\n ${err.text}`);
      })
      .finally(() => {
        setSsubmitButtonState({ text: 'Да', disabled: false });        
      });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err.status);
        alert(`Ошибка загрузки данных карточки:\n ${err.status}\n ${err.text}`);
      });
  }

  const handleFormValidate = useCallback((isValid, formName)=>{
    
    switch(formName){
      case 'edit-profile':
        setSsubmitButtonState({disabled: !isValid, text:'Сохранить'});
        break;
      case 'edit-avatar':
        setSsubmitButtonState({disabled: !isValid, text:'Сохранить'});
        break;
      case 'new-location':
        setSsubmitButtonState({disabled: !isValid, text:'Создать'});
        break;
      default:

        break;
    }    
  }, []); 
  
  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.loadLocations()
    ])
      .then((values) => {
        setCurrentUser(values[0]);
        setCards([...values[1]]);
      }).catch(err => {
        console.log(err.status);
        alert(`Ошибка загрузки данных:\n ${err.status}\n ${err.text}`);
      });
  }, []);

  useEffect(()=>{
    if(isEditAvatarPopupOpen||isEditProfilePopupOpen||isAddPlacePopupOpen||deletePlaceConfirm.isOpen|| selectedCard){
      document.addEventListener('keydown', handleKeyDown);
    }else{
      document.removeEventListener('keydown', handleKeyDown);
    }    
  },[isEditAvatarPopupOpen,isEditProfilePopupOpen,isAddPlacePopupOpen, deletePlaceConfirm.isOpen, selectedCard, handleKeyDown]);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
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
