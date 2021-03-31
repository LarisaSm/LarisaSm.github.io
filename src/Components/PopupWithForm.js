import React, { useCallback } from 'react';

function PopupWithForm ({formId, isOpen, title, children, onClose, button, setConfirmOpen, confirmAction, onSubmit}) {
  // console.log();
  const closeByOverlay = useCallback((evt) => {
    if (evt.target !== evt.currentTarget) return;
    onClose();
  }, [onClose])

  const handleEscClose = useCallback((evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  }, [onClose])

  React.useEffect(() => {
    if(isOpen) {
      const Popup = document.querySelector(`.${formId}`);
      Popup.classList.add("popup_opened");
      document.body.addEventListener("keyup", handleEscClose);
      Popup.addEventListener("click", closeByOverlay);
    }
    return () => {
      const Popup = document.querySelector(`.${formId}`);
      Popup.classList.remove("popup_opened");
      document.body.removeEventListener("keyup", handleEscClose);
      Popup.removeEventListener("click", closeByOverlay);
    };
  }, [isOpen, formId, closeByOverlay, handleEscClose]); 

  function submitConfirm (evt) {
    evt.preventDefault(); 
    setConfirmOpen();
    confirmAction();
    onClose();
    // console.log("PopupWithForm -> submitConfirm");
  }

  return (
    <div className={`popup ${formId}`}>
    <form className={`form popup__container`} name={formId} onSubmit={submitConfirm} noValidate>
      <h2 className="popup__title">{title}</h2>
      {children}
      <button className="popup__save" type="submit" >{button}</button>
      <button className="popup__close" type="button" onClick={function (evt) { evt.preventDefault(); onClose()}}></button>
    </form>
  </div>
  )
}

export default PopupWithForm;