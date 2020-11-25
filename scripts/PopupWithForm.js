import {Popup} from './popup.js'
import {valid} from './constants.js'

export class PopupWithForm extends Popup {
  constructor({selector, submitForm}) {
    super(selector);
    this._submitForm = submitForm;
    this._clickHandler = this._submitListener.bind(this);
  }

  _getInputValues () {
    // достаём все элементы полей
    this._inputList = this._popup.querySelectorAll('.popup__input');
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  } 
  
  _submitListener(evt) {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('submit', this._clickHandler);

    super.setEventListeners();
  }

  _deleteEventListeners() {
    this._popup.removeEventListener('submit', this._clickHandler);

    super._deleteEventListeners();
  }

  close() {
   
    const formElementClass = this._popup.querySelector('form').getAttribute('name');
    valid[formElementClass].reset();
    this._deleteEventListeners();

    super.close();
  }


}