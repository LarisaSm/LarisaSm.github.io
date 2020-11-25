
import { Card as cardI } from "./card.js";
import {formValidator} from "./FormValidator.js"
import {Section} from './section.js'
import { PopupWithImage } from "./popupWithImage.js";
import { PopupWithForm } from "./popupWithForm.js";
import {userInfo} from './userInfo.js'

import {
  editUserPopup, 
  addCardPopup, 
  imagePopup, 
  cards, 
  cardTemplate, 
  addCardButton,
  editUserButton,
  cardTitleInput,
  cardLinkInput,
  userName,
  userJob,
  valid
} from './constants.js'



const image = new PopupWithImage (imagePopup);
const user = new userInfo ({name: userName, about: userJob});

const addCard = new PopupWithForm ({
  selector: addCardPopup, 
  submitForm: (item) => {
    const card = new Section ( 
    { items: [item], 
      renderer: (item) => {
        const initialCard = new cardI (item, cardTemplate, (evt) => {image.open(evt)});
        const cardElement = initialCard.render();
        card.addItem(cardElement);
    }}, cards);

    card.renderItem();
  }
});

const editUser = new PopupWithForm ({
  selector: editUserPopup,
  submitForm: (item) => {
    user.setUserInfo(item.name, item.about);
    editUser.close();
  }});

function enableValidation({formSelector, ...rest}) {
  // Найдём все формы с указанным классом в DOM,
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    const formElementClass = formElement.getAttribute('class').slice(6);
    valid[formElementClass] = new formValidator(rest, formElement);
    valid[formElementClass].enableValidation();
    });
}

enableValidation({
  formSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});


const initial = new Section (
  { items: initialCards, 
  renderer: (item) => {
    const initialCard = new cardI (item, cardTemplate, (evt) => {image.open(evt)});
    const cardElement = initialCard.render();
    initial.addItem(cardElement);
}}, cards);

initial.renderItem();


//Обработчики событий
editUserButton.addEventListener("click", () => {
    const item = user.getUserInfo();
    cardTitleInput.value = item.name;
    cardLinkInput.value = item.about;
    editUser.open();
});

addCardButton.addEventListener("click", addCard.open.bind(addCard));