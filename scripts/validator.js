import FormValidator from "./FormValidator.js";
// import validationConfig from "./validatorConfig.js";

export default function enableValidationForms({ formSelector, ...config }) {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        const validator = new FormValidator(
            config,
            `${formSelector}[name="${formElement.getAttribute("name")}"]`
        );

        return validator.enableValidation();
    });
}
