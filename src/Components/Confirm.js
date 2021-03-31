import React from 'react';
import Api from '../utils/Api';
import Spinner from './Spinner';

import CurrentUserContext from '../contexts/CurrentUserContext'

function Confirm ({isOpen, setIsOpen,confirmAction, confirmObj, setСurrentUser, cards, setCards, isLoadingConfirm, setIsLoadingConfirm}) {
  
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if(isOpen) {
      const Popup = document.querySelector(`.confirm`);
      Popup.classList.add("popup_opened");
    }
    return () => {
      const Popup = document.querySelector(`.confirm`);
      Popup.classList.remove("popup_opened");
    };
  }, [isOpen]); 

  function onClick () {
    // console.log("confirm -> onClick");
    // console.log(confirmAction);
    setIsLoadingConfirm(true);
    switch  (confirmAction) {
      case 'addNewCard': 
        Api.addNewCard(confirmObj.name, confirmObj.link)
        .then((newCard) => {
          newCard.key = newCard._id;
          newCard.like = newCard.likes;
          newCard.ownerId = newCard.owner._id;
          newCard.src = newCard.link;
          newCard.nameImg = newCard.name;
          newCard.cardId = newCard._id;
          setCards([newCard, ...cards]); 
        })
        .then(() => {setIsOpen(false)})
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        }); 
        break;
      case 'cardDelete':
        const isOwn = confirmObj.ownerId === currentUser._id;
        if(isOwn) {
            Api.deleteCard(confirmObj.cardId)
            .then(() => {
                const newCards = cards.filter((c) => c.cardId !== confirmObj.cardId);
              setCards(newCards);
            })
            .then(() => {setIsOpen(false)})
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });}
        break;
      case 'editUserAvatar':
        Api.setUserAvatar(confirmObj.avatar)
        .then((res) => setСurrentUser(res))
        .then(() => {setIsOpen(false)})
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
          break;
      case 'editUserInfo':
        Api.editUserInfo (confirmObj.name, confirmObj.about)
        .then((res) => setСurrentUser(res))
        .then(() => {setIsOpen(false)})
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
        break;
      default:
        break;

    } 
    // console.log("Confirm -> onCLick");
  }

  return (
    <div className="confirm popup">
    <div className="popup__container confirm__container">
      <h2 className="popup__header">Вы уверены?</h2>
      
      <button className="popup__save" type="button" onClick={onClick}>Да</button>
      {isLoadingConfirm ? <Spinner /> : ''}
      <button className="popup__close" type="button" onClick={function (evt) { evt.preventDefault(); setIsOpen(false)}}></button>
    
    </div>
  </div>
  )
}

export default Confirm; 