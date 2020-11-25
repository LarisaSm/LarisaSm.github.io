export class Card {
  constructor (item, cardTemplate, handleCardClick) {
    this._aboutImg = item.link;
    this._nameImg = item.name;
    this._cardTemplate = cardTemplate.querySelector('.element');
    this._openImagePopup = handleCardClick;
  }

  _createCardElement() {
    const _cardElement = this._cardTemplate.cloneNode(true);

    return _cardElement;
  }

  _delete () {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _like() {
    this._cardElement.querySelector('.element__like').classList.toggle("element__like_type_active");
  }
 
  _addEventLisener (cardImg) {
  
    cardImg.addEventListener("click", this._openImagePopup);

    this._cardElement
      .querySelector(".element__like")
      .addEventListener("click", () => this._like());
  
      this._cardElement
      .querySelector(".element__trash")
      .addEventListener("click", () => this._delete());
  }
  render () {
    
    this._cardElement = this._cardTemplate.cloneNode(true);
    const cardImg = this._cardElement.querySelector(".element__img");

    cardImg.src = this._aboutImg;
    this._cardElement.querySelector(".element__title").textContent = this._nameImg;
    cardImg.alt = this._nameImg;

    this._addEventLisener(cardImg);

    return this._cardElement;
  }
}
