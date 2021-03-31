
import React from 'react';
import PopupWithForm from './PopupWithForm';

import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup ({isOpen, onClose, setConfirmOpen, setConfirmAction, setConfirmObj}){

  const [inputAboutValue, setInputAboutValue] = React.useState('');
  const [inputNameValue, setInputNameValue] = React.useState('');
     // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange (evt) {
    setInputNameValue(evt.target.value);
   }
 
   function handleAboutChange (evt) {
    setInputAboutValue(evt.target.value);
   }
 
   function editUserInfo(name, about) {
    setConfirmAction('editUserInfo');
    setConfirmObj({
      name: name,
      about: about 
    })
   }

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setInputAboutValue(currentUser.about);
    setInputNameValue(currentUser.name);
  }, [currentUser]); 

return (
<PopupWithForm 
        button="Сохранить" 
        title="Редактировать профиль" 
        formId="edit-user" 
        isOpen={isOpen} 
        onClose={onClose}
        setConfirmOpen={setConfirmOpen}
        confirmAction={() => editUserInfo(inputNameValue, inputAboutValue)}
        setConfirmAction={setConfirmAction}
        children={<>
          <input
            id="name-input"
            type="text"
            className="popup__input popup__input_type_name"
            autoComplete="off"
            placeholder="Имя"
            name="name"
            minLength="2"
            maxLength="40"
            value={inputNameValue}
            onChange={(e) => handleNameChange(e)}
            required
          />
          <span id="name-input-error" className="popup__input-error"></span>
          <input
            id="about-input"
            type="text"
            className="popup__input popup__input_type_about"
            autoComplete="off"
            placeholder="О себе"
            name="about"
            value={inputAboutValue}
            minLength="2"
            maxLength="200"
            required
            onChange={handleAboutChange}
          />
          <span id="about-input-error" className="popup__input-error"></span>
          </>}
      />)
}

export default EditProfilePopup;