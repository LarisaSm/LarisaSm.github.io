import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup ({isOpen, onClose, setConfirmOpen, setConfirmAction, setConfirmObj}){

  const avatarRef = React.useRef();
  // console.log();
  function editUserAvatar () {
    setConfirmAction('editUserAvatar');
    setConfirmObj({
      avatar: avatarRef.current.value
    })
   }

  return (
    <PopupWithForm 
        button="Сохранить" 
        title="Обновить аватар" 
        formId="edit-user-avatar" 
        isOpen={isOpen} 
        onClose={onClose}
        setConfirmOpen={setConfirmOpen}
        confirmAction={editUserAvatar}
        setConfirmAction={setConfirmAction}
      children={<>
        <input
        id="avatar-input"
        type="url"
        className="popup__input popup__input_type_name"
        autoComplete="off"
        placeholder="Ссылка на аватар"
        name="name"
        ref={avatarRef}
        minLength="2"
        maxLength="200"
        required
        />
        <span id="avatar-input-error" className="popup__input-error"></span>
      </>}/>
  )
}

export default EditProfilePopup