// @ts-nocheck
const popupButtonClose = document.querySelector(".popup__close");

const profileEditButton = document.querySelector(
    ".profile__button_action_edit"
);
const profileTitle = document.querySelector(".profile__heading");
const profileDesc = document.querySelector(".profile__desc");
const formEditorProfile = document.querySelector(".popup_type_editor-profile");
const editorProfileForm = document.querySelector(".form_action_edit-profile");
const inputName = document.querySelector(".form__input_type_name");
const inputDesc = document.querySelector(".form__input_type_desc");

/**
 * Функции
 */

function openEditorProfile() {
    formEditorProfile.classList.add("popup_opened");

    inputName.value = profileTitle.textContent;
    inputDesc.value = profileDesc.textContent;
}

function closePopup() {
    formEditorProfile.classList.remove("popup_opened");
}

function submitEditorProfile(e) {
    e.preventDefault();

    profileTitle.textContent = inputName.value;
    profileDesc.textContent = inputDesc.value;

    closePopup();
}

/**
 *  Обработчики
 */

profileEditButton.addEventListener("click", openEditorProfile);
popupButtonClose.addEventListener("click", closePopup);
editorProfileForm.addEventListener("submit", submitEditorProfile);