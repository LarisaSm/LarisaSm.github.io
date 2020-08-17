
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

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function formSubmitHandlerElement (evt) {
  evt.preventDefault();
  addUserElementCard(aboutImg.value, nameImg.value);
  popupOpenCloseAddCard();
  aboutImg.value = '';
  nameImg.value = '';
}


function addUserElementCard (aboutImg, nameImg) {
  const userElementCard = cardTemplate.cloneNode(true);
  
  userElementCard.querySelector('.element__img').src = aboutImg;
  userElementCard.querySelector('.element__title').textContent = nameImg;

  userElementCard.querySelector('.element__img').addEventListener('click', function (evt) {
    if (showImage.classList.contains('popup_opened')){
      showImage.classList.remove('popup_opened');
    }
    else {
    const titleElement = evt.target.nextElementSibling.querySelector('.element__title');
    const imgSrc = evt.target.getAttribute('src');
    altImage.textContent = titleElement.textContent;
    imageSrc.setAttribute('src', imgSrc);
    showImage.classList.add('popup_opened');
  }
  });

  userElementCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_type_active');
  });

  userElementCard.querySelector('.element__trash').addEventListener('click', function (evt) {
    const listItem = evt.target.closest('.element');
  listItem.remove();
  })

  elements.prepend(userElementCard);
  
}

function popupOpenCloseEditUser () {
  if (editUser.classList.contains('popup_opened')){
    editUser.classList.remove('popup_opened');
  }
  else {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  editUser.classList.add('popup_opened');
  }
}

function popupOpenCloseAddCard () {
  addCard.classList.toggle('popup_opened');
}


function closePopupPageEditUser (evt) {
  if (evt.target !== evt.currentTarget) return
  popupOpenCloseEditUser();
}

function closePopupPageAddCard (evt) {
  if (evt.target !== evt.currentTarget) return
  popupOpenCloseAddCard();
}

function popupOpenCloseShowImage (item) {
  if (showImage.classList.contains('popup_opened')){
    showImage.classList.remove('popup_opened');
  }
  else {

  const titleElement = element[item].querySelector('.element__title');
  const imgSrc = imgElement[item].getAttribute('src');
  altImage.textContent = titleElement.textContent;
  imageSrc.setAttribute('src', imgSrc);
  showImage.classList.add('popup_opened');
}
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.


    // Получите значение полей из свойства value
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    popupOpenCloseEditUser();
}

initialCards.forEach(item => addUserElementCard(item.link, item.name));


//Обработчики событий
editUser.addEventListener('submit', formSubmitHandler);
editUserButton.addEventListener('click', popupOpenCloseEditUser);
closeEditUserButton.addEventListener('click', popupOpenCloseEditUser);
editUser.addEventListener('click', closePopupPageEditUser);
addCardButton.addEventListener('click', popupOpenCloseAddCard);
closeAddCard.addEventListener('click', popupOpenCloseAddCard);
addCard.addEventListener('click', closePopupPageAddCard);
closeShowImage.addEventListener('click', popupOpenCloseShowImage);
addCard.addEventListener('submit', formSubmitHandlerElement);



