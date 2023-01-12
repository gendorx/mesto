function showInputError(formElement, inputElement) {
    let errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add("form__input-error_show");
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add("form__input_invalid");
}

function hideInputError(formElement, inputElement) {
    let errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove("form__input-error_show");
    errorElement.textContent = "";
    inputElement.classList.remove("form__input_invalid");
}

function checkInputValidation(formElement, inputElement) {
    if (inputElement.validity.valid)
        return hideInputError(formElement, inputElement);

    return showInputError(formElement, inputElement);
}

function enableSubmitButton(formElement) {
    let submitButton = formElement.querySelector(".form__submit");

    submitButton.disabled = false;
    submitButton.classList.remove("form__submit_disabled");
}

function disableSubmitButton(formElement) {
    let submitButton = formElement.querySelector(".form__submit");

    submitButton.disabled = true;
    submitButton.classList.add("form__submit_disabled");
}

function checkInputsForm(inputList) {
    console.log(inputList)
    return inputList.some((a) => !a.validity.valid);
}

function toggleSubmitButton(formElement, inputList) {
    console.log(checkInputsForm(inputList));
    return checkInputsForm(inputList)
        ? disableSubmitButton(formElement)
        : enableSubmitButton(formElement);
}

function setEventListenersForm(formElement) {
    const listInputs = Array.from(formElement.querySelectorAll(".form__input"));

    listInputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            console.log('input');
            checkInputValidation(formElement, inputElement);
            toggleSubmitButton(formElement, listInputs);
        });
    });
}

function enableValidationForms(formSelector) {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListenersForm(formElement);
    });
}

enableValidationForms('.form');