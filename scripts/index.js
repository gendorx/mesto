// @ts-nocheck
const popupOpenedClose = document.querySelector(".popup__close");

const profile__button_action_edit = document.querySelector(
    ".profile__button_action_edit"
);
const profile__heading = document.querySelector(".profile__heading");
const profile__desc = document.querySelector(".profile__desc");
const formEditorProfile = document.querySelector(".popup_type_editor-profile");
const editorProfileForm = document.querySelector(".form_action_edit-profile");
const inputName = document.querySelector(".form__input_type_name");
const inputDesc = document.querySelector(".form__input_type_desc");

/**
 *  Обработчики
 */
profile__button_action_edit.addEventListener("click", openEditorProfile);
popupOpenedClose.addEventListener("click", closePopup);
editorProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    profile__heading.textContent = inputName.value
    profile__desc.textContent = inputDesc.value

    closePopup();
});

/**
 * Функции
 */

function openEditorProfile() {
    formEditorProfile.classList.add("popup__opened");

    inputName.value = profile__heading.textContent
    inputDesc.value = profile__desc.textContent
}

function closePopup() {
    let popupOpened = document.querySelector(".popup__opened");
    popupOpened.classList.remove("popup__opened");
}
