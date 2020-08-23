
const profile = document.querySelector('.profile');
const editUser = document.querySelector('.edit-user');
const addCard = document.querySelector('.add-card');
const showImage = document.querySelector('.image');
const imgElement = document.querySelectorAll('.element__img');
const element = document.querySelectorAll('.element');
const elements = document.querySelector('.elements');

const cardTemplate = document.querySelector('#card').content;

const imageSrc = showImage.querySelector('.popup__image');
const altImage = showImage.querySelector('.popup__alt-image');

const nameImg = addCard.querySelector('.popup__input_type_name');
const aboutImg = addCard.querySelector('.popup__input_type_about');

/* кнопки */
const addCardButton = profile.querySelector('.profile__button_type_add');
const editUserButton = profile.querySelector('.profile__button_type_edit');
const closeEditUserButton = editUser.querySelector('.popup__close');
const closeAddCard = addCard.querySelector('.popup__close');
const closeShowImage = showImage.querySelector('.popup__close');

const nameInput = editUser.querySelector('.popup__input_type_name'); 
const jobInput = editUser.querySelector('.popup__input_type_about'); 
    
const nameProfile = document.querySelector('.profile__name-title');
const jobProfile = document.querySelector('.profile__about');

function togglePopup (popup) {
  popup.classList.toggle('popup_opened');
}

function closeByOverlayClick (evt) {
  if (evt.target !== evt.currentTarget) return
  togglePopup(evt.target);
}

function toggleShowImagePopup (evt) {
  if (showImage.classList.contains('popup_opened')) {
    showImage.removeEventListener('click', closeByOverlayClick);
  }
  else {
    showImage.addEventListener('click', closeByOverlayClick);
    const titleElement = evt.target.nextElementSibling.querySelector('.element__title');
    const imgSrc = evt.target.getAttribute('src');
    altImage.textContent = titleElement.textContent;
    imageSrc.setAttribute('src', imgSrc);
  }
  togglePopup(showImage);
}

function createCardElement (aboutImg, nameImg) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector('.element__img');
  cardImg.src = aboutImg;
  card.querySelector('.element__title').textContent = nameImg;
  cardImg.alt = nameImg;

  cardImg.addEventListener('click', evt => toggleShowImagePopup (evt));

  card.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_type_active');
  });

  card.querySelector('.element__trash').addEventListener('click', function (evt) {
    const listItem = evt.target.closest('.element');
    listItem.remove();
  });
  return card;
}

function addCards (aboutImg, nameImg) {
  const card = createCardElement(aboutImg, nameImg);
  elements.prepend(card);
}

function toggleAddCardPopup (evt) {
  if (addCard.classList.contains('.popup_opened')) {
    addCard.removeEventListener('click', closeByOverlayClick);
  }
  else {
    addCard.addEventListener('click', closeByOverlayClick);
  }
  togglePopup(addCard);
}

function addCardSubmitHandler (evt) {
  evt.preventDefault();
  addCards(aboutImg.value, nameImg.value);
  toggleAddCardPopup();
  aboutImg.value = '';
  nameImg.value = '';
}

function toggleEditUserPopup () {
  if (editUser.classList.contains('popup_opened')) {
    editUser.removeEventListener('click', closeByOverlayClick);
  }
  else {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    editUser.addEventListener('click', closeByOverlayClick);
  }
  togglePopup(editUser);
}

function editProfileSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    toggleEditUserPopup();
}

initialCards.forEach(item => addCards(item.link, item.name));

//Обработчики событий
editUser.addEventListener('submit', editProfileSubmitHandler);
editUserButton.addEventListener('click', toggleEditUserPopup);
closeEditUserButton.addEventListener('click', toggleEditUserPopup);
addCardButton.addEventListener('click', toggleAddCardPopup);
closeAddCard.addEventListener('click', toggleAddCardPopup);
closeShowImage.addEventListener('click', toggleShowImagePopup);
addCard.addEventListener('submit', addCardSubmitHandler);



