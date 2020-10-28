
const profile = document.querySelector('.profile');
const editUserPopup = document.querySelector('.edit-user');
const addCardPopup = document.querySelector('.add-card');
const imagePopup = document.querySelector('.image');
const imgElement = document.querySelectorAll('.element__img');
const cards = document.querySelector('.elements');

const cardTemplate = document.querySelector('#card').content;

const imageSrc = imagePopup.querySelector('.popup__image');
const figcaptionImage = imagePopup.querySelector('.popup__figcaption-image');
<<<<<<< HEAD

const nameImg = addCardPopup.querySelector('.popup__input_type_name');
const aboutImg = addCardPopup.querySelector('.popup__input_type_about');


=======

const nameImg = addCardPopup.querySelector('.popup__input_type_name-img');
const aboutImg = addCardPopup.querySelector('.popup__input_type_link');
>>>>>>> bd0faeab8b28da758835ea0759695006691985d4

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
  if (popup.classList.contains('popup_opened')) {
    resetForm (popup);
    document.body.removeEventListener ('keyup', closeByEsc);
    popup.removeEventListener('click', closeByOverlayClick);
  }
  popup.classList.toggle('popup_opened');
}

function resetForm (popup) {
    const form = popup.querySelector('.form');
    if (form) {
      const input = Array.from(form.querySelectorAll('.popup__input'));
      const error = Array.from(form.querySelectorAll('span'));
      const button = form.querySelector('button');
      form.reset();
      button.disabled = true;
      button.classList.add('button_inactive');
      input.forEach((inputElement) => {
        inputElement.classList.remove('popup__input_type_error');
      })
      error.forEach((errorElement) => {
        errorElement.textContent = '';
      })
    }

}


function closeByOverlayClick (evt) {
  if (evt.target !== evt.currentTarget) return
  togglePopup(evt.target);
}

<<<<<<< HEAD
function closeByEsc (evt) {
  const currentPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    togglePopup(currentPopup);
  }
}

function toggleImagePopup (evt) {
  if (!imagePopup.classList.contains('popup_opened')) {
    imagePopup.addEventListener('click', closeByOverlayClick);
    document.body.addEventListener ('keyup', closeByEsc);
=======
function toggleImagePopup (evt) {
  if (imagePopup.classList.contains('popup_opened')) {
    imagePopup.removeEventListener('click', closeByOverlayClick);
  }
  else {
    imagePopup.addEventListener('click', closeByOverlayClick);
>>>>>>> bd0faeab8b28da758835ea0759695006691985d4
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
<<<<<<< HEAD
  cardImg.addEventListener('click', toggleImagePopup);
=======
  cardImg.addEventListener('click', evt => toggleImagePopup (evt));
>>>>>>> bd0faeab8b28da758835ea0759695006691985d4

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

<<<<<<< HEAD
function toggleAddCardPopup () {
  if (!addCardPopup.classList.contains('.popup_opened')) {
    addCardPopup.addEventListener('click', closeByOverlayClick);
    document.body.addEventListener ('keyup', closeByEsc);
  }
  togglePopup(addCardPopup);
=======
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
>>>>>>> bd0faeab8b28da758835ea0759695006691985d4
}

function addCardSubmitHandler (evt) {
  evt.preventDefault();
  addCards(aboutImg.value, nameImg.value);
  toggleAddCardPopup();
}

function toggleEditUserPopup () {
<<<<<<< HEAD
  if (!editUserPopup.classList.contains('popup_opened')) {
    cardTitleInput.value = userName.textContent;
    cardLinkInput.value = userJob.textContent;
    editUserPopup.addEventListener('click', closeByOverlayClick);
    document.body.addEventListener ('keyup', closeByEsc);
=======
  if (editUserPopup.classList.contains('popup_opened')) {
    editUserPopup.removeEventListener('click', closeByOverlayClick);
  }
  else {
    cardTitleInput.value = userName.textContent;
    cardLinkInput.value = userJob.textContent;
    editUserPopup.addEventListener('click', closeByOverlayClick);
>>>>>>> bd0faeab8b28da758835ea0759695006691985d4
  }
  togglePopup(editUserPopup);
}

function editProfileSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = cardTitleInput.value;
    userJob.textContent = cardLinkInput.value;
    toggleEditUserPopup();
}

enableValidation({
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

initialCards.forEach(item => addCards(item.link, item.name));

//Обработчики событий
editUserPopup.addEventListener('submit', editProfileSubmitHandler);
editUserButton.addEventListener('click', toggleEditUserPopup);
closeEditUserButton.addEventListener('click', toggleEditUserPopup);
addCardButton.addEventListener('click', toggleAddCardPopup);
closeAddCard.addEventListener('click', toggleAddCardPopup);
closeImagePopup.addEventListener('click', toggleImagePopup);
addCardPopup.addEventListener('submit', addCardSubmitHandler);



