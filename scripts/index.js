
const profile = document.querySelector('.profile');
const editUserPopup = document.querySelector('.edit-user');
const addCardPopup = document.querySelector('.add-card');
const imagePopup = document.querySelector('.image');
const imgElement = document.querySelectorAll('.element__img');
const cards = document.querySelector('.elements');

const cardTemplate = document.querySelector('#card').content;

const imageSrc = imagePopup.querySelector('.popup__image');
const figcaptionImage = imagePopup.querySelector('.popup__figcaption-image');

const nameImg = addCardPopup.querySelector('.popup__input_type_name-img');
const aboutImg = addCardPopup.querySelector('.popup__input_type_link');

/* кнопки */
const addCardButton = profile.querySelector('.profile__button_type_add');
const editUserButton = profile.querySelector('.profile__button_type_edit');
const closeEditUserButton = editUserPopup.querySelector('.popup__close');
const closeAddCard = addCardPopup.querySelector('.popup__close');
const closeImagePopup = imagePopup.querySelector('.popup__close');

const cardTitleInput = editUserPopup.querySelector('.popup__input_type_name'); 
const cardLinkInput = editUserPopup.querySelector('.popup__input_type_about'); 
    
const userName = document.querySelector('.profile__name-title');
const userJob = document.querySelector('.profile__about');

function togglePopup (popup) {
  popup.classList.toggle('popup_opened');
}

function closeByOverlayClick (evt) {
  if (evt.target !== evt.currentTarget) return
  togglePopup(evt.target);
}

function toggleImagePopup (evt) {
  if (imagePopup.classList.contains('popup_opened')) {
    imagePopup.removeEventListener('click', closeByOverlayClick);
  }
  else {
    imagePopup.addEventListener('click', closeByOverlayClick);
    const titleElement = evt.target.nextElementSibling.querySelector('.element__title');
    const imgSrc = evt.target.getAttribute('src');
    const imgFigcaption = titleElement.textContent;
    figcaptionImage.textContent = titleElement.textContent;
    imageSrc.setAttribute('src', imgSrc);
    imageSrc.setAttribute('alt', imgFigcaption);
  }
  togglePopup(imagePopup);
}

function createCardElement (aboutImg, nameImg) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector('.element__img');
  cardImg.src = aboutImg;
  cardElement.querySelector('.element__title').textContent = nameImg;
  cardImg.alt = nameImg;
  cardImg.addEventListener('click', evt => toggleImagePopup (evt));

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_type_active');
  });

  cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
    const listItem = evt.target.closest('.element');
    listItem.remove();
  });
  return cardElement;
}

function addCards (aboutImg, nameImg) {
  const card = createCardElement(aboutImg, nameImg);
  cards.prepend(card);
}

function toggleAddCardPopup (evt) {
  if (addCardPopup.classList.contains('.popup_opened')) {
    addCardPopup.removeEventListener('click', closeByOverlayClick);
  }
  else {
    addCardPopup.addEventListener('click', closeByOverlayClick);
  }
  togglePopup(addCardPopup);
  aboutImg.value = '';
  nameImg.value = '';
}

function addCardSubmitHandler (evt) {
  evt.preventDefault();
  addCards(aboutImg.value, nameImg.value);
  toggleAddCardPopup();
}

function toggleEditUserPopup () {
  if (editUserPopup.classList.contains('popup_opened')) {
    editUserPopup.removeEventListener('click', closeByOverlayClick);
  }
  else {
    cardTitleInput.value = userName.textContent;
    cardLinkInput.value = userJob.textContent;
    editUserPopup.addEventListener('click', closeByOverlayClick);
  }
  togglePopup(editUserPopup);
}

function editProfileSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = cardTitleInput.value;
    userJob.textContent = cardLinkInput.value;
    toggleEditUserPopup();
}

initialCards.forEach(item => addCards(item.link, item.name));

//Обработчики событий
editUserPopup.addEventListener('submit', editProfileSubmitHandler);
editUserButton.addEventListener('click', toggleEditUserPopup);
closeEditUserButton.addEventListener('click', toggleEditUserPopup);
addCardButton.addEventListener('click', toggleAddCardPopup);
closeAddCard.addEventListener('click', toggleAddCardPopup);
closeImagePopup.addEventListener('click', toggleImagePopup);
addCardPopup.addEventListener('submit', addCardSubmitHandler);



