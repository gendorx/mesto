// @ts-nocheck
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const popupButtonClose = document.querySelectorAll(".popup__close");
const profileEditButton = document.querySelector(
    ".profile__button_action_edit"
);
const profileAddButton = document.querySelector(".profile__button_action_add");
const profileTitle = document.querySelector(".profile__heading");
const profileDesc = document.querySelector(".profile__desc");
const formEditorProfile = document.querySelector(".popup_type_editor-profile");
const formBuilderElement = document.querySelector(".popup_type_add-element");
const editorProfileForm = document.querySelector(".form_action_edit-profile");
const builderElementForm = document.querySelector(".form_action_add-element");
const inputName = document.querySelector(".form__input_type_name");
const inputDesc = document.querySelector(".form__input_type_desc");
const cardsElements = document.querySelector(".elements");
const popupViewerPicture = document.querySelector(".popup_type_view-image");

const templateCard = document.querySelector("#element-template").content;

/**
 * Функции
 */

function getDataForm(form) {
    let data = new FormData(form);

    return Object.fromEntries(data);
}

function renderPage() {
    initialCards.reverse().forEach(renderCard);
    popupButtonClose.forEach(handleClosePopup);
}

function openEditorProfile() {
    formEditorProfile.classList.add("popup_opened");

    inputName.value = profileTitle.textContent;
    inputDesc.value = profileDesc.textContent;
}

function openBuilderElement() {
    formBuilderElement.classList.add("popup_opened");
}

function closePopup() {
    document.querySelector(".popup_opened").classList.remove("popup_opened");
}

function handleClosePopup(item) {
    item.addEventListener("click", closePopup);
}

function submitEditorProfile(e) {
    e.preventDefault();

    profileTitle.textContent = inputName.value;
    profileDesc.textContent = inputDesc.value;

    closePopup();
}

function viewPicture({ name, link }) {
    let picture = popupViewerPicture.querySelector(".popup__big-picture");

    picture.src = link;
    document.querySelector(".popup__picture-desc").textContent = picture.alt =
        name;

    popupViewerPicture.classList.add("popup_opened");
}

function submitBuilderElement(e) {
    e.preventDefault();
    renderCard(getDataForm(e.target));
    closePopup();
}

function renderCard({ name, link }) {
    let element = templateCard.querySelector(".element").cloneNode(true);
    let image = element.querySelector(".element__image");
    let title = element.querySelector(".element__title");
    let like = element.querySelector(".element__like");

    image.src = link;
    title.textContent = image.alt = name;

    element
        .querySelector(".element__delete")
        .addEventListener("click", () => element.remove());

    like.addEventListener("click", () =>
        like.classList.toggle("element__like_active")
    );

    image.addEventListener("click", () => viewPicture({ name, link }));

    cardsElements.prepend(element);
}

/**
 *  Обработчики
 */
profileEditButton.addEventListener("click", openEditorProfile);
profileAddButton.addEventListener("click", openBuilderElement);
editorProfileForm.addEventListener("submit", submitEditorProfile);
builderElementForm.addEventListener("submit", submitBuilderElement);
document.addEventListener("DOMContentLoaded", renderPage);
