// Находим форму в DOM
let formElement = document.querySelector('.popup');
let profile = document.querySelector('.profile');

let editButton = profile.querySelector('.profile-name__edit');
let closePopupButton = formElement.querySelector('.popup__close');
let savePopupButton = formElement.querySelector('.popup__save');

let nameInput = formElement.querySelector('.popup__input_type_name'); 
let jobInput = formElement.querySelector('.popup__input_type_about'); 
    
let nameProfile = document.querySelector('.profile-name__title');
let jobProfile = document.querySelector('.profile-info__about');

function popupOpenClose () {
  if (formElement.classList.contains('popup_opened')){
    formElement.classList.remove('popup_opened');
  }
  else {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  formElement.classList.add('popup_opened');
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
    popupOpenClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', popupOpenClose);
closePopupButton.addEventListener('click', popupOpenClose);


