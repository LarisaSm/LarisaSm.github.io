// Находим форму в DOM
const formElement = document.querySelector('.popup');
const profile = document.querySelector('.profile');

const editButton = profile.querySelector('.profile__button_type_edit');
const closePopupButton = formElement.querySelector('.popup__close');

const nameInput = formElement.querySelector('.popup__input_type_name'); 
const jobInput = formElement.querySelector('.popup__input_type_about'); 
    
const nameProfile = document.querySelector('.profile__name-title');
const jobProfile = document.querySelector('.profile__about');

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

function closePopupPage (evt) {
  if (evt.target !== evt.currentTarget) return
  popupOpenClose();
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
formElement.addEventListener('click', closePopupPage);


