
import { Card as cardI } from "./card.js";
import {formValidator} from "./FormValidator.js"



const profile = document.querySelector(".profile");
const editUserPopup = document.querySelector(".edit-user");
const addCardPopup = document.querySelector(".add-card");
const imagePopup = document.querySelector(".image");
const imgElement = document.querySelectorAll(".element__img");
const cards = document.querySelector(".elements");

const cardTemplate = document.querySelector("#card").content;

const imageSrc = imagePopup.querySelector(".popup__image");
const figcaptionImage = imagePopup.querySelector(".popup__figcaption-image");

const nameImg = addCardPopup.querySelector(".popup__input_type_name");
const aboutImg = addCardPopup.querySelector(".popup__input_type_about");

/* кнопки */
const addCardButton = profile.querySelector(".profile__button_type_add");
const editUserButton = profile.querySelector(".profile__button_type_edit");
const closeEditUserButton = editUserPopup.querySelector(".popup__close");
const closeAddCard = addCardPopup.querySelector(".popup__close");
const closeImagePopup = imagePopup.querySelector(".popup__close");

const cardTitleInput = editUserPopup.querySelector(".popup__input_type_name");
const cardLinkInput = editUserPopup.querySelector(".popup__input_type_about");

const userName = document.querySelector(".profile__name-title");
const userJob = document.querySelector(".profile__about");

function togglePopup(popup) {
  if (popup.classList.contains("popup_opened")) {
    resetForm(popup);
    document.body.removeEventListener("keyup", closeByEsc);
    popup.removeEventListener("click", closeByOverlayClick);
  }
  else {
    document.body.addEventListener("keyup", closeByEsc);
    popup.addEventListener("click", closeByOverlayClick);
  }
  popup.classList.toggle("popup_opened");
}

function resetForm(popup) {
  const form = popup.querySelector(".form");
  if (form) {
    const input = Array.from(form.querySelectorAll(".popup__input"));
    const error = Array.from(form.querySelectorAll("span"));
    const button = form.querySelector("button");
    form.reset();
    button.disabled = true;
    button.classList.add("button_inactive");
    input.forEach((inputElement) => {
      inputElement.classList.remove("popup__input_type_error");
    });
    error.forEach((errorElement) => {
      errorElement.textContent = "";
    });
  }
}

function closeByOverlayClick(evt) {
  if (evt.target !== evt.currentTarget) return;
  togglePopup(evt.target);
}

function closeByEsc(evt) {
  const currentPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    togglePopup(currentPopup);
  }
}

function toggleImagePopup(evt) {
  if (!imagePopup.classList.contains("popup_opened")) {
    const titleElement = evt.target.nextElementSibling.querySelector(
      ".element__title"
    );
    const imgSrc = evt.target.getAttribute("src");
    const imgFigcaption = titleElement.textContent;
    figcaptionImage.textContent = titleElement.textContent;
    imageSrc.setAttribute("src", imgSrc);
    imageSrc.setAttribute("alt", imgFigcaption);
  }
  togglePopup(imagePopup);
}

function addCards(aboutImg, nameImg) {
  const card = new cardI(aboutImg, nameImg, cardTemplate, toggleImagePopup);
  card.render(cards);
}

function toggleAddCardPopup() {
  togglePopup(addCardPopup);
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  addCards(aboutImg.value, nameImg.value);
  toggleAddCardPopup();
}

function toggleEditUserPopup() {
  if (!editUserPopup.classList.contains("popup_opened")) {
    cardTitleInput.value = userName.textContent;
    cardLinkInput.value = userJob.textContent;
  }
  togglePopup(editUserPopup);
}

function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = cardTitleInput.value;
  userJob.textContent = cardLinkInput.value;
  toggleEditUserPopup();
}

function enableValidation({formSelector, ...rest}) {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    const valid = new formValidator(rest, formElement);
    valid.enableValidation();
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

initialCards.forEach((item) => addCards(item.link, item.name));

//Обработчики событий
editUserPopup.addEventListener("submit", editProfileSubmitHandler);
editUserButton.addEventListener("click", toggleEditUserPopup);
closeEditUserButton.addEventListener("click", toggleEditUserPopup);
addCardButton.addEventListener("click", toggleAddCardPopup);
closeAddCard.addEventListener("click", toggleAddCardPopup);
closeImagePopup.addEventListener("click", toggleImagePopup);
addCardPopup.addEventListener("submit", addCardSubmitHandler);
