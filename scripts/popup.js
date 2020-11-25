export class Popup {
  constructor (selector) {
    this._popup = selector;
    this._closeHandler = this.close.bind(this);
    this._ecsHandler = this._handleEscClose.bind(this);
    this._overlayHandler = this._handleOverlayClose.bind(this);
  }

  open () {
    this.setEventListeners();
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._deleteEventListeners();
    console.log();
  }

  _handleOverlayClose (evt) {
    if (evt.target !== evt.currentTarget) return;
    this.close();
  }

  _handleEscClose (evt) {
      if (evt.key === "Escape") {
        this.close();
    }
  }


  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener("click", this._closeHandler);
    document.body.addEventListener("keyup", this._ecsHandler);
    this._popup.addEventListener("click", this._overlayHandler);
  }

  _deleteEventListeners() {
    this._popup.querySelector('.popup__close').removeEventListener("click", this._closeHandler);
    document.body.removeEventListener("keyup", this._ecsHandler);
    this._popup.removeEventListener("click", this._overlayHandler);
  }
}