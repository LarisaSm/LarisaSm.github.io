import {Popup} from './popup.js'

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
		// this._text = data.text;
		// this._image = data.image;
	
     
  }

  open (evt) {
    const titleElement = evt.target.nextElementSibling.querySelector(
      ".element__title"
    );
    const imageSrc = this._popup.querySelector(".popup__image");
    const figcaptionImage = this._popup.querySelector(".popup__figcaption-image");
    const imgSrc = evt.target.getAttribute("src");
    const imgFigcaption = titleElement.textContent;
    figcaptionImage.textContent = titleElement.textContent;
    imageSrc.setAttribute("src", imgSrc);
    imageSrc.setAttribute("alt", imgFigcaption);

    super.open();
  }

}