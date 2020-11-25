const profile = document.querySelector(".profile");
const editUserPopup = document.querySelector(".edit-user");
const addCardPopup = document.querySelector(".add-card");
const imagePopup = document.querySelector(".image");
const cards = document.querySelector(".elements");

const cardTemplate = document.querySelector("#card").content;

// const imageSrc = imagePopup.querySelector(".popup__image");
// const figcaptionImage = imagePopup.querySelector(".popup__figcaption-image");

// const nameImg = addCardPopup.querySelector(".popup__input_type_name");
// const aboutImg = addCardPopup.querySelector(".popup__input_type_about");

/* кнопки */
const addCardButton = profile.querySelector(".profile__button_type_add");
const editUserButton = profile.querySelector(".profile__button_type_edit");
// const closeEditUserButton = editUserPopup.querySelector(".popup__close");
// const closeAddCard = addCardPopup.querySelector(".popup__close");
// const closeImagePopup = imagePopup.querySelector(".popup__close");

const cardTitleInput = editUserPopup.querySelector(".popup__input_type_name");
const cardLinkInput = editUserPopup.querySelector(".popup__input_type_about");

const userName = document.querySelector(".profile__name-title");
const userJob = document.querySelector(".profile__about");

const valid = [];

export { 
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
}