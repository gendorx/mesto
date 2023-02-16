import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(config) {
    super(config);

    this._submitForm = config.submitForm.bind(this);
    this._formElement = this._container.querySelector(config.popupFormSelector);
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._formElement));
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}
