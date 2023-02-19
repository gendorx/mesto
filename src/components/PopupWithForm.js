import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(config) {
    super(config);

    this._submitForm = config.submitForm.bind(this);
    this._formElement = this._container.querySelector(config.popupFormSelector);

    this._handlerSubmitForm = this._handleSubmitForm.bind(this);
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._formElement));
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handlerSubmitForm);
  }

  unsetEventListeners() {
    super.unsetEventListeners();
    this._formElement.removeEventListener("submit", this._handlerSubmitForm);
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}
