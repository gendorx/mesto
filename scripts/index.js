// @ts-nocheck
const profileEditButton = document.querySelector(
    ".profile__button_action_edit"
);
const profileAddButton = document.querySelector(".profile__button_action_add");
const profileTitle = document.querySelector(".profile__heading");
const profileDesc = document.querySelector(".profile__desc");

const formEditorProfile = document.querySelector(".popup_type_editor-profile");
const formBuilderElement = document.querySelector(".popup_type_add-element");
const popupViewerPicture = document.querySelector(".popup_type_view-image");
const bigPicture = popupViewerPicture.querySelector(".popup__big-picture");

const editorProfileForm = document.querySelector(".form_action_edit-profile");
const builderElementForm = document.querySelector(".form_action_add-element");

const inputNameProfile = document.querySelector(".form__input_type_name");
const inputDescProfile = document.querySelector(".form__input_type_desc");
const inputNamePlace = document.querySelector(".form__input_type_title-place");
const inputUrlPlace = document.querySelector(".form__input_type_url-place");

const cardsElements = document.querySelector(".elements");
const popupButtonsClose = document.querySelectorAll(".popup__close");

const templateCard = document
    .querySelector("#element-template")
    .content.querySelector(".element");

/**
 * Функции
 */

/** Вспомогательные функции */

function getDataFromForm(form) {
    return Object.fromEntries(new FormData(form));
}

function clearInputs(array) {
    array.forEach((item) => {
        item.value = "";
    });
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

/** Функции по модальным окнам */

function openEditorProfile() {
    openPopup(formEditorProfile);

    inputNameProfile.value = profileTitle.textContent;
    inputDescProfile.value = profileDesc.textContent;
}

function openBuilderPopup() {
    openPopup(formBuilderElement);
}

function viewPicture({ name, link }) {
    bigPicture.src = link;
    document.querySelector(".popup__picture-desc").textContent =
        bigPicture.alt = name;

    openPopup(popupViewerPicture);
}

function closeButton(item) {
    const popup = item.closest(".popup");
    item.addEventListener("click", () => closePopup(popup));
}

/** Функции обработки форм */

function submitEditorProfile(e) {
    e.preventDefault();

    const { name, desc } = getDataFromForm(e.target);

    profileTitle.textContent = name;
    profileDesc.textContent = desc;

    closePopup(formEditorProfile);
}

function submitBuilderElement(e) {
    e.preventDefault();
    renderCard(getDataFromForm(e.target));
    closePopup(formBuilderElement);
    clearInputs([inputNamePlace, inputUrlPlace]);
}

/** Карточки */

function addCard({ name, link }) {
    const element = templateCard.cloneNode(true);
    const image = element.querySelector(".element__image");
    const title = element.querySelector(".element__title");
    const like = element.querySelector(".element__like");

    image.src = link;
    title.textContent = image.alt = name;

    element
        .querySelector(".element__delete")
        .addEventListener("click", () => element.remove());

    like.addEventListener("click", () =>
        like.classList.toggle("element__like_active")
    );

    image.addEventListener("click", () => viewPicture({ name, link }));

    return element;
}

function renderCard(cardInfo) {
    cardsElements.prepend(addCard(cardInfo));
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
popupButtonsClose.forEach(closeButton);
