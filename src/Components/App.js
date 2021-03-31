import React from 'react';
import ImagePopup from './ImagePopup';
import Confirm from './Confirm';
import Api from '../utils/Api';

import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacerPopupState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [isConfirmOpen, setConfirmOpen] = React.useState(false);

  const [cards, setCards] = React.useState([{
      src: '',
      nameImg: '',
      like: [''],
      cardId: '',
      ownerId: ''
  }]); 
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({src: '', nameImg: ''});
  const [isLoadingConfirm, setIsLoadingConfirm] = React.useState(false);


  const [currentUser, setСurrentUser] = React.useState({name: '', about: ''}); 

  const [confirmAction, setConfirmAction] = React.useState('');
  const [confirmObj, setConfirmObj] = React.useState({name: '', about: ''});

  React.useEffect(() => {
    Api.getUserInfo().then((res) => {
      setСurrentUser(res);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }, []);

  function closeAllPopups() {
    setEditProfilePopupState(false);
    setEditAvatarPopupState(false);
    setAddPlacerPopupState(false);
    setImagePopupState(false);
    setSelectedCard([]);
  }

  function handleCardClick({src, nameImg}) {
    setSelectedCard({src, nameImg});
    setImagePopupState(true);
  }

  function handleConfirmClick() {
    setConfirmOpen(true);
  }

  function handleEditProfileClick (evt) {
    evt.preventDefault();
    setEditProfilePopupState(true);
  }

  function handleEditAvatarClick (e) {
    e.preventDefault();
    setEditAvatarPopupState(true);
  }
  
  function handleAddPlaceClick (evt) {
    evt.preventDefault();
    setAddPlacerPopupState(true);
  }


   function handleCardLike(like, cardId) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = like.some(i => i._id === currentUser._id);
    // console.log('main -> handleCardLike');
    if(!isLiked) {
      // console.log("main -> handleCardLike -> like")
      Api.likeCard(cardId)
      .then((newCard) => {
          const newCards = cards.map((c) => c.cardId === newCard._id ? ({
            src: newCard.link,
            nameImg: newCard.name,
            like: newCard.likes,
            cardId: newCard._id,
            ownerId: newCard.owner._id
          }) : c);
        setCards(newCards);
      })
    }
    else {
      // console.log("main -> handleCardLike -> deleteLike")
      Api.deleteLikeCard(cardId)
      .then((newCard) => {
        const newCards = cards.map((c) => c.cardId === newCard._id ? ({
          src: newCard.link,
          nameImg: newCard.name,
          like: newCard.likes,
          cardId: newCard._id,
          ownerId: newCard.owner._id
        }) : c);
      setCards(newCards);
    })
    }
} 

React.useEffect(() => {
  setIsLoading(true);
  Api.getInitialCards()
  .then((res) => {
    setCards(res.map((item) => ({
      src: item.link,
      nameImg: item.name,
      like: item.likes,
      cardId: item._id,
      ownerId: item.owner._id
    })));
    setIsLoading(false);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Header />
      <Main 
        cards={cards}
        onEditProfile = {(e) => handleEditProfileClick(e)} 
        onEditAvatar = {(e) => handleEditAvatarClick(e)}
        onAddPlace = {(e) => handleAddPlaceClick(e)}
        onCardClick = {handleCardClick}
        setConfirmOpen={handleConfirmClick}
        setConfirmAction={setConfirmAction}
        setConfirmObj={setConfirmObj}
        onCardLike={handleCardLike}
        isLoading={isLoading}
        />
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} setConfirmOpen={handleConfirmClick} setConfirmAction={setConfirmAction} setConfirmObj={setConfirmObj}></EditProfilePopup>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} setConfirmOpen={handleConfirmClick} setConfirmAction={setConfirmAction} setConfirmObj={setConfirmObj}></EditAvatarPopup>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} setConfirmOpen={handleConfirmClick} setConfirmAction={setConfirmAction} setConfirmObj={setConfirmObj}></AddPlacePopup>

      <Confirm isOpen={isConfirmOpen} setIsOpen={setConfirmOpen} confirmAction={confirmAction} confirmObj={confirmObj} setСurrentUser={setСurrentUser} cards={cards} setCards={setCards} isLoadingConfirm={isLoadingConfirm} setIsLoadingConfirm={setIsLoadingConfirm}/>
      <ImagePopup 
        card={selectedCard} 
        isOpen={isImagePopupOpen}   
        onClose={closeAllPopups}/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
