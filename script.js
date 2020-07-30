// Находим форму в DOM
let formElement = document.querySelector('.popup');
let profile = document.querySelector('.profile');

let editButton = profile.querySelector('.profile__info__edit');
let closePopupButton = formElement.querySelector('.popup__close');
let savePopupButton = formElement.querySelector('.popup__save');

let nameInput = formElement.querySelector('.popup__name'); 
let jobInput = formElement.querySelector('.popup__about'); 
    
let nameProfile = document.querySelector('.profile__info__name');
let jobProfile = document.querySelector('.profile__info__about');

nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;

function openPopup () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  formElement.classList.add('popup_opened');
  
}

function closePopup () {
  formElement.classList.remove('popup_opened');
}

function savePopup () {
  nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup();
}
editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
savePopupButton.addEventListener('click', savePopup);

 
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.


    // Получите значение полей из свойства value
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


