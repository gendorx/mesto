// @ts-nocheck

class FormValidator {
    constructor(config, formElement) {
        this.config = config;

        this._formElement = formElement;
    }

    _showInputError() {
        const { formErrorActiveClass, formInputInvalidClass } = this.config;

        this._errorElement.classList.add(formErrorActiveClass);
        this._errorElement.textContent = this._inputElement.validationMessage;
        this._inputElement.classList.add(formInputInvalidClass);
    }

    _hideInputError() {
        const { formErrorActiveClass, formInputInvalidClass } = this.config;

        this._errorElement.classList.remove(formErrorActiveClass);
        this._errorElement.textContent = "";
        this._inputElement.classList.remove(formInputInvalidClass);
    }

    _checkInputValidation() {
        this._errorElement = this._formElement.querySelector(
            `.${this._inputElement.id}-error`
        );

        return this._inputElement.validity.valid
            ? this._hideInputError()
            : this._showInputError();
    }

    _enableSubmitButton() {
        const { formSubmitInactiveClass } = this.config;

        this._submitButton.disabled = false;
        this._submitButton.classList.remove(formSubmitInactiveClass);
    }

    _disableSubmitButton() {
        const { formSubmitInactiveClass } = this.config;

        this._submitButton.disabled = true;
        this._submitButton.classList.add(formSubmitInactiveClass);
    }

    _toggleSubmitButton() {
        this._submitButton = this._formElement.querySelector(
            this.config.formSubmitSelector
        );

        return this._checkInputs()
            ? this._disableSubmitButton()
            : this._enableSubmitButton();
    }

    _checkInputs() {
        return this._inputList.some((a) => !a.validity.valid);
    }

    _getInputsForm() {
        this._inputList = Array.from(
            this._formElement.querySelectorAll(this.config.formInputSelector)
        );
    }

    _setEventListeners() {
        this._validateInputs = true

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener(
                "input",
                this._handleInputField.bind(this)
            );
        });
    }

    _unsetEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.removeEventListener(
                "input",
                this._handleInputField.bind(this)
            );
        });
    }

    _handleInputField(ctx) {
        this._inputElement = ctx.target || ctx;

        this._validateFormElements();
    }

    enableValidation() {
        this._getInputsForm();
        this._validateForm();
        this._setEventListeners();
    }

    disableValidation() {
        this._unsetEventListeners();
        this._inputList = [];
    }

    _validateForm() {
        this._validateInputs = false;

        return this._inputList.forEach(this._handleInputField.bind(this));
    }

    _validateFormElements() {
        if (this._validateInputs) this._checkInputValidation();
        this._toggleSubmitButton();
    }
}

export default FormValidator;
