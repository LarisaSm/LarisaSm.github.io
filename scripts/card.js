export class Card {
  constructor (aboutImg, nameImg, cardTemplate, toggleImagePopup) {
    this._aboutImg = aboutImg;
    this._nameImg = nameImg;
    this._cardTemplate = cardTemplate;
    this._toggleImagePopup = toggleImagePopup;
  }

  _createCardElement() {
    const _cardElement = this._cardTemplate.cloneNode(true);
    const _cardImg = _cardElement.querySelector(".element__img");
    _cardImg.src = this._aboutImg;
    _cardElement.querySelector(".element__title").textContent = this._nameImg;
    _cardImg.alt = this._nameImg;

    return _cardElement;
  }

  _delete (evt) {
    const listItem = evt.target.closest(".element");
    listItem.remove();
  }

  _like(evt) {
    evt.target.classList.toggle("element__like_type_active");
  }
 
  _addEventLisener (cardElement, cardImg) {
    cardImg.addEventListener("click", this._toggleImagePopup);

    cardElement
      .querySelector(".element__like")
      .addEventListener("click", (evt) => this._like(evt));
  
    cardElement
      .querySelector(".element__trash")
      .addEventListener("click", (evt) => this._delete(evt));
  }
  render (container) {
    
    const cardElement = this._createCardElement();
    const cardImg = cardElement.querySelector(".element__img");
    this._addEventLisener(cardElement, cardImg);
    container.prepend(cardElement);
  }
}
