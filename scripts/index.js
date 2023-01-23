// @ts-nocheck
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import validationConfig from "./validatorConfig.js";

const profileEditButton = document.querySelector(
    ".profile__button_action_edit"
);
const profileAddButton = document.querySelector(".profile__button_action_add");
const profileTitle = document.querySelector(".profile__heading");
const profileDesc = document.querySelector(".profile__desc");

const popups = document.querySelectorAll(".popup");
const formEditorProfile = document.querySelector(".popup_type_editor-profile");
const formBuilderElement = document.querySelector(".popup_type_add-element");
const popupViewerPicture = document.querySelector(".popup_type_view-image");
const bigPicture = popupViewerPicture.querySelector(".popup__big-picture");
const bigPictureImageDesc = popupViewerPicture.querySelector(
    ".popup__picture-desc"
);

const { forms } = document;
const editorProfileForm = forms.editProfile;
const builderElementForm = forms.addPlace;

const inputNameProfile = editorProfileForm.querySelector(
    ".form__input_type_name"
);
const inputDescProfile = editorProfileForm.querySelector(
    ".form__input_type_desc"
);

const cardsElements = document.querySelector(".elements");
const popupButtonsClose = document.querySelectorAll(".popup__close");

const validatorEditorProfileForm = new FormValidator(
    validationConfig,
    editorProfileForm
);
const validatorBuilderElementForm = new FormValidator(
    validationConfig,
    builderElementForm
);

/**
 * Функции
 */

/** Вспомогательные функции */

function getDataFromForm(form) {
    return Object.fromEntries(new FormData(form));
}

function resetForm(form) {
    form.reset();
}

function closePopup(popup) {
    document.removeEventListener("keydown", closePopupOnEscape);
    popup.classList.remove("popup_opened");

    const form = popup.querySelector(".form");

    switch (form && form.getAttribute("name")) {
        case "addPlace":
            validatorBuilderElementForm.disableValidation();
            break;

        case "editProfile":
            validatorEditorProfileForm.disableValidation();
            break;
    }
}

function openPopup(popup) {
    document.addEventListener("keydown", closePopupOnEscape);
    popup.classList.add("popup_opened");
}

function closeOpenedPopup() {
    const openedPopup = document.querySelector(".popup_opened");
    if (!openedPopup) return;

    closePopup(openedPopup);
}

/** Функции по модальным окнам */

function openEditorProfile() {
    openPopup(formEditorProfile);

    inputNameProfile.value = profileTitle.textContent;
    inputDescProfile.value = profileDesc.textContent;

    validatorEditorProfileForm.enableValidation();
}

function openBuilderPopup() {
    openPopup(formBuilderElement);

    validatorBuilderElementForm.enableValidation();
}

function viewPicture({ name, link }) {
    bigPicture.src = link;
    bigPictureImageDesc.textContent = bigPicture.alt = name;

    openPopup(popupViewerPicture);
}

function initCloseButton(closeButton) {
    const popup = closeButton.closest(".popup");
    closeButton.addEventListener("click", () => closePopup(popup));
}

function setEventListenersPopup(popup) {
    popup.addEventListener("click", (evt) => {
        if (evt.currentTarget === evt.target) {
            closeOpenedPopup();
        }
    });
}

/** Функции обработки форм */

function submitEditorProfile(e) {
    e.preventDefault();

    const { name, about } = getDataFromForm(e.target);

    profileTitle.textContent = name;
    profileDesc.textContent = about;

    closePopup(formEditorProfile);
}

function submitBuilderElement(e) {
    e.preventDefault();
    renderCard(getDataFromForm(e.target));
    closePopup(formBuilderElement);
    resetForm(e.target);
}

/** Карточки */

function createCard(data) {
    const card = new Card(data, "#element-template", viewPicture);
    return card.generateCard();
}

function renderCard(cardInfo) {
    cardsElements.prepend(createCard(cardInfo));
}

/** Функции обработки клавиш клавиатуры */

function closePopupOnEscape(evt) {
    if (evt.key == "Escape") {
        closeOpenedPopup();
    }
}

/**
 *  Обработчики
 */
profileEditButton.addEventListener("click", openEditorProfile);
profileAddButton.addEventListener("click", openBuilderPopup);
editorProfileForm.addEventListener("submit", submitEditorProfile);
builderElementForm.addEventListener("submit", submitBuilderElement);

/**
 *  Инициализация страницы
 */

initialCards.reverse().forEach(renderCard);
popupButtonsClose.forEach(initCloseButton);
popups.forEach(setEventListenersPopup);
// enableValidationForms(validationConfig);
