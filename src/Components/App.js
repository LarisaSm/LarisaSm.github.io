import React from "react";
import ImagePopup from "./ImagePopup";
import Confirm from "./Confirm";
import api from "../utils/api";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacerPopupState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [isConfirmOpen, setConfirmOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    src: "",
    nameImg: "",
  });
  const [isLoadingConfirm, setIsLoadingConfirm] = React.useState(false);
  const [isLoadingPopup, setIsLoadingPopup] = React.useState(false);

  const [currentUser, setСurrentUser] = React.useState({ name: "", about: "" });
  const [currentCard, setСurrentCard] = React.useState({
    ownerId: "",
    cardId: "",
  });

  const [confirmAction, setConfirmAction] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
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
    setIsLoadingPopup(false);
    setСurrentCard({
      ownerId: "",
      cardId: "",
    });
  }

  function handleCardClick({ src, nameImg }) {
    setSelectedCard({ src, nameImg });
    setImagePopupState(true);
  }

  function handleConfirmClick() {
    setConfirmOpen(true);
  }

  function handleEditProfileClick(evt) {
    evt.preventDefault();
    setEditProfilePopupState(true);
  }

  function handleEditAvatarClick(e) {
    e.preventDefault();
    setEditAvatarPopupState(true);
  }

  function handleAddPlaceClick(evt) {
    evt.preventDefault();
    setAddPlacerPopupState(true);
  }

  function cardDelete() {
    const isOwn = currentCard.ownerId === currentUser._id;
    if (isOwn) {
      api
        .deleteCard(currentCard.cardId)
        .then(() => {
          const newCards = cards.filter((c) => c.cardId !== currentCard.cardId);
          setCards(newCards);
        })
        .then(() => {
          setConfirmOpen(false);
          setIsLoadingConfirm(false);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function handleCardDelete(obj) {
    setConfirmAction("cardDelete");
    setСurrentCard({
      ownerId: obj.ownerId,
      cardId: obj.cardId,
    });
  }

  function handleCardLike(like, cardId) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = like.some((i) => i._id === currentUser._id);
    // console.log('main -> handleCardLike');
    if (!isLiked) {
      // console.log("main -> handleCardLike -> like")
      api
        .likeCard(cardId)
        .then((newCard) => {
          const newCards = cards.map((c) =>
            c.cardId === newCard._id
              ? {
                  src: newCard.link,
                  nameImg: newCard.name,
                  like: newCard.likes,
                  cardId: newCard._id,
                  ownerId: newCard.owner._id,
                }
              : c
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      // console.log("main -> handleCardLike -> deleteLike")
      api
        .deleteLikeCard(cardId)
        .then((newCard) => {
          const newCards = cards.map((c) =>
            c.cardId === newCard._id
              ? {
                  src: newCard.link,
                  nameImg: newCard.name,
                  like: newCard.likes,
                  cardId: newCard._id,
                  ownerId: newCard.owner._id,
                }
              : c
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function handleUpdateUser(name, about) {
    setIsLoadingPopup(true);
    api
      .editUserInfo(name, about)
      .then((res) => setСurrentUser(res))
      .then(() => {
        setIsLoadingPopup(false);
        setEditProfilePopupState(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(obj) {
    setIsLoadingPopup(true);
    api
      .setUserAvatar(obj.avatar)
      .then((res) => setСurrentUser(res))
      .then(() => {
        setIsLoadingPopup(false);
        setEditAvatarPopupState(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(obj) {
    setIsLoadingPopup(true);
    api
      .addNewCard(obj.name, obj.link)
      .then((newCard) => {
        newCard.key = newCard._id;
        newCard.like = newCard.likes;
        newCard.ownerId = newCard.owner._id;
        newCard.src = newCard.link;
        newCard.nameImg = newCard.name;
        newCard.cardId = newCard._id;
        setCards([newCard, ...cards]);
      })
      .then(() => {
        setIsLoadingPopup(false);
        setAddPlacerPopupState(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  React.useEffect(() => {
    setIsLoading(true);
    api
      .getInitialCards()
      .then((res) => {
        setCards(
          res.map((item) => ({
            src: item.link,
            nameImg: item.name,
            like: item.likes,
            cardId: item._id,
            ownerId: item.owner._id,
          }))
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main
          cards={cards}
          onEditProfile={(e) => handleEditProfileClick(e)}
          onEditAvatar={(e) => handleEditAvatarClick(e)}
          onAddPlace={(e) => handleAddPlaceClick(e)}
          onCardClick={handleCardClick}
          setConfirmOpen={handleConfirmClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoadingPopup={isLoadingPopup}
        ></EditProfilePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoadingPopup={isLoadingPopup}
        ></EditAvatarPopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoadingPopup={isLoadingPopup}
        ></AddPlacePopup>

        <Confirm
          isOpen={isConfirmOpen}
          setIsOpen={setConfirmOpen}
          confirmAction={confirmAction}
          setСurrentUser={setСurrentUser}
          isLoadingConfirm={isLoadingConfirm}
          setIsLoadingConfirm={setIsLoadingConfirm}
          cardDelete={cardDelete}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
