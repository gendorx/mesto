import PopupWithForm from "./PopupWithForm.js";

export default class PopupConfirm extends PopupWithForm {
  _handleSubmitForm(evt) {
    evt.preventDefault();
    this._submitForm(this._context);
  }

  open(context) {
    this._context = context;
    super.open();
  }
}
