class FormValidator {
  constructor({ formElement, ...restConfig }) {
    this._config = restConfig;

    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.formInputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.formSubmitSelector
    );
  }

  _showInputError() {
    const { formErrorActiveClass, formInputInvalidClass } = this._config;

    this._errorElement.classList.add(formErrorActiveClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._inputElement.classList.add(formInputInvalidClass);
  }

  _hideInputError() {
    const { formErrorActiveClass, formInputInvalidClass } = this._config;

    this._errorElement.classList.remove(formErrorActiveClass);
    this._errorElement.textContent = "";
    this._inputElement.classList.remove(formInputInvalidClass);
  }

  _getErrorElement() {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-error`
    );
  }

  _checkInputValidation() {
    this._getErrorElement();

    return this._inputElement.validity.valid
      ? this._hideInputError()
      : this._showInputError();
  }

  _enableSubmitButton() {
    const { formSubmitInactiveClass } = this._config;

    this._submitButton.disabled = false;
    this._submitButton.classList.remove(formSubmitInactiveClass);
  }

  _disableSubmitButton() {
    const { formSubmitInactiveClass } = this._config;

    this._submitButton.disabled = true;
    this._submitButton.classList.add(formSubmitInactiveClass);
  }

  _toggleSubmitButton() {
    return this._checkInputs()
      ? this._disableSubmitButton()
      : this._enableSubmitButton();
  }

  _checkInputs() {
    return this._inputList.some((a) => !a.validity.valid);
  }

  _setEventListeners() {
    this._validateInputs = true;

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", this._handleInputField.bind(this));
    });
  }

  _handleInputField(ctx) {
    this._inputElement = ctx.target || ctx;

    this._validateFormElements();
  }

  enableValidation() {
    this._setEventListeners();
  }

  validateForm(validateInputs = false) {
    this._validateInputs = validateInputs;

    this._inputList.forEach(this._handleInputField.bind(this));

    this._validateInputs = true;
  }

  hideErrors() {
    this._inputList.forEach((formInput) => {
      this._inputElement = formInput;
      this._getErrorElement();
      this._hideInputError();
    });
    this._toggleSubmitButton();
  }

  _validateFormElements() {
    if (this._validateInputs) this._checkInputValidation();
    this._toggleSubmitButton();
  }
}

export default FormValidator;
