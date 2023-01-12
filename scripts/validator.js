// @ts-nocheck

function showInputError(
    formElement,
    inputElement,
    { formErrorActiveClass, formInputInvalidClass }
) {
    let errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(formErrorActiveClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(formInputInvalidClass);
}

function hideInputError(
    formElement,
    inputElement,
    { formErrorActiveClass, formInputInvalidClass }
) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(formErrorActiveClass);
    errorElement.textContent = "";
    inputElement.classList.remove(formInputInvalidClass);
}

function checkInputValidation(formElement, inputElement, config) {
    if (inputElement.validity.valid)
        return hideInputError(formElement, inputElement, config);

    return showInputError(formElement, inputElement, config);
}

function enableSubmitButton(
    formElement,
    { formSubmitSelector, formSubmitInactiveClass }
) {
    let submitButton = formElement.querySelector(formSubmitSelector);

    submitButton.disabled = false;
    submitButton.classList.remove(formSubmitInactiveClass);
}

function disableSubmitButton(
    formElement,
    { formSubmitSelector, formSubmitInactiveClass }
) {
    let submitButton = formElement.querySelector(formSubmitSelector);

    submitButton.disabled = true;
    submitButton.classList.add(formSubmitInactiveClass);
}

function checkInputsForm(inputList) {
    return inputList.some((a) => !a.validity.valid);
}

function toggleSubmitButton(formElement, inputList, config) {
    return checkInputsForm(inputList)
        ? disableSubmitButton(formElement, config)
        : enableSubmitButton(formElement, config);
}

function setEventListenersForm(formElement, { formInputSelector, ...config }) {
    const listInputs = Array.from(
        formElement.querySelectorAll(formInputSelector)
    );

    listInputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidation(formElement, inputElement, config);
            toggleSubmitButton(formElement, listInputs, config);
        });
    });
}

function enableValidationForms({ formSelector, ...config }) {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListenersForm(formElement, config);
    });
}

enableValidationForms(validatorConfig);
